from pydantic import BaseModel
from typing import Optional


class BalanceItemUpdate(BaseModel):
    month: Optional[str]
    description: Optional[str]
    amount: Optional[float]
    is_investment: Optional[bool]

    class Config:
        orm_mode = True


class BalanceItemBase(BaseModel):
    month: str
    description: str
    amount: float
    is_investment: bool


class BalanceItemCreate(BalanceItemBase):
    pass


class BalanceItem(BalanceItemBase):
    id: int

    class Config:
        orm_mode = True
