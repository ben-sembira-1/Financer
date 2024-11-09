import React from 'react';
import { render, screen } from '@testing-library/react';
import BalanceList from './BalanceList';

test('renders balance items', () => {
	render(<BalanceList />);
	const linkElement = screen.getByText(/Amount:/i);
	expect(linkElement).toBeInTheDocument();
});
