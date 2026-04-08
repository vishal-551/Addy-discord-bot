from fastapi import FastAPI

from shared.config import settings

app = FastAPI(title=settings.app_name)


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "api"}


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Welcome to Addy AI System API"}
