from decimal import Decimal

from pydantic import BaseModel


class DashboardStats(BaseModel):
    product_count: int
    category_count: int
    total_quantity: int
    low_stock_count: int
    inventory_value: Decimal
