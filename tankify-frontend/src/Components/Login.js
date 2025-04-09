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

  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/login', form);
      const userData = response.data.user;
      login(userData);
      setForm({ username: '', password: '' });
      showAlert(response.data.message, 'success');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while logging in, please try again.';
      showAlert(errorMessage, 'error');
    }
  };

  const getAdornmentColor = (isValid) => (isValid ? '#fafafa' : '#ab003c');

  return (
    <Box
  component="form"
  onSubmit={handleSubmit}
  sx={{
    backgroundColor: '#0d0d0d',
    borderRadius: '1rem',
    width: 'fit-content',
    minWidth: '30rem',
    maxWidth: '90vw',
    marginTop: '15rem',
    mx: 'auto',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
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
        sx={{
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
        }}
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
        sx={{
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
        }}
      />

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
            color: '#ab003c',
            backgroundColor: 'transparent',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
            width: '8rem',
            '&:hover': {
              backgroundColor: '#ab003c',
              color: '#fafafa',
              transform: 'scale(1.03)',
            },
            '&:active': {
              transform: 'scale(0.98)',
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)',
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;