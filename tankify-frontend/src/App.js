// Main Tankify Application 


// Dependencies 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


// Components & Necessary Files 
import CreateUser from './Components/CreateUser';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Shop from './Components/Shop';
import Tank2 from './Components/Tank2';
import './Static/App.css'
import PinkLavaCanvas from './Components/PinkLavaCanvas';
import PaymentForm from './Components/PaymentForm';

// Context Providers 
import { AlertProvider } from './ContextDirectory/AlertContext';
import { UserProvider } from './ContextDirectory/UserContext';


// Custom Theme 
const theme = createTheme({
    typography: {
        fontFamily: 'Afacad Flux, sans-serif',
    },
    palette: {
        background: {
            default: '#0c1418',
        },
    },
});  


// Tankify Application 
function App() {
    return (
        <Router>
            <UserProvider>
                <AlertProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <PinkLavaCanvas /> 
                            <Navbar />
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/shop" element={<Shop />} />
                                <Route exact path="/tank/:tank_id" element={<Tank2 />} />
                                <Route exact path="/user/create" element={<CreateUser />} />
                                <Route exact path="/user/profile" element={<Profile />} />
                                <Route exact path="/user/login" element={<Login />} />
                            </Routes>
                    </ThemeProvider>
                </AlertProvider>
            </UserProvider>
        </Router>
    );
}

export default App;
