import React, { useEffect, useState } from "react";
import {
	List,
	ListItem,
	ListItemText,
	Checkbox,
	IconButton,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import EditBalanceItem from "./EditBalanceItem";

export interface BalanceItem {
	id: number;
	month: string;
	description: string;
	amount: number;
	is_investment: boolean;
}

interface Totals {
	total_investments: number;
	total_regular: number;
}

const BalanceList: React.FC = () => {
	const [items, setItems] = useState<BalanceItem[]>([]);
	const [totals, setTotals] = useState<Totals>({
		total_investments: 0,
		total_regular: 0,
	});
	const [editItem, setEditItem] = useState<BalanceItem | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	useEffect(() => {
		fetchItems();
		fetchTotals();
	}, []);

	const fetchItems = () => {
		axios.get("/api/balance_items/2024-10").then((response) => {
			setItems(response.data);
		});
	};

	const fetchTotals = () => {
		axios.get("/api/balance_items/2024-10/totals").then((response) => {
			setTotals(response.data);
		});
	};

	const handleDelete = (id: number) => {
		axios.delete(`/api/balance_items/${id}`).then(() => {
			setItems(items.filter((item) => item.id !== id));
			fetchTotals();
		});
	};

	const handleEdit = (item: BalanceItem) => {
		setEditItem(item);
		setIsEditDialogOpen(true);
	};

	const handleEditClose = () => {
		setIsEditDialogOpen(false);
		setEditItem(null);
	};

	const handleItemUpdate = (updatedItem: BalanceItem) => {
		setItems(
			items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
		);
		fetchTotals();
	};

	return (
		<div>
			<Typography variant="h6">
				Total Investments: ${totals.total_investments}
			</Typography>
			<Typography variant="h6">
				Total Regular Accounts: ${totals.total_regular}
			</Typography>
			<List>
				{items.map((item) => (
					<ListItem key={item.id}>
						<Checkbox checked={item.is_investment} />
						<ListItemText
							primary={item.description}
							secondary={`Amount: $${item.amount}`}
						/>
						<IconButton
							edge="end"
							aria-label="edit"
							onClick={() => handleEdit(item)}
						>
							<EditIcon />
						</IconButton>
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={() => handleDelete(item.id)}
						>
							<DeleteIcon />
						</IconButton>
					</ListItem>
				))}
			</List>
			{editItem && (
				<EditBalanceItem
					open={isEditDialogOpen}
					onClose={handleEditClose}
					item={editItem}
					onUpdate={handleItemUpdate}
				/>
			)}
		</div>
	);
};

export default BalanceList;
