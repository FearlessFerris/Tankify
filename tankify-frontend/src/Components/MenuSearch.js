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
              backgroundColor: '#161616',
              color: '#fafafa', 
              width: '20rem'
            },
            label: {
              color: '#fafafa',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                  border: 'none',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              },
                '&:hover fieldset': {
                  border: 'none',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              },
                '&.Mui-focused fieldset': {
                  border: 'none',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#fafafa',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#fafafa',
            },
            width: '100%',
          }}
        />
      </Box>
    );
  }

export default MenuSearch;