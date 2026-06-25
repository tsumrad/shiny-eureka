from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class ProductBase(BaseModel):
    name: str = Field(min_length=1, max_length=160)
    sku: str = Field(min_length=1, max_length=80)
    description: str | None = None
    quantity: int = Field(ge=0)
    price: Decimal = Field(ge=0)
    category_id: int | None = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=160)
    sku: str | None = Field(default=None, min_length=1, max_length=80)
    description: str | None = None
    quantity: int | None = Field(default=None, ge=0)
    price: Decimal | None = Field(default=None, ge=0)
    category_id: int | None = None


class ProductRead(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
