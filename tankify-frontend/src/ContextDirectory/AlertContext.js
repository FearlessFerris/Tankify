// Alert Context Component Implementation


// Dependencies 
import React, { createContext, useState, useContext, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


// Create Context 
const AlertContext = createContext();


// Custom Hook for accessing the Alert Context 
export const useAlert = () => useContext(AlertContext);


// Alert Provider Component 
export const AlertProvider = ({ children }) => {

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const showAlert = useCallback((message, severity = 'info') => {
        setAlert({
            open: true,
            message,
            severity
        });
    }, []);

    const closeAlert = () => {
        setAlert(prev => ({
            ...prev,
            open: false
        }));
    };

    const iconColor = alert.severity === 'success' ? '#fafafa' : '#ab003c';
    const IconComponent = alert.severity === 'success' ? DoneIcon : CloseIcon;

    return (
        <AlertContext.Provider 
            value = { showAlert } 
        >
            {children}
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={closeAlert}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Alert
                    severity={alert.severity}
                    onClose={closeAlert}
                    icon={
                        <IconComponent
                            onClick={closeAlert}
                            sx={{
                                color: iconColor,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        />
                    }
                    action={
                        <IconComponent
                            onClick={closeAlert}
                            sx={{
                                color: iconColor,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        />
                    }
                    sx={{
                        backgroundColor: '#0d0d0d',
                        border: alert.severity === 'error' ? '.1rem solid #ab003c' : '.1rem solid #fafafa',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                        color: '#fafafa',
                        fontSize: '1.1rem',
                        marginTop: '6rem',
                        minWidth: '20rem',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '.MuiAlert-message': {
                            flex: 1,
                            textAlign: 'center'
                        }
                    }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};