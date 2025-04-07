// // CurrencyPurchaseForm Component Implementation 


// // Dependencies 
// import React, { useEffect, useState } from 'react';
// import { Box, InputAdornment, IconButton, TextField, Typography } from '@mui/material';
// import { GrMoney } from 'react-icons/gr';


// // Components and Necessary Files 


// // Context Providers 


// // CurrencyPurchaseForm Component 
// function CurrencyPurchaseForm({ user }) { 


//     const [ creditPurchaseAmount, setCreditPurchaseAmount ] = useState( 0 );

//     const handleIncrement = () => setCreditPurchaseAmount(( previous ) => previous + 500 );
//     const handleDecrement = () => setCreditPurchaseAmount(( previous ) => previous - 500 );

//     return( 
//         <div 
//             className = 'currency-purchase-form-container'
//         >
//             <form
              
//             > 
//               <Box 
//                 sx = {{
//                     marginTop: '1.5rem',
//                     width: '16rem'
//                 }}
//               >
//                 <TextField 
//                     id = 'credits'
//                     label = 'Credit Amount'
//                     placeholder = 'Select Credit Amount Ex: 2,000'
//                     variant = 'outlined'
//                     size = 'small'
//                     autoFocus = { false }
//                     type = 'number'
//                     value = { creditPurchaseAmount === 0 ? "" : creditPurchaseAmount }
//                     onChange = { ( e ) => {
//                         let value = e.target.value.replace(/,/g, "");
//                         value = value.replace(/^0+(?=\d)/, "");
//                         setCreditPurchaseAmount(value === "" ? 0 : parseInt(value, 10));
//                     }}
//                     sx = {{
//                         input: {
//                           backgroundColor: '#161616',
//                           color: '#ab003c',
//                           marginLeft: '.2rem',
//                           width: '20rem',
//                         },
//                         label: {
//                           color: '#fafafa',
//                         },
//                         '& .MuiOutlinedInput-root': {
//                           '& fieldset': {
//                               border: '#ab003c .2rem solid',
//                               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
//                           },
//                             '&:hover fieldset': {
//                               border: '#ab003c .2rem solid',
//                               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
//                           },
//                             '&.Mui-focused fieldset': {
//                               border: '#ab003c .2rem solid',
//                               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
//                           },
//                         },
//                         '& .MuiInputLabel-root': {
//                           color: '#ab003c',
//                         },
//                         '& .MuiInputLabel-root.Mui-focused': {
//                           color: '#ab003c',
//                         },
//                         width: '100%',
//                       }}
//                       inputProps={{
//                         step: 500, 
//                         min: 0, 
//                     }}                     
//                 />
//               </Box>
//             </form>
//         </div>
//     )
// }


// export default CurrencyPurchaseForm; 

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useState } from 'react';

function CurrencyPurchaseForm() {
  const [creditPurchaseAmount, setCreditPurchaseAmount] = useState(0);

  const handleIncrement = () => setCreditPurchaseAmount((prev) => prev + 500);
  const handleDecrement = () => setCreditPurchaseAmount((prev) => Math.max(0, prev - 500));

  return (
    <TextField
      label="Credit Amount"
      placeholder="Select Credit Amount Ex: 2,000"
      variant="outlined"
      size="small"
      type="number"
      value={creditPurchaseAmount === 0 ? '' : creditPurchaseAmount}
      onChange={(e) => {
        let value = e.target.value.replace(/,/g, '');
        value = value.replace(/^0+(?=\d)/, '');
        setCreditPurchaseAmount(value === '' ? 0 : parseInt(value, 10));
      }}
      InputProps={{
        inputProps: {
          min: 0,
          step: 500,
          style: {
            MozAppearance: 'textfield',
          }
        },
        endAdornment: (
          <InputAdornment position="end">
            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
              <IconButton
                onClick={handleDecrement}
                size="small"
                sx={{
                  padding: '0.3rem',
                  backgroundColor: '#ab003c',
                  color: '#fafafa',
                  fontSize: '0.8rem',
                  height: '1.6rem',
                  width: '1.6rem',
                  '&:hover': {
                    backgroundColor: '#900C3F',
                  },
                }}
              >
                <Remove fontSize="inherit" />
              </IconButton>
              <IconButton
                onClick={handleIncrement}
                size="small"
                sx={{
                  padding: '0.3rem',
                  backgroundColor: '#ab003c',
                  color: '#fafafa',
                  fontSize: '0.8rem',
                  height: '1.6rem',
                  width: '1.6rem',
                  '&:hover': {
                    backgroundColor: '#900C3F',
                  },
                }}
              >
                <Add fontSize="inherit" />
              </IconButton>
            </Box>
          </InputAdornment>
        )
      }}
      sx={{
        input: {
          backgroundColor: '#161616',
          color: '#ab003c',
          width: '10rem',
          padding: '0.4rem 0.5rem',
          fontSize: '1.5rem',
          '&::-webkit-outer-spin-button': { WebkitAppearance: 'none', margin: 0 },
          '&::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 },
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: '#ab003c 0.125rem solid',
            boxShadow: '0 0.25rem 0.625rem rgba(0, 0, 0, 0.4)',
          },
          '&:hover fieldset': {
            border: '#ab003c 0.125rem solid',
          },
          '&.Mui-focused fieldset': {
            border: '#ab003c 0.125rem solid',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#ab003c',
          fontSize: '0.9rem',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#ab003c',
        },
        maxWidth: '16rem',
        marginTop: '1.5rem'
      }}
    />
    )
}

export default CurrencyPurchaseForm