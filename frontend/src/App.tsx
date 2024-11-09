import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import BalanceList from "./components/BalanceList";
import darkTheme from "./theme"; // Import the dark theme
import Grid from "@mui/material/Grid";
import CreateBalanceItem from "./components/CreateBalanceItem";
import BalanceChart from "./components/BalanceChart";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CreateBalanceItem />
          </Grid>
          <Grid item xs={12} md={6}>
            <BalanceChart />
          </Grid>
          <Grid item xs={12}>
            <BalanceList />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
