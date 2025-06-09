// Login Component Implementation 


// Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';


// Components & Necessary Files
import apiClient from '../api/apiClient';


// Context Providers
import { useAlert } from '../ContextDirectory/AlertContext';
import { useUser } from '../ContextDirectory/UserContext';


// Login Component 
function Login() {

    const { login } = useUser();
    const navigate = useNavigate();
    const showAlert = useAlert();
    const [form, setForm] = useState({ 
      username: '', 
      password: '' 
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({ 
          ...form, 
          [id]: value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/login', form);
            const userData = response.data.user;
            login(userData);
            setForm({ 
              username: '', 
              password: '' 
            });
            showAlert(response.data.message, 'success');
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred while logging in, please try again.';
            showAlert(errorMessage, 'error');
        }
    };

    const getAdornmentColor = (isValid) => (isValid ? '#fafafa' : '#ab003c');

// Modular Input Renders -------------------------------------------------------------------------------

// Login Input Render 
const renderLoginInput = () => {
  return (
      <Box
          sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
          }}
      >
          <Typography
              variant="h2"
              sx={{
                  color: '#fafafa',
                  textAlign: 'center',
              }}
          >
              Welcome&nbsp;<span style={{ color: '#ab003c' }}>Back</span>
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

          <TextField
              id="username"
              label="Username"
              placeholder="Ex: Javaris Jamar Javarison Lamar"
              variant="standard"
              size="small"
              value={form.username}
              onChange={handleChange}
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          {form.username.length >= 5 ? (
                              <CheckCircle sx={{ color: getAdornmentColor(true) }} />
                          ) : (
                              <Error sx={{ color: getAdornmentColor(false) }} />
                          )}
                      </InputAdornment>
                  ),
              }}
              sx={inputStyles}
          />

          <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="Ex: ImASuperSecretPassword"
              variant="standard"
              size="small"
              value={form.password}
              onChange={handleChange}
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          {form.password.length >= 8 ? (
                              <CheckCircle sx={{ color: getAdornmentColor(true) }} />
                          ) : (
                              <Error sx={{ color: getAdornmentColor(false) }} />
                          )}
                      </InputAdornment>
                  ),
              }}
              sx={inputStyles}
          />
      </Box>
  )
}

// Login Button Render
const renderLoginButton = () => {
  return (
      <Box
          sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '2rem',
          }}
      >
          <Button
              type="submit"
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
              Login
          </Button>
      </Box>
  );
};

// Render Sign Up Text / Link
const renderSignUpLink = () => { 

    return( 
        <>
            <Box
                sx = {{ 
                    marginTop: '1rem',
                    textAlign: 'center'
                }}
            > 
                <Typography
                    variant = 'h6'
                    sx = {{ 
                        color: '#fafafa'
                    }}
                > 
                Don't have an account? {' '}
                <Button 
                    onClick = { () => navigate( '/user/create') }
                    sx={{
                        color: '#ab003c',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        marginBottom: '.2rem',
                        minWidth: 'auto',
                        padding: 0,
                        textTransform: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                            backgroundColor: 'transparent',
                        },
                    }}
                    >
                    Sign Up 
                </Button>
                </Typography>
            </Box>
        </>
    )
}



// Input Style Render
const inputStyles = {
  marginTop: '2rem',
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
      '0%': { backgroundPosition: '-100% 0' },
      '100%': { backgroundPosition: '100% 0' },
  },
}

// Login Component Render ------------------------------------------------------------------------------------------------
return (
  <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
          alignItems: 'center',
          backgroundColor: '#0d0d0d',
          borderRadius: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          justifyContent: 'center',
          marginTop: '15rem',
          mx: 'auto',
          padding: '2rem',
          width: '45rem',
      }}
  >
      { renderLoginInput() }
      { renderLoginButton() }
      { renderSignUpLink() }
  </Box>
)
}

export default Login;