// Dependencies
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

// Components & Necessary Files
import cardImage from '../Static/card.png';

// Payment Form
function PaymentForm() {
    const [paymentInformation, setPaymentInformation] = useState({
        cardholderName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handlePaymentInformation = (field, value) => {
        setPaymentInformation((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // Simple Validation
        const { cardholderName, cardNumber, expiry, cvv } = paymentInformation;
        if (!cardholderName || !cardNumber || !expiry || !cvv) {
            alert('Please fill out all fields.');
            return;
        }
        alert('Payment information submitted successfully!');
        console.log('Payment Information:', paymentInformation);
    };

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#121212',
                padding: '2rem'
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    backgroundColor: '#161616',
                    borderRadius: '.3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '2rem',
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
                    width: '45rem'
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        color: '#fafafa',
                        marginBottom: '2rem'
                    }}
                >
                    Add <span style={{ color: '#ab003c' }}> Card </span>
                </Typography>
                {/* Card Preview */}
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
                        variant='h6'
                        sx={{
                            marginTop: '4rem',
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

                {/* Form Fields */}
                <Box
    sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '45rem',
        gap: '.5rem', // Adds spacing between fields
    }}
>
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
                    ? 'Ex: 1234 5678 9101 1123'
                    : field === 'expiry'
                    ? 'Ex: 11/23'
                    : 'Ex: 123'
            }
            variant='outlined'
            size='small'
            type={field === 'cvv' ? 'password' : 'text'}
            onChange={(e) => handlePaymentInformation(field, e.target.value)}
            value={paymentInformation[field]}
            sx={{
                marginBottom: '1rem',
                input: { color: '#fafafa' },
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
                width: '18rem', // Set the width here
                alignSelf: 'center', // Centers the input fields
            }}
        />
    ))}
</Box>


                {/* Submit Button */}
                <Button
                    variant='contained'
                    sx={{
                        marginTop: '1rem',
                        backgroundColor: '#ab003c',
                        '&:hover': {
                            backgroundColor: '#8b002f'
                        },
                        color: '#fafafa',
                        fontWeight: 'bold'
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default PaymentForm;
