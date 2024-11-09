import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Checkbox,
  FormControlLabel,
  DialogActions,
  Button,
} from "@mui/material";
import { BalanceItem } from "./BalanceList";
import axios from "axios";

interface EditBalanceItemProps {
  open: boolean;
  onClose: () => void;
  item: BalanceItem;
  onUpdate: (updatedItem: BalanceItem) => void;
}

const EditBalanceItem: React.FC<EditBalanceItemProps> = ({
  open,
  onClose,
  item,
  onUpdate,
}) => {
  const [month, setMonth] = useState(item.month);
  const [description, setDescription] = useState(item.description);
  const [amount, setAmount] = useState(item.amount);
  const [isInvestment, setIsInvestment] = useState(item.is_investment);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedItem = {
      ...item,
      month,
      description,
      amount,
      is_investment: isInvestment,
    };

    axios
      .put(`/api/balance_items/${item.id}`, updatedItem)
      .then((response) => {
        onUpdate(response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        // Handle error (e.g., show a notification)
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Balance Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="edit-balance-item-form">
          <TextField
            label="Month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            fullWidth
            margin="dense"
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="edit-balance-item-form" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBalanceItem;
