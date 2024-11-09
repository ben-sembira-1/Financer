from sqlalchemy import Column, Integer, String, Boolean, Float, Date
from .database import Base


class BalanceItem(Base):
    __tablename__ = "balance_items"

    id = Column(Integer, primary_key=True, index=True)
    month = Column(String, index=True)
    description = Column(String)
    amount = Column(Float)
    is_investment = Column(Boolean)
