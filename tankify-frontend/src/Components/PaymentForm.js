// PaymentForm Component Implementation 


// Dependencies
import React, { useState } from 'react';
import { Box, FormControlLabel, Switch, Typography, TextField, Button } from '@mui/material';


// Components & Necessary Files
import cardImage from '../Static/card.png';
import apiClient from '../api/apiClient';


// Context Providers
import { useAlert } from '../ContextDirectory/AlertContext';
import { useUser } from '../ContextDirectory/UserContext';


// Payment Form
function PaymentForm({ onClose, refreshPaymentMethods }) {

    const { user } = useUser();
    const showAlert = useAlert();
    const [ isCreditCard, setIsCreditCard ] = useState( false );
    const [paymentInformation, setPaymentInformation] = useState({
        cardholderName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        type: 'Debit',
        details: ''
    });

    const formatCardNumber = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 16);
        const formatted = digits.replace(/(\d{4})/g, '$1 ').trim();
        return formatted;
    };

    const formatExpiry = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 4);
        if (digits.length > 2) {
            return digits.slice(0, 2) + '/' + digits.slice(2);
        }
        return digits;
    };

    const formatCvv = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 3);
        return digits;
    }

    const handlePaymentInformation = (field, value) => {
        if (field === 'cardNumber') {
            setPaymentInformation((prev) => ({
                ...prev,
                cardNumber: formatCardNumber(value)
            }));
        } else if (field === 'expiry') {
            setPaymentInformation((prev) => ({
                ...prev,
                expiry: formatExpiry(value)
            }));
        } else if (field === 'cvv') {
            setPaymentInformation((prev) => ({
                ...prev,
                cvv: formatCvv(value)
            }));
        }
        else {
            setPaymentInformation((prev) => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const toggleCreditCard = () => {
        setIsCreditCard((previous) => !previous);
        setPaymentInformation(( previous ) => ({
            ...previous,
            type: !isCreditCard ? 'Credit' : 'Debit'
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { cardholderName, cardNumber, expiry, cvv } = paymentInformation;
        if (!cardholderName || !cardNumber || !expiry || !cvv) {
            alert('Please fill out all fields.');
            return;
        }  
        const response = await apiClient.post(`/payments/${user.id}`, paymentInformation );
        console.log(response.data.data );
        if ( response.status === 200 ){
            setPaymentInformation({ 
                cardholderName: '',
                cardNumber: '',
                expiry: '',
                cvv: '',
                type: 'debit',
                details: ''
            });
            onClose();
            refreshPaymentMethods();
            showAlert(`Card: ${ response.data.data[ 'card_number' ] } was successfully added to your payment methods`, 'success' );
        }
    };

    return (
        <Box
            sx={{
                alignItems: 'center',
                backgroundColor: '#161616',
                borderRadius: '1rem',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '2rem',
                width: '30rem'
            }}
        >
            <Typography
                variant='h3'
                sx={{
                    color: '#fafafa',
                    marginBottom: '2rem'
                }}
            >
                Add <span style={{ color: '#ab003c' }}> { isCreditCard ? 'Credit' : 'Debit' } </span> Card 
            </Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={isCreditCard}
                        onChange={toggleCreditCard}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#ab003c',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#ab003c',
                            },
                        }}
                    />
                }
                label={isCreditCard ? 'Credit Card' : 'Debit Card'}
                sx={{
                    color: '#fafafa',
                    marginBottom: '2rem',
                }}
            />
            <Box
                sx={{
                    borderRadius: '1.2rem',
                    backgroundImage: `url(${cardImage})`,
                    backgroundSize: 'cover',
                    color: '#fafafa',
                    height: '12rem',
                    marginBottom: '2rem',
                    padding: '1rem',
                    position: 'relative',
                    width: '23rem',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
                }}
            >
                <Typography
                    varaint='caption'
                >
                    {isCreditCard ? 'CREDIT' : 'DEBIT'}
                </Typography>
                <Typography
                    variant='h6'
                    sx={{
                        marginTop: '1rem',
                        textAlign: 'center',
                        letterSpacing: '.2rem',
                        color: '#ab003c',
                        fontWeight: 'bold',
                    }}
                >
                    {paymentInformation.cardNumber || '#### #### #### ####'}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '1rem',
                        marginLeft: '1rem',
                        marginRight: '1rem'
                    }}
                >
                    <Box>
                        <Typography variant='caption'>CARDHOLDER</Typography>
                        <Typography variant='subtitle1'>
                            {paymentInformation.cardholderName || 'FULL NAME'}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='caption'>EXPIRY</Typography>
                        <Typography variant='subtitle1'>
                            {paymentInformation.expiry || 'MM/YY'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {['cardholderName', 'cardNumber', 'expiry', 'cvv'].map((field) => (
                <TextField
                    key={field}
                    id={field}
                    label={
                        field === 'cardholderName'
                            ? 'Cardholder Name'
                            : field === 'cardNumber'
                                ? 'Card Number'
                                : field === 'expiry'
                                    ? 'Expiry'
                                    : 'CVV'
                    }
                    placeholder={
                        field === 'cardholderName'
                            ? 'Ex: Billy Bob Thorton'
                            : field === 'cardNumber'
                                ? '#### #### #### ####'
                                : field === 'expiry'
                                    ? 'MM/YY'
                                    : 'Ex: 123'
                    }
                    variant='outlined'
                    size='small'
                    onChange={(e) => handlePaymentInformation(field, e.target.value)}
                    value={paymentInformation[field]}
                    sx={{
                        marginBottom: '1.5rem',
                        input: { color: '#fafafa', width: '18rem' },
                        label: { color: '#fafafa' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: '.2rem solid #ab003c',
                            },
                            '&:hover fieldset': {
                                borderColor: '#ab003c',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#ab003c',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#fafafa',
                        },
                        width: '18rem',
                        alignSelf: 'center',
                    }}
                />
            ))}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '2rem'
                }}
            >

                <Button
                    onClick={handleSubmit}
                    variant='filled'
                    sx={{
                        color: '#ab003c',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                        marginRight: '1rem',
                        width: '9rem',
                        '&:hover': {
                            backgroundColor: '#ab003c',
                            color: '#fafafa'
                        }
                    }}
                >
                    Submit
                </Button>
                <Button
                    onClick={onClose}
                    variant='filled'
                    sx={{
                        color: '#ab003c',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                        width: '9rem',
                        '&:hover': {
                            backgroundColor: '#ab003c',
                            color: '#fafafa'
                        }
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}

export default PaymentForm;