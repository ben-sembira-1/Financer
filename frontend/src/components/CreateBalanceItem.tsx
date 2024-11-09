// frontend/src/components/CreateBalanceItem.tsx

import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import axios from "axios";

const CreateBalanceItem: React.FC = () => {
  const [month, setMonth] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [isInvestment, setIsInvestment] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newItem = {
      month,
      description,
      amount: Number(amount),
      is_investment: isInvestment,
    };

    axios.post("/api/balance_items/", newItem).then(() => {
      // Handle success, e.g., refresh the list or show a message
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="Month"
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
        sx={{ mr: 2 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        sx={{ mr: 2 }}
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value === "" ? "" : Number(e.target.value))
        }
        required
        sx={{ mr: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isInvestment}
            onChange={(e) => setIsInvestment(e.target.checked)}
          />
        }
        label="Is Investment"
      />
      <Button type="submit" variant="contained">
        Add Item
      </Button>
    </Box>
  );
};

export default CreateBalanceItem;
