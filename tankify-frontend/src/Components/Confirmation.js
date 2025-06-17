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
                    backgroundColor: "#0d0d0d",
                    boxShadow: "none",
                }
            }}
        >
            <DialogTitle
                sx = {{
                    backgroundColor: '#0d0d0d',
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
                    backgroundColor: '#0d0d0d',
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
                    backgroundColor: '#0d0d0d',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                }}
            >
                <Button
                    onClick = { onClose }
                    variant = 'filled'
                    sx={{
                        backgroundColor: '#ab003c',
                        color: '#fafafa',
                        border: '2px solid transparent',
                        marginRight: '1rem',
                        width: '8rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: '#fafafa',
                            borderColor: '#ab003c',
                            boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                        }
                    }}
                >
                    No 
                </Button>
                <Button
                    onClick = { onConfirm }
                    variant = 'filled'
                    sx={{
                        backgroundColor: '#ab003c',
                        color: '#fafafa',
                        border: '2px solid transparent',
                        marginRight: '1rem',
                        width: '8rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: '#fafafa',
                            borderColor: '#ab003c',
                            boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                        }
                    }}
                >
                    Yes 
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Confirmation; 