from pydantic import BaseModel


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
