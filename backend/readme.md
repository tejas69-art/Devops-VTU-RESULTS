# **VTUHUB – VTU Result Scraper API (FastAPI + TrOCR OCR Engine)**

Complete Documentation – API, OCR Pipeline, HTML UI, Docker, Multithreading

---

# **1. Overview**

VTUHUB is a high-performance **FastAPI** service designed to automate scraping of VTU result portals.
It dynamically:

* Loads VTU result index page
* Extracts captcha and token
* Cleans captcha via custom image preprocessing
* Performs OCR using **Microsoft TrOCR Base**
* Submits result form
* Retries on failed captcha
* Returns complete **HTML** result page

This system supports:

* **Single USN lookup /single-post**
* **Web UI** (`/` → home.html, `/about` → index.html)
* **Swagger documentation** (`/docs`)
* **Docker CPU & GPU builds**

---

# **2. Features**

| Feature          | Description                                               |
| ---------------- | --------------------------------------------------------- |
| Captcha OCR      | Disabled (manual captcha solving)                       |
| Captcha Cleaning | Custom grayscale, median filter, threshold, majority mask |
| Single Lookup    | POST /single-post                                         |
| HTML UI          | `/` (homepage), `/about` (documentation page)             |
| OpenAPI Docs     | `/docs`, `/redoc`                                         |
| Docker Ready     | Dockerfile.cpu & Dockerfile.gpu                           |
| GPU Acceleration | Optional CUDA + PyTorch                                   |
| Multi-threadable | Not required (single-USN flow)                            |

---

# **3. Project Structure**

```
VTUHUB-Python/
│
├── main.py
├── services/
│   ├── mainclass.py          # VTUScraper logic
│   ├── TrOCR.py              # OCR engine
│   ├── Gray.py               # captcha cleaning pipeline
│   └── __init__.py
│
├── models/
│   └── requests/
│       ├── models.py         # SingleRequest & RangeRequest
│       └── __init__.py
│
├── templates/
│   ├── home.html             # UI homepage
│   └── index.html            # Documentation page
│
├── Dockerfile.cpu
├── Dockerfile.gpu
├── requirements-prod.txt
└── README.md
```

---

# **4. Installation**

## 4.1 Clone repository

```
git clone <your_repo_url>
cd VTUHUB-Python
```

## 4.2 Create virtual environment

```
python -m venv venv
source venv/bin/activate      # Linux/macOS
venv\Scripts\activate         # Windows
```

## 4.3 Install dependencies

```
pip install -r requirements-prod.txt
```

---

# **5. Starting FastAPI Server**

Development mode:

```
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Visit:

* **Home Page** → [http://localhost:8000/](http://localhost:8000/)
* **About / Documentation Page** → [http://localhost:8000/about](http://localhost:8000/about)
* **Swagger UI** → [http://localhost:8000/docs](http://localhost:8000/docs)
* **ReDoc** → [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

# **6. HTML Routes**

## `/` → Displays `home.html`

Home UI for VTUHUB.

```python
@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})
```

---

## `/about` → Displays `index.html`

Documentation UI.

```python
@app.get("/about", response_class=HTMLResponse)
def about(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
```

---

# **7. API Endpoints**

## **7.1 POST /single-post**

Scrapes a single USN.

### Request:

```json
{
  "index_url": "https://results.vtu.ac.in/JJEcbcs25/index.php",
  "usn": ""
}
```

### Response:

HTML content of result page.

---

## **7.2 POST /range-post**
Removed. Use `/single-post` and solve captcha manually.

---

# **8. OCR Pipeline (TrOCR)**

OCR engine file: `services/TrOCR.py`

Flow:

1. Load model:

```python
processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-stage1")
model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-stage1")
model.eval()
```

2. Clean captcha:

```python
cleaned = clean_captcha(img)
```

3. Convert to pixel tensors:

```python
pixel_values = processor(images=cleaned, return_tensors="pt").pixel_values
```

4. Generate prediction:

```python
output_ids = model.generate(pixel_values)
text = processor.batch_decode(output_ids, skip_special_tokens=True)[0]
```

---

# **9. Captcha Cleaning Algorithm**

File: `services/Gray.py`

Pipeline:

* Convert to **grayscale**
* Apply **median filter** (removes speckles)
* Adaptive threshold
* Majority 3×3 filter
* Output crisp **black text on white background**

Result: much higher OCR accuracy.

---

# **10. Multithreading**

Not required for the current single-USN manual captcha flow.

---

# **11. Docker Support**

## **11.1 CPU Version**

Build:

```
docker build -f Dockerfile.cpu -t vtuscraper:cpu .
```

Run:

```
docker run -p 8000:8000 vtuscraper:cpu
```

---

## **11.2 GPU Version (CUDA)**

Build:

```
docker build -f Dockerfile.gpu -t vtuscraper:gpu .
```

Run with GPU:

```
docker run --gpus all -p 8000:8000 vtuscraper:gpu
```

---

# **12. Environment Variables**

| Variable                          | Description                       |
| --------------------------------- | --------------------------------- |
| `HF_HOME`                         | HuggingFace model cache directory |
| `HF_HUB_DISABLE_SYMLINKS_WARNING` | Avoids HF warnings on Windows     |

---

# **13. Troubleshooting**

### **TemplateNotFound**

Ensure directory:

```
templates/home.html
templates/index.html
```

### **Invalid captcha repeat**

Increase retries:

```
MAX_RETRY = 10
```

### **OCR inaccurate**

* Improve cleaning thresholds
* Add GPU
* Switch to TrOCR Large

---

# **14. Performance Tips**

* Use GPU (Dockerfile.gpu) for **10–20× faster OCR**
* Cache HF model in container:

```
ENV HF_HOME=/app/.cache/huggingface
```

* Increase workers:

```
uvicorn main:app --workers 4
```

---

# **15. License**

Private / Personal – Not for redistribution without permission.

---


# pypy
