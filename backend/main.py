from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import Optional, Dict, Any

import urllib3
import re

from services.mainclass import VTUScraper

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = FastAPI(title="VTU Scraper API")

templates = Jinja2Templates(directory="templates")

INVALID_CAPTCHA_MARKERS = ("Invalid captcha", "Invalid captcha code !!!")
INVALID_CAPTCHA_ERROR = "Invalid captcha"


class SingleRequest(BaseModel):
    index_url: str
    usn: str
    captcha_code: Optional[str] = None
    token: Optional[str] = None
    cookies: Optional[Dict[str, Any]] = None


def is_invalid_captcha(html: str) -> bool:
    return any(marker in html for marker in INVALID_CAPTCHA_MARKERS)


# ----------------- HEALTH CHECK -----------------
@app.get("/health")
def health():
    """Health check endpoint for deployment platforms"""
    return {"status": "ok", "service": "VTU Scraper API"}


# ----------------- SINGLE POST API -----------------
@app.post("/single-post")
def single_post(body: SingleRequest):
    url = body.index_url.strip()

    # extract site path inline
    m = re.search(r"results\.vtu\.ac\.in/([^/]+)/index\.php", url)
    if not m:
        raise HTTPException(400, "Invalid index_url format")
    site_path = m.group(1)

    scraper = VTUScraper(site_path)

    # Stage 1: return captcha to the user
    if not body.captcha_code:
        session_data = scraper.start(lns=body.usn)
        mime = session_data["captcha_image"]["mime"]
        captcha_b64 = session_data["captcha_image"]["base64"]
        captcha_data_url = f"data:{mime};base64,{captcha_b64}"
        return {
            "usn": body.usn,
            "stage": "captcha",
            "captcha_image_data_url": captcha_data_url,
            "token": session_data["token"],
            "cookies": session_data["cookies"],
        }

    # Stage 2: verify user captcha and return result HTML
    if not body.token or body.cookies is None:
        raise HTTPException(400, "token and cookies are required when captcha_code is provided")

    try:
        html = scraper.submit(
            lns=body.usn,
            token=body.token,
            captcha_code=body.captcha_code,
            cookies=body.cookies,
        )
    except Exception as e:
        raise HTTPException(500, str(e))

    if is_invalid_captcha(html):
        raise HTTPException(400, INVALID_CAPTCHA_ERROR)

    return {"usn": body.usn, "stage": "result", "html": html}


# ----------------- HTML ROUTES -----------------
@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})


@app.get("/about", response_class=HTMLResponse)
def about(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
