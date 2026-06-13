FROM python:3.11.15-trixie

COPY --from=astral/uv:latest /uv /uvx /bin/

RUN apt update \
    && apt install -y \
    curl \
    ca-certificates \
    binutils \
    libproj-dev \
    gdal-bin \
    libmagic-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

ADD . /app
WORKDIR /app

RUN uv venv

ENV PATH="/app/.venv/bin:$PATH"

RUN uv sync --locked

WORKDIR /app/src

RUN uv run manage.py collectstatic --noinput

EXPOSE 8000
CMD ["uv", "run", "gunicorn", "--pythonpath", "app", "--bind", "0.0.0.0:8000", "keadatabase.wsgi"]
