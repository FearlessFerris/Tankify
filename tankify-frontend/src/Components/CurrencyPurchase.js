// CurrencyPurchase Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';


// Components & Necessary Files 


// Context Providers 



// CurrencyPurchase Component 
function CurrencyPurchase({ user, onClose }) {


    return(
        <Box
            sx = {{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <Typography 
                variant = 'h2'
                sx = {{
                    color: '#fafafa'
                }}
            >
                { user.username }
            </Typography>
        </Box>
    )
}

export default CurrencyPurchase;