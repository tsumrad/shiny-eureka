from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    PROJECT_NAME: str = "Inventory Management API"
    DATABASE_URL: str = "postgresql+psycopg://inventory:inventory@localhost:5432/inventory"
    JWT_SECRET_KEY: str = Field(default="change-me-in-production")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
