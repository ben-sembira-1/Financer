from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_balance_item():
    response = client.post(
        "/balance_items/",
        json={
            "month": "2024-10",
            "description": "Bank Account",
            "amount": 1000.0,
            "is_investment": False,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["description"] == "Bank Account"
