import React, { useState } from "react";
import './App.css';
import Table from './components/table/table';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from './components/design-parts/Navbar';

function App() {
  const [theme, colorMode] = useMode();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Topbar setSearchQuery={setSearchQuery} />
          <Table searchQuery={searchQuery} />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
