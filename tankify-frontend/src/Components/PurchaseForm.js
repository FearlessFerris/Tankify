// Purchase Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';


// Components & Necessary Files 
import TankPurchase from './TankPurchase.js';


// Purchase Component 
function PurchaseForm({ information }) { 


    return(
        <Box 
            sx = {{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'center',
                justifyContent: 'center'
            }}
        >
            <TankPurchase 
                tank = { information }
            />
        </Box>
    )
}

export default PurchaseForm;