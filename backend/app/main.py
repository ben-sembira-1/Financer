from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/balance_items/", response_model=schemas.BalanceItem)
def create_balance_item(item: schemas.BalanceItemCreate, db: Session = Depends(get_db)):
    return crud.create_balance_item(db, item)


@app.get("/balance_items/{month}", response_model=List[schemas.BalanceItem])
def read_balance_items(month: str, db: Session = Depends(get_db)):
    items = crud.get_balance_items(db, month)
    if items is None:
        raise HTTPException(status_code=404, detail="Items not found")
    return items
