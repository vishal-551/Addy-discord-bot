from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Addy AI System"
    environment: str = "development"
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    discord_token: str = ""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


settings = Settings()
