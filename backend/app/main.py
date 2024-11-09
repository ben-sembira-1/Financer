from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
from sqlalchemy.orm import Session
from app import schemas, crud, models
from app.database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.get(
    "/balance_items/{month}",
    response_model=List[schemas.BalanceItem],
)
def read_balance_items_specific_month(
    month: str,
    db: Session = Depends(get_db),
):
    # Function body...
    items = crud.get_balance_items(db, month)
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")
    return items


@app.get("/balance_items/{month}/totals")
def get_totals(month: str, db: Session = Depends(get_db)):
    return crud.get_total_amounts(db, month)


@app.put("/balance_items/{item_id}", response_model=schemas.BalanceItem)
def update_item(
    item_id: int, item: schemas.BalanceItemUpdate, db: Session = Depends(get_db)
):
    updated_item = crud.update_balance_item(db, item_id, item)
    if not updated_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return updated_item


@app.delete("/balance_items/{item_id}", status_code=204)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    success = crud.delete_balance_item(db, item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")


@app.get("/balance_items/", response_model=List[schemas.BalanceItem])
def read_balance_items(db: Session = Depends(get_db)):
    return db.query(models.BalanceItem).all()
