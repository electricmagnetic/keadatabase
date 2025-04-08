FROM python:3.10.17-bullseye

RUN apt update \
    && apt install -y \
        binutils \
        libproj-dev \
        gdal-bin \
        libmagic-dev \
        python3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY /src /app

RUN python app/manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn", "--pythonpath", "app", "--bind", "0.0.0.0:8000", "keadatabase.wsgi"]
