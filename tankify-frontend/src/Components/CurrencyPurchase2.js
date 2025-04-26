// Currency Purchase Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Divider, InputAdornment, IconButton, TextField, Typography } from '@mui/material';
import { FaCheck } from "react-icons/fa6";
import { FiPlus, FiMinus } from 'react-icons/fi';
import { GoNumber } from "react-icons/go";


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Currency Purchase Component
function CurrencyPurchase2({ user, onClose }) {

    const [paymentOptions, setPaymentOptions] = useState([]);
    const [form, setForm] = useState({
        amount: '',
        paymentMethodId: '',
    });

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        try {
            const response = await apiClient.get(`/payments/${user.id}/all`);
            setPaymentOptions(response.data.data);
        } catch (error) {
            console.error('Error fetching payment methods');
        }
    };

    // const fetchExchangeRate = 

    const handleAmountInputChange = (e) => {
        const value = e.target.value;
        const numbersOnly = value.replace(/\D/g, '');
        const cleaned = numbersOnly.replace(/^0+(?=\d)/, '');
        setForm((previous) => ({
            ...previous,
            amount: cleaned,
        }));
    };

    const handleRoundAmount = () => { 
        const current = Number( form.amount || 0 )
        if( current % 10000 !== 0 ){ 
            const rounded = current - ( current % 10000 );
            setForm(( previous ) => ({ 
                ...previous,
                amount: rounded > 0 ? String( rounded ) : '',
            }));
        }
    };

    const handleAmountDecrement = () => {
        const current = Number(form.amount || 0);
        const newAmount = current - 10000;
        setForm((previous) => ({
            ...previous,
            amount: newAmount <= 0 ? '' : String(newAmount),
        }));
    };

    const handleAmountIncrement = () => {
        const current = Number(form.amount || 0);
        const newAmount = current + 10000;
        setForm((previous) => ({
            ...previous,
            amount: newAmount <= 0 ? '' : String(newAmount),
        }));
    };

    const handlePaymentMethodChange = (event, value) => {
        setForm((previous) => ({
            ...previous,
            paymentMethodId: value,
        }));
    };

    // Modular Input Renderers --------------------------------------------------------------------------------------------------

    // Amount Input Render 
    const renderAmount = ( params ) => {
        return (
            <Box 
                sx = {{ 
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
            <TextField
                { ...params }
                label='Amount'
                placeholder="Ex: 200000 Credits"
                onBlur = { handleRoundAmount }
                onChange={handleAmountInputChange}
                value={form.amount}
                variant="standard"
                inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 10,
                }}
                InputProps={{
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
                sx = { inputStyles }
                />
            </Box>
        );
    };

    // Payment Autocomplete Render 
    const renderPaymentAutocomplete = () => {
        return (
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Autocomplete
                    freeSolo
                    getOptionLabel={getPaymentOptionLabel}
                    onChange={handlePaymentMethodChange}
                    options={paymentOptions}
                    renderInput={ renderPaymentInput }
                    renderOption={paymentOptionRenderer}
                    slotProps={paymentSlotProps}
                    value={form.paymentMethodId}
                />
            </Box>
        );
    };

    // Payment Input Render 
    const renderPaymentInput = ( params ) => { 
        return( 
            <TextField
            { ...params }
            label= 'Select a Payment Method'
            placeholder="Ex: Card Ending in 5432"
            variant="standard"
            sx = { inputStyles }
            />
        )
    }

    // Autocomplete Option Render 
    const renderPaymentOption = (form) => ({ key, ...props }, option) => {
        const isSelected = form.paymentMethodId === option;
        const label = `${option.cardholder_name} ****${option.card_number.slice(-4)}${option.default_method ? ' • Default' : ''}`;

        return (
            <Box
                component="li"
                key={key}
                {...props}
                sx={{
                    alignItems: 'center',
                    color: isSelected ? '#fafafa' : '#fafafa',
                    backgroundColor: isSelected ? '#ab003c' : 'transparent',
                    display: 'flex',
                    padding: '.2rem .2rem',
                    '&:hover': {
                        background: '#ab003c',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <span>{label}</span>
                    {isSelected && (
                        <FaCheck
                            style={{
                                color: '#fafafa',
                                fontSize: '1rem',
                                marginLeft: '0.5rem',
                            }}
                        />
                    )}
                </Box>
            </Box>
        );
    };

    const paymentOptionRenderer = renderPaymentOption(form);

    // Autocomplete Label Formatter 
    const getPaymentOptionLabel = (option) => {
        if (typeof option === 'string') return option;
        return `${option.cardholder_name} **** ${option.card_number.slice(-4)} ${option.default_method ? 'Default' : ''}`;
    };

    // Autocomplete Slot Props 
    const paymentSlotProps = {
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
        clearIndicator: {
            sx: {
                color: '#ab003c',
                '&:hover': {
                    color: '#ff3366',
                },
            },
        },
    };

    // Promo Code Input Render 
    const renderPromoInput = ( params ) => { 
        return( 
            <Box 
                sx = {{ 
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            > 
                <TextField 
                    { ...params }
                    label = 'Promo Code?'
                    placeholder = 'Ex: SaveMoney23!'
                    variant = 'standard'
                    sx = { inputStyles }
                /> 
            </Box>
        )
    }

    // Live Price / Receipt 
    const renderLivePrice = () => { 
        return( 
            <Box 
                sx = {{ 
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'center',
                    justifyContent: 'center'
                }}
            > 
                <Typography 
                    variant = 'h4'
                >
                    Price 
                </Typography>
            </Box>
        )
    }


    // Action Button Renders ( Submit + Cancel )
    const renderActionButtons = () => { 
        return( 
            <Box
                sx = {{ 
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: '2rem',
                }}
            >
                { renderSubmitButton() }
                { renderCancelButton() }
            </Box>
        )
    }

    // Submit Button Render 
    const renderSubmitButton = () => { 
        return( 
            <Button
            variant="contained"
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
            Submit
        </Button>
        );
    };

    // Cancel Button Render 
    const renderCancelButton = () => { 
        return(
            <Button
            onClick={onClose}
            variant="contained"
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
            Cancel
        </Button>
        )
    }

    // Input Style Render 
    const inputStyles = {
        width: '25rem',
        '& .MuiInputBase-input': { color: '#fafafa', fontSize: '1.5rem' },
        '& .MuiInputLabel-root': { color: '#ab003c', fontSize: '1.5rem' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#ab003c' },
        '& .MuiInput-underline:before': { borderBottom: '2px solid transparent' },
        '& .MuiInput-underline:after': { borderBottom: '2px solid transparent' },
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 44, 109, 0.9) 50%, transparent 100%)',
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
    };

    // Currency Purchase Component Render ------------------------------------------------------------------------------------------------------------
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
                gap: '1.5rem',
            }}
        >
            <Typography
                variant="h2"
                sx = {{ 
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
                    width: '30rem',
                }}
            />
            { renderAmount() }
            { renderPaymentAutocomplete() } 
            { renderPromoInput() }
            { renderLivePrice() }
            { renderActionButtons() }
        </Box>
    );
}

export default CurrencyPurchase2;
