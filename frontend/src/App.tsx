import React from 'react';
import { Container } from '@mui/material';
import BalanceList from './components/BalanceList';

const App: React.FC = () => {
  return (
    <Container>
      <BalanceList />
    </Container>
  );
};

export default App;
