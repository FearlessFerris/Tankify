// Alert Context Component Implementation 


// Dependencies 
import React, { createContext, useState, useContext, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


// Components & Necessary Files 


// Create Context 
const AlertContext = createContext();


// Custom Hook for accessing the Alert Context 
export const useAlert = () => useContext( AlertContext );


// Alert Provider Component 
export const AlertProvider = ({ children }) => {

    const [ alert, setAlert ] = useState({ 
        open: false,
        message: '',
        severity: 'info'
    });

    const showAlert = useCallback(( message, severity = 'info' ) => {
        setAlert({
            open: true, 
            message,
            severity
        });
    }, [] );
    
    const closeAlert = () => {
        setAlert(( previous ) => ({
            ...previous,
            open: false
        }));
    }

    return(
        <AlertContext.Provider value = { showAlert }>
        { children }
        <Snackbar
            open = { alert.open }
            autoHideDuration = { 6000 }
            onClose = { closeAlert }
            anchorOrigin = {{ 
                vertical: 'top',
                horizontal: 'center' 
            }}
            >
            <Alert
                onClose = { closeAlert }
                severity = { alert.severity }
                sx = {{
                    width: '100%',
                    fontSize: '1.1rem',
                    backgroundColor: '#161616',
                    color: alert.severity === 'error' ? '#ab003c' : '#fafafa',
                    border: '.1rem solid #fafafa',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                    marginTop: '4rem'
                }} 
                icon={
                    alert.severity === 'success' ? (
                        <DoneIcon sx={{ color: '#fafafa' }} />
                    ) : alert.severity === 'error' ? (
                        <CloseIcon sx={{ color: '#ab003c' }} />
                    ) : null
                }
            > 
                { alert.message }
            </Alert>
        </Snackbar>
    </AlertContext.Provider>
    )
}