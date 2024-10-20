// Main Tankify Application 


// Dependencies 
import React, { useState } from 'react';
import { Typography } from '@mui/material';


// Necessary Files & Components
import Menu from './Components/Menu';
import './Static/App.css'


// Tankify Application 
function App() {


  return (
    <div 
      className = "application-container" 
      style = {{ 
        alignItems: 'center',
        backgroundColor: '#263238',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >


    <Menu /> 
    </div>
  );
}

export default App;
