import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Checkbox } from '@mui/material';
import axios from 'axios';

interface BalanceItem {
	id: number;
	month: string;
	description: string;
	amount: number;
	is_investment: boolean;
}

const BalanceList: React.FC = () => {
	const [items, setItems] = useState<BalanceItem[]>([]);

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/balance_items/2024-10').then((response) => {
			console.log('API Response:', response.data);
			setItems(response.data);
		});
	}, []);

	return (
		<List>
			{items.map((item) => (
				<ListItem key={item.id}>
					<Checkbox checked={item.is_investment} />
					<ListItemText
						primary={item.description}
						secondary={`Amount: $${item.amount}`}
					/>
				</ListItem>
			))}
		</List>
	);
};

export default BalanceList;
