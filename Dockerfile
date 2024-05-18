FROM python:3.10-slim

WORKDIR /app/backend

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    default-libmysqlclient-dev \
    pkg-config && \
    rm -rf /var/lib/apt/lists/*

COPY ./backend/requirements.txt /app/backend/

RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend /app/backend

RUN python manage.py makemigrations && \
    python manage.py migrate && \
    python manage.py loaddata fixtures/test_data.yaml

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]