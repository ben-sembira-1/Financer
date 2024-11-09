from sqlalchemy import func
from sqlalchemy.orm import Session

from app import models, schemas  # Changed to absolute imports


def get_total_amounts(db: Session, month: str):
    total_investments = (
        db.query(func.sum(models.BalanceItem.amount))
        .filter(
            models.BalanceItem.month == month, models.BalanceItem.is_investment == True
        )
        .scalar()
        or 0
    )

    total_regular = (
        db.query(func.sum(models.BalanceItem.amount))
        .filter(
            models.BalanceItem.month == month, models.BalanceItem.is_investment == False
        )
        .scalar()
        or 0
    )

    return {"total_investments": total_investments, "total_regular": total_regular}


def get_balance_items(db: Session, month: str):
    return db.query(models.BalanceItem).filter(models.BalanceItem.month == month).all()


def create_balance_item(
    db: Session,
    item: schemas.BalanceItemCreate,
) -> models.BalanceItem:
    db_item = models.BalanceItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_balance_item(db: Session, item_id: int, item: schemas.BalanceItemUpdate):
    db_item = (
        db.query(models.BalanceItem).filter(models.BalanceItem.id == item_id).first()
    )
    if not db_item:
        return None
    update_data = item.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_balance_item(db: Session, item_id: int):
    db_item = (
        db.query(models.BalanceItem).filter(models.BalanceItem.id == item_id).first()
    )
    if not db_item:
        return False
    db.delete(db_item)
    db.commit()
    return True
