// Currency Purchase Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Divider, InputAdornment, IconButton, TextField, Typography } from '@mui/material';
import { FaCheck } from "react-icons/fa6";
import { FiPlus, FiMinus } from 'react-icons/fi';
import { GoNumber } from "react-icons/go";


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// // Context Provider 
// import { user } from '../ContextDirectory/UserContext';


// Currency Purchase Component
function CurrencyPurchase2({ user, onClose }) {

    const [paymentOptions, setPaymentOptions] = useState([]);
    const [form, setForm] = useState({
        amount: '',
        paymentMethodId: ''
    });

    useEffect(() => {
        if (user?.id) {
            fetchPaymentMethods(user.id);
        }
    }, []);

    const fetchPaymentMethods = async (userId) => {
        try {
            const response = await apiClient.get(`/payments/${userId}/all`);
            console.log( response.data.data );
            setPaymentOptions(response.data.data.map((card) => {
                if( card.default_method === true ){ 
                    return `${ card.cardholder_name } - **** ${ card.card_number } Default`
                }
                return `${card.cardholder_name} - **** ${card.card_number}`;
            }));
        }
        catch (error) {
            console.error('Error fetching payment methods');
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
          const current = Number(previous.amount || 0);
          const newAmount = current - 10000;
          return {
            ...previous,
            amount: newAmount <= 0 ? '' : String(newAmount),
          };
        });
      };
      

    return (
        <Box
            component="form"
            sx={{
                backgroundColor: '#0d0d0d',
                borderRadius: '1rem',
                minWidth: '40rem',
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
                    marginBottom: '1rem',
                    mx: 'auto',
                    width: '30rem'
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
                            amount: cleaned === '0' || cleaned === '' ? '' : cleaned,
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
                        width: '25rem',

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
                    options={paymentOptions}
                    value={form.paymentMethodId}
                    onInputChange={(event, newValue) => {
                        setForm((prev) => ({
                            ...prev,
                            paymentMethodId: newValue,
                        }));
                    }}
                    renderOption={(props, option) => {
                        const isSelected = form.paymentMethodId === option;

                        return (
                            <Box
                                component="li"
                                {...props}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.5rem 1rem',
                                    color: isSelected ? '#fafafa' : '#fafafa',
                                    backgroundColor: isSelected ? '#ab003c' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                    },
                                }}
                            >
                                {option}
                                {isSelected && (
                                    <FaCheck sx={{ fontSize: '1rem', color: '#fafafa', ml: 1 }} />
                                )}
                            </Box>
                        );
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                backgroundColor: '#0d0d0d',
                                borderRadius: '0.5rem',
                            },
                        },
                        listbox: {
                            sx: {
                                '& .MuiAutocomplete-option': {
                                    transition: 'background-color 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#fafafa',
                                    },
                                    '&[aria-selected="true"]': {
                                        backgroundColor: '#ab003c !important',
                                        color: '#fafafa',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#ab003c',
                                        color: '#fafafa',
                                    },
                                },
                            },
                        },
                    }}

                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Payment Method"
                            placeholder="Ex: Card Ending in 1234"
                            variant="standard"
                            sx={{
                                width: '25rem',
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
                    marginTop: '2rem'
                }}
            >

                <Button
                    variant='contained'
                    sx={{
                        color: '#ab003c',
                        backgroundColor: 'transparent',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                        marginRight: '1rem',
                        transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
                        width: '8rem',
                        '&:hover': {
                            backgroundColor: '#ab003c',
                            color: '#fafafa',
                            transform: 'scale(1.03)',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)'
                        }
                    }}

                >
                    Submit
                </Button>

                <Button
                    onClick={onClose}
                    variant='contained'
                    sx={{
                        color: '#ab003c',
                        backgroundColor: 'transparent',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                        marginRight: '1rem',
                        transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
                        width: '8rem',
                        '&:hover': {
                            backgroundColor: '#ab003c',
                            color: '#fafafa',
                            transform: 'scale(1.03)',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)'
                        }
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}

export default CurrencyPurchase2;