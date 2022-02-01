import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home";

const theme = createTheme({
  palette: {},
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
