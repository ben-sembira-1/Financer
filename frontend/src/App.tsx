import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import BalanceList from './components/BalanceList';
import darkTheme from './theme'; // Import the dark theme

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <BalanceList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
