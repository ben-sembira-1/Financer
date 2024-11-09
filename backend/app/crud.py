from sqlalchemy.orm import Session
from . import models, schemas


def get_balance_items(db: Session, month: str):
    return db.query(models.BalanceItem).filter(models.BalanceItem.month == month).all()


def create_balance_item(db: Session, item: schemas.BalanceItemCreate):
    db_item = models.BalanceItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
