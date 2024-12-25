// Payment Form Component Implementation 


// Dependencies 
import React, { useCallback, useState, useEffect } from 'react';
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import cardImage from '../Static/card.png';


// Context Directories 
import { useAlert } from '../ContextDirectory/AlertContext';
import { useUser } from '../ContextDirectory/UserContext';


// Payment Form Component 
function PaymentForm({ onClose, refreshPaymentMethods, updatePaymentMethod, cardId = null, userId = null, openCount = 0 }) {

    const { user } = useUser();
    const showAlert = useAlert();
    const [ isCreditCard, setIsCreditCard ] = useState(false);
    const [ isDefault, setIsDefault ] = useState( false );
    const [ isFlipped, setIsFlipped ] = useState(false);
    const [ paymentInformation, setPaymentInformation ] = useState({
        cardholderName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        type: 'Debit',
        details: '',
        defaultMethod: false,
    });

    const userIdToUse = userId || user?.id;

    useEffect(() => {
        if (cardId && userIdToUse) {
            const fetchCardDetails = async () => {
                try {
                    const response = await apiClient.get(`/payments/${userIdToUse}/card/${cardId}`);
                    const cardData = response.data;
                    console.log( cardData );
                    setPaymentInformation({
                        cardholderName: cardData.cardholder_name,
                        cardNumber: cardData.card_number,
                        expiry: cardData.expiry,
                        cvv: cardData.cvv,
                        type: cardData.type,
                        details: cardData.details,
                        defaultMethod: cardData.default_method,
                    });
                    setIsCreditCard(cardData.type === 'Credit');
                    setIsDefault( cardData.default_method );
                } catch (error) {
                    console.error('Error fetching payment information:', error);
                }
            };
            fetchCardDetails();
        } else {
            setPaymentInformation({
                cardholderName: '',
                cardNumber: '',
                expiry: '',
                cvv: '',
                type: 'Debit',
                details: '',
                defaultMethod: false,
            });
            setIsCreditCard(false);
        }
    }, [ cardId, userIdToUse, openCount ]);

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
        setPaymentInformation((previous) => ({
            ...previous,
            type: !isCreditCard ? 'Credit' : 'Debit',
        }));
    };

    const toggleIsDefault = () => {
        const newDefaultState = !isDefault;
        setIsDefault(newDefaultState);
        setPaymentInformation((previous) => ({
            ...previous,
            defaultMethod: newDefaultState, 
        }));
    };
    

    const handleCvvFocus = () => setIsFlipped(true);
    const handleCvvBlur = () => setIsFlipped(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { cardholderName, cardNumber, expiry, cvv } = paymentInformation;
        console.log(paymentInformation);
        if (!cardholderName || !cardNumber || !expiry || !cvv) {
            showAlert('Please fill out all required fields!', 'error');
            return;
        }

        try {
            if (cardId) {
                const response = await apiClient.patch(`/payments/edit/${userId}/${cardId}`, paymentInformation);
                const updatedCard = response.data;
                showAlert('Card updated successfully!', 'success');
                updatePaymentMethod(updatedCard)
                refreshPaymentMethods();
            }
            else {
                const response = await apiClient.post(`/payments/${userId}`, paymentInformation);
                const newCard = response.data;
                const cardNumber = newCard.data[ 'card_number' ];
                showAlert( `Payment Method: ${ cardNumber } added successfully!`, 'success' );
                refreshPaymentMethods();
            }
            setPaymentInformation({
                cardholderName: '',
                cardNumber: '',
                expiry: '',
                cvv: '',
                type: 'Debit',
                details: '', 
                defaultMethod: false,
            });
            refreshPaymentMethods();
            onClose();
        }
        catch (error) {
            console.error('Error saving payment information:', error);
            showAlert('Failed to save payment information', 'error');
        }
    }


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
                marginTop: '10rem',
                padding: '2rem',
                width: '30rem',
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    color: '#fafafa',
                    marginBottom: '1.5rem',
                }}
            >
                {cardId ? 'Edit' : 'Add'}
                <span style={{ color: '#ab003c' }}> {isCreditCard ? 'Credit' : 'Debit'} </span> Card
            </Typography>
            <Box
            >

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
                    marginRight: '3rem'
                }}
                />
                <FormControlLabel
                control={
                    <Switch
                        checked={isDefault}
                        onChange={toggleIsDefault}
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
                label = { 'Set as Default' }
                sx={{
                    color: '#fafafa',
                    marginBottom: '2rem',
                }}
            />
                </Box>
            <Box
                sx={{
                    perspective: '1000px',
                    width: '23rem',
                    height: '12rem',
                    marginBottom: '2rem',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '1.2rem',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.6)',
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: `url(${cardImage})`,
                            backgroundSize: 'cover',
                            backfaceVisibility: 'hidden',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '1.2rem',
                            padding: '1rem',
                            color: '#fafafa',
                        }}
                    >
                        <Typography
                            varaint='caption'
                        >
                            {isCreditCard ? 'CREDIT' : 'DEBIT'}
                        </Typography>
                        <Typography
                            variant="h6"
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
                                marginTop: '2rem',
                                marginLeft: '1rem',
                                marginRight: '1rem',
                            }}
                        >
                            <Box>
                                <Typography variant="caption">CARDHOLDER</Typography>
                                <Typography variant="subtitle1">FULL NAME</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption">EXPIRY</Typography>
                                <Typography variant="subtitle1">MM/YY</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            backgroundImage: `url(${cardImage})`,
                            backgroundSize: 'cover',
                            backfaceVisibility: 'hidden',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '1.2rem',
                            padding: '1rem',
                            transform: 'rotateY(180deg)',
                            color: '#fafafa',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: '#000',
                                height: '2rem',
                                marginTop: '3rem',
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '1rem',
                                paddingRight: '1rem',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '0.2rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {paymentInformation.cvv || '###'}
                            </Typography>
                        </Box>
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
                            ? 'Ex: John Doe'
                            : field === 'cardNumber'
                                ? '#### #### #### ####'
                                : field === 'expiry'
                                    ? 'MM/YY'
                                    : 'Ex: 123'
                    }
                    variant="outlined"
                    size="small"
                    onChange={(e) => handlePaymentInformation(field, e.target.value)}
                    value={paymentInformation[field]}
                    onFocus={field === 'cvv' ? handleCvvFocus : undefined}
                    onBlur={field === 'cvv' ? handleCvvBlur : undefined}
                    sx={{
                        marginBottom: '1.5rem',
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
                        width: '18rem',
                    }}
                />
            ))}
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
                <Button
                    onClick={handleSubmit}
                    variant="filled"
                    sx={{
                        color: '#ab003c',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                        marginRight: '1rem',
                        width: '9rem',
                        '&:hover': {
                            backgroundColor: '#ab003c',
                            color: '#fafafa',
                        },
                    }}
                >
                    Submit
                </Button>
                <Button
                    onClick={onClose}
                    variant="filled"
                    sx={{
                        color: '#ab003c',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                        width: '9rem',
                        '&:hover': {
                            backgroundColor: '#ab003c',
                            color: '#fafafa',
                        },
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}

export default PaymentForm;