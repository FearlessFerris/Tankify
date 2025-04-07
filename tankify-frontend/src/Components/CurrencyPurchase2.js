// Currency Purchase Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Divider, InputAdornment, IconButton, TextField, Typography } from '@mui/material';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { GoNumber } from "react-icons/go";


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// // Context Provider 
// import { user } from '../ContextDirectory/UserContext';


// Currency Purchase Component
function CurrencyPurchase2({ user, onClose }) {

    const [ paymentOptions, setPaymentOptions ] = useState([]); 
    const [form, setForm] = useState({
        amount: '',
        paymentMethodId: ''
    });

    useEffect( () => { 
        if( user?.id ){ 
            fetchPaymentMethods( user.id );
        }
    }, [] );

    const fetchPaymentMethods = async ( userId ) => { 
        try{ 
            const response = await apiClient.get( `/payments/${ userId }/all` );
            setPaymentOptions(response.data.data.map((card) => {
                return `${card.cardholder_name} - **** ${card.card_number}`;
              }));    
        }
        catch( error ){ 
            console.error( 'Error fetching payment methods' );
        }
    }
   
    const handleAmountIncrement = () => {
        setForm((previous) => ({
            ...previous,
            amount: String(Number(previous.amount || 0) + 10000),
        }))
    }

    const handleAmountDecrement = () => {
        setForm((previous) => {
            const newAmount = Math.max(0, Number(previous.amount || 0) - 10000);
            return {
                ...previous,
                amount: String(newAmount),
            };
        });
    };

    return (
        <Box
            component="form"
            sx={{
                backgroundColor: '#0d0d0d',
                borderRadius: '1rem',
                minWidth: '45rem',
                margin: 'auto',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: '#fafafa',
                    textAlign: 'center'
                }}
            >
                Currency&nbsp;
                <span style={{ color: '#ab003c' }}>Purchase</span>
            </Typography>

            <Divider
                aria-hidden="true"
                sx={{
                    backgroundColor: '#ab003c',
                    marginBottom: '1rem'
                }}
            />

            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <TextField
                    label="Amount"
                    name="amount"
                    onChange={(e) => {
                        const cleaned = e.target.value.replace(/^0+(?=\d)/, '');
                        setForm((prev) => ({
                            ...prev,
                            amount: cleaned === '' ? '' : String(Number(cleaned)),
                        }));
                    }}
                    placeholder="Ex: 2,000,000 Credits"
                    size="small"
                    type="number"
                    value={form.amount}
                    variant="standard"
                    InputProps={{
                        inputProps: {
                            min: 0,
                            style: { MozAppearance: 'textfield' }
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                    <IconButton
                                        onClick={handleAmountDecrement}
                                        sx={{
                                            backgroundColor: '#ab003c',
                                            color: '#fafafa',
                                            fontSize: '1rem',
                                            padding: '0.25rem',
                                            '&:hover': {
                                                backgroundColor: '#900C3F',
                                            },
                                        }}
                                    >
                                        <FiMinus />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleAmountIncrement}
                                        sx={{
                                            backgroundColor: '#ab003c',
                                            color: '#fafafa',
                                            fontSize: '1rem',
                                            padding: '0.25rem',
                                            '&:hover': {
                                                backgroundColor: '#900C3F',
                                            },
                                        }}
                                    >
                                        <FiPlus />
                                    </IconButton>
                                </Box>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        position: 'relative',
                        width: '20rem',

                        '& .MuiInputBase-input': {
                            color: '#fafafa',
                            fontSize: '1.5rem',
                        },
                        '& .MuiInputLabel-root': {
                            color: '#ab003c',
                            fontSize: '1.5rem',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#ab003c',
                        },
                        '& .MuiInput-underline:before': {
                            borderBottom: '2px solid transparent',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottom: '2px solid transparent',
                        },

                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: '2px',
                            width: '100%',
                            background:
                                'linear-gradient(90deg, transparent 0%, rgba(255, 44, 109, 0.9) 50%, transparent 100%)',
                            backgroundSize: '200% auto',
                            animation: 'pulseLine 1.8s linear infinite',
                            opacity: 0.7,
                            filter: 'drop-shadow(0 0 4px rgba(255, 44, 109, 0.7))',
                            pointerEvents: 'none',
                        },

                        '@keyframes pulseLine': {
                            '0%': {
                                backgroundPosition: '-100% 0',
                            },
                            '100%': {
                                backgroundPosition: '100% 0',
                            },
                        },
                    }}
                />
            </Box>

            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Autocomplete
                    freeSolo
                    options = { paymentOptions }
                    value={form.paymentMethodId}
                    onInputChange={(event, newValue) => {
                        setForm((prev) => ({
                          ...prev,
                          paymentMethodId: newValue
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Payment Method"
                            placeholder="Ex: Card Ending in 1234"
                            variant="standard"
                            sx={{
                                position: 'relative',
                                width: '20rem',
                                '& .MuiInputBase-input': {
                                    color: '#fafafa',
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#ab003c',
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#ab003c',
                                },
                                '& .MuiInput-underline:before': {
                                    borderBottom: '2px solid transparent',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottom: '2px solid transparent',
                                },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    height: '2px',
                                    width: '100%',
                                    background:
                                        'linear-gradient(90deg, transparent 0%, rgba(255, 44, 109, 0.9) 50%, transparent 100%)',
                                    backgroundSize: '200% auto',
                                    animation: 'pulseLine 1.8s linear infinite',
                                    opacity: 0.7,
                                    filter: 'drop-shadow(0 0 4px rgba(255, 44, 109, 0.7))',
                                    pointerEvents: 'none',
                                },
                                '@keyframes pulseLine': {
                                    '0%': { backgroundPosition: '-100% 0' },
                                    '100%': { backgroundPosition: '100% 0' },
                                },
                            }}
                        />
                    )}
                />

            </Box>

            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >

                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: '#ab003c',
                        color: '#fafafa',
                        marginTop: '2rem',
                        marginRight: '1rem',
                        width: '8rem'
                    }}
                >
                    Submit
                </Button>

                <Button
                    onClick = { onClose }
                    variant='contained'
                    sx={{
                        backgroundColor: '#ab003c',
                        color: '#fafafa',
                        marginTop: '2rem',
                        width: '8rem'
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}

export default CurrencyPurchase2;