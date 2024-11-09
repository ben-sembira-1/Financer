import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app import models
from app.database import SessionLocal, engine

# Create the database tables if they don't exist
models.Base.metadata.create_all(bind=engine)


def generate_random_data(session: Session, num_items: int = 100):
    descriptions = [
        "Salary",
        "Rent",
        "Groceries",
        "Utilities",
        "Investment Income",
        "Car Payment",
        "Insurance",
        "Dining Out",
        "Travel",
        "Entertainment",
        "Medical Expenses",
        "Education",
        "Clothing",
        "Gifts",
        "Taxes",
    ]

    current_date = datetime.now()
    months = [current_date - timedelta(days=30 * i) for i in range(12)]
    month_strings = [date.strftime("%Y-%m") for date in months]

    for _ in range(num_items):
        item = models.BalanceItem(
            month=random.choice(month_strings),
            description=random.choice(descriptions),
            amount=round(random.uniform(-5000, 5000), 2),
            is_investment=random.choice([True, False]),
        )
        session.add(item)

    session.commit()
    print(f"Inserted {num_items} random balance items.")


def main():
    # Create a new database session
    session = SessionLocal()
    try:
        generate_random_data(session, num_items=100)
    finally:
        session.close()


if __name__ == "__main__":
    main()
