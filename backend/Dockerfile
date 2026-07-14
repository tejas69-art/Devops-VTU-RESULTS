# Use a lightweight official Python image
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source
COPY . .

# Expose default port
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "[IP_ADDRESS]", "--port", "8000"]