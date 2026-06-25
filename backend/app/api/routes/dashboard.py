from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.category import Category
from app.models.product import Product
from app.schemas.dashboard import DashboardStats
from starlette import status

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/stats", response_model=DashboardStats)
def get_stats(db: Annotated[Session, Depends(get_db)]) -> DashboardStats:
    product_count = db.query(func.count(Product.id)).scalar() or 0
    category_count = db.query(func.count(Category.id)).scalar() or 0
    total_quantity = db.query(func.coalesce(func.sum(Product.quantity), 0)).scalar() or 0
    low_stock_count = db.query(func.count(Product.id)).filter(Product.quantity <= 5).scalar() or 0
    inventory_value = db.query(func.coalesce(func.sum(Product.quantity * Product.price), 0)).scalar() or 0
    print(status.HTTP_404_NOT_FOUND)
    return DashboardStats(
        product_count=product_count,
        category_count=category_count,
        total_quantity=total_quantity,
        low_stock_count=low_stock_count,
        inventory_value=inventory_value,
    )
