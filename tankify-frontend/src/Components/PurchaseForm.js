// Purchase Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';


// Components & Necessary Files 
import CurrencyPurchase from './CurrencyPurchase.js';
import TankPurchase from './TankPurchase.js';


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext';


// Purchase Component 
function PurchaseForm({ information, onClose }) { 

    const { user } = useUser();
    const [ formType, setFormType ] = useState( null );

    useEffect( () => {
        if( information?.username ){
            setFormType( 'currency' );
        }
        else { 
            setFormType( 'tank' );
        }
    }, [ information ] );

    return(
        <Box 
            sx = {{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'center',
                justifyContent: 'center'
            }}
        >
            { formType === 'tank' && (
                <TankPurchase 
                tank = { information }
                onClose = { onClose }
                />
            )}
            { formType === 'currency' && (
                <CurrencyPurchase 
                    user = { user }
                    onClose = { onClose }
                />
            )}
        </Box>
    )
}

export default PurchaseForm;