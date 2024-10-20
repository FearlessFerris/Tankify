// Main Tankify Application 


// Dependencies 
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


// Necessary Files & Components
import Menu from './Components/Menu';
import './Static/App.css'



// Custom Theme 
const theme = createTheme({
    typography: {
        fontFamily: 'Afacad Flux, sans-serif',
    },
    palette: {
        background: {
            default: '#263238',
        },
    },
});



// Tankify Application 
function App() {


    return (
        <ThemeProvider
            theme={theme}
        >
            <CssBaseline />
            <div
                className="application-container"
                style={{
                    alignItems: 'center',
                    backgroundColor: '#263238',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
              <Menu />
            </div>
        </ThemeProvider>
    );
}

export default App;
