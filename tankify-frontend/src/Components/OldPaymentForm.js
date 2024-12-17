import React, { useState } from 'react';
import { Box, Grid2, TextField, Typography, Grid } from '@mui/material';

const PaymentForm = () => {
  const [cardDetails, setCardDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (field, value) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Grid2 container spacing={3} justifyContent="center" alignItems="center" sx={{ padding: '2rem' }}>
      {/* Debit Card Display */}
      <Grid2 item xs={12} md={6}>
        <Box
          sx={{
            width: '350px',
            height: '200px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ab003c, #87002e)',
            color: '#fff',
            padding: '1rem',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {/* Chip */}
          <Box
            sx={{
              width: '50px',
              height: '30px',
              borderRadius: '4px',
              backgroundColor: '#ffc107',
              position: 'absolute',
              top: '20px',
              left: '20px',
            }}
          />
          {/* Card Number */}
          <Typography
            variant="h6"
            sx={{
              marginTop: '4rem',
              textAlign: 'center',
              letterSpacing: '2px',
            }}
          >
            {cardDetails.cardNumber || '#### #### #### ####'}
          </Typography>
          {/* Cardholder Name and Expiry */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
              padding: '0 1rem',
            }}
          >
            <Box>
              <Typography variant="caption">CARDHOLDER</Typography>
              <Typography variant="subtitle1">{cardDetails.cardholderName || 'FULL NAME'}</Typography>
            </Box>
            <Box>
              <Typography variant="caption">EXPIRY</Typography>
              <Typography variant="subtitle1">{cardDetails.expiry || 'MM/YY'}</Typography>
            </Box>
          </Box>
          {/* CVV Placeholder */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
            }}
          >
            <Typography variant="caption">CVV</Typography>
            <Typography variant="subtitle1">{cardDetails.cvv || '***'}</Typography>
          </Box>
        </Box>
      </Grid2>

      {/* Form for Input */}
      <Grid2 item xs={12} md={6}>
        <Box component="form" sx={{ maxWidth: '400px', width: '100%' }}>
          <TextField
            fullWidth
            label="Cardholder Name"
            variant="outlined"
            margin="normal"
            value={cardDetails.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
          />
          <TextField
            fullWidth
            label="Card Number"
            variant="outlined"
            margin="normal"
            value={cardDetails.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
          />
          <TextField
            fullWidth
            label="Expiry Date (MM/YY)"
            variant="outlined"
            margin="normal"
            value={cardDetails.expiry}
            onChange={(e) => handleInputChange('expiry', e.target.value)}
          />
          <TextField
            fullWidth
            label="CVV"
            variant="outlined"
            margin="normal"
            value={cardDetails.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value)}
            type="password"
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default PaymentForm;
