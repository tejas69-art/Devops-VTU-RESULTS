import requests
import urllib3
import re
import base64
from bs4 import BeautifulSoup


class VTUScraper:
    """
    Manual VTU Result Scraper
    """

    def __init__(self, site_path: str):
        self.site_path = site_path.strip().strip("/")
        self.base = "https://results.vtu.ac.in"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        }
        self.index_url = f"{self.base}/{self.site_path}/index.php"
        self.result_url = f"{self.base}/{self.site_path}/resultpage.php"
        self.result_header = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
            "Cache-Control": "max-age=0",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://results.vtu.ac.in",
            "Referer": "https://results.vtu.ac.in/JJEcbcs25/index.php",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0",
            "sec-ch-ua": '\"Not;A=Brand\";v=\"99\", \"Opera\";v=\"123\", \"Chromium\";v=\"139\"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '\"Windows\"',
        }
        self.cookies = None
        self.timeout = 20
        self.verify_ssl = False

    def start(self, lns: str) -> dict:
        """
        Fetch VTU Token + captcha image and return session cookies.

        The client/user must solve the captcha and call `submit()` with:
        - Token
        - captcha_code
        - cookies
        """
        urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

        session = requests.Session()

        # GET INDEX PAGE
        r = session.get(
            self.index_url,
            headers=self.headers,
            timeout=self.timeout,
            verify=self.verify_ssl,
        )
        html = r.text

        # =============================
        # EXTRACT TOKEN (IMPORTANT)
        # =============================
        soup = BeautifulSoup(html, "html.parser")
        token_tag = soup.find("input", {"name": "Token"})
        if not token_tag:
            raise ValueError("Token NOT FOUND")
        token_value = token_tag.get("value")
        if not token_value:
            raise ValueError("Token value missing")

        # FIND CAPTCHA
        m = re.search(r'src="(/captcha/[^"]+)"', html)
        if not m:
            raise ValueError("NO CAPTCHA FOUND")

        captcha_url = self.base + m.group(1)
        cap = session.get(captcha_url, timeout=self.timeout, verify=self.verify_ssl)
        raw_img = cap.content
        mime = cap.headers.get("content-type") or "image/jpeg"

        captcha_b64 = base64.b64encode(raw_img).decode("ascii")
        cookies = session.cookies.get_dict()

        return {
            "usn": lns,
            "token": token_value,
            "cookies": cookies,
            "captcha_image": {
                "mime": mime,
                "base64": captcha_b64,
            },
        }

    def submit(self, lns: str, token: str, captcha_code: str, cookies: dict) -> str:
        """
        Submit Token + USN + captcha code to get the VTU result HTML.
        """
        if not token:
            raise ValueError("token is required")
        if not captcha_code:
            raise ValueError("captcha_code is required")

        result_payload = {
            "Token": token,
            "lns": lns,
            "captchacode": captcha_code,
        }

        r = requests.post(
            url=self.result_url,
            headers=self.headers,
            cookies=cookies,
            data=result_payload,
            timeout=self.timeout,
            verify=False,
        )
        return r.text

if __name__ == "__main__":
    pass
