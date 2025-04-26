// MenuSearch Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';


// Necessary Files & Components 


// MenuSearch Component 
function MenuSearch() {

    
    return (
      <Box
        sx = {{
          flexGrow: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          minWidth: '20rem',
          maxWidth: '20rem',
        }}
      >
        <TextField
          id = 'search'
          label = 'Search'
          placeholder = 'How can I help you?'
          variant = 'outlined'
          size = 'small'
          sx = {{
            input: {
              backgroundColor: '#0d0d0d',
              color: '#ab003c',
              width: '20rem'
            },
            label: {
              color: '#fafafa',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                  border: '#ab003c .2rem solid',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
              },
                '&:hover fieldset': {
                  border: '#ab003c .2rem solid',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
              },
                '&.Mui-focused fieldset': {
                  border: '#ab003c .2rem solid',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#ab003c',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#ab003c',
            },
            width: '100%',
          }}
        />
      </Box>
    );
  }

export default MenuSearch;