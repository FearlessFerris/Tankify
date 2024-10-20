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
          variant = 'outlined'
          size = 'small'
          sx = {{
            input: {
              color: '#fafafa', 
              width: '20rem'
            },
            label: {
              color: '#fafafa',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#004d40',
              },
              '&:hover fieldset': {
                borderColor: '#004d40',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#004d40',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#fafafa',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#004d40',
            },
            width: '100%',
          }}
        />
      </Box>
    );
  }

export default MenuSearch;