// Confirmation Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';


// Components & Necessary Files 


// Confirmation Component
function Confirmation({ open, onClose, onConfirm }) { 
    
    return( 
        <Dialog 
            open = { open }
            onClose = { onClose }
            maxWidth = 'sm'
            fullWidth 
            PaperProps={{
                sx: {
                    borderRadius: "1.5rem",
                    backgroundColor: "#161616",
                    boxShadow: "none",
                    border: "2px solid #161616"
                }
            }}
        >
            <DialogTitle
                sx = {{
                    backgroundColor: '#161616',
                    color: '#fafafa',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '2rem'
                }}
            >
                Confirm Purchase
            </DialogTitle>
            <DialogContent
                sx = {{
                    backgroundColor: '#161616',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                >
                <DialogContentText
                    sx = {{
                        color: '#fafafa',
                        fontSize: '1.5rem'
                    }}
                >
                    Are you sure you would like to proceed? 
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx = {{
                    backgroundColor: '#161616',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Button
                    onClick = { onClose }
                    variant = 'filled'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#900C3F',
                            backgroundColor: '#161616',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                            fontStyle: 'bold',
                            fontSize: '1.1rem',
                            marginRight: '1rem',
                            width: '8rem',
                            '&:hover': {
                                backgroundColor: '#ab003c',
                                color: '#fafafa',
                            },
                        }}
                >
                    No 
                </Button>
                <Button
                    onClick = { onConfirm }
                    variant = 'filled'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#900C3F',
                            backgroundColor: '#161616',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                            fontStyle: 'bold',
                            fontSize: '1.1rem',
                            marginRight: '1rem',
                            width: '8rem',
                            '&:hover': {
                                backgroundColor: '#ab003c',
                                color: '#fafafa',
                            },
                        }}
                >
                    Yes 
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Confirmation; 