// Main Tankify Application 


// Dependencies 
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


// Components & Necessary Files 
import CreateUser from './Components/CreateUser';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import './Static/App.css'


// Context Providers 
import { AlertProvider } from './ContextDirectory/AlertContext';


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
        <AlertProvider>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Router>
            <Navbar />
                <Routes>
                    <Route exact path = '/' element = { <Home /> } />
                    <Route exact path = '/user/create' element = { <CreateUser /> } />  
                </Routes>
          </Router>
        </ThemeProvider>
        </AlertProvider>
    );
}

export default App;
