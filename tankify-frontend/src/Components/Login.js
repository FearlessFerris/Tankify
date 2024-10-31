// Login Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';


// Components & Necessary Files 


// Login Component 
function Login() {

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    };

    const getAdornmentColor = (isValid) => (isValid ? '#004d40' : '#ab003c');

    return (
        <div
            className='login-container'
            style={{
                color: '#eceff1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10rem'
            }}
        >
            <form
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    border: '.2rem solid #004d40',
                    borderRadius: '.3rem',
                    padding: '2rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
                }}
            >

                <Typography
                    variant='h2'
                    color='#eceff1'
                    sx={{
                        textAlign: 'center',
                        marginBottom: '6rem',
                        marginTop: '2rem'
                    }}
                >
                    Login
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}
                >

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >
                        <TextField
                            id='username'
                            label='Username'
                            placeholder='Ex: Javaris Jamar Javarison Lamar'
                            variant='outlined'
                            size='small'
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
                                input: {
                                    color: '#fafafa',
                                    width: '18rem'
                                },
                                label: {
                                    color: '#fafafa'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#004d40',
                                        border: '.2rem solid #004d40',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#004d40',
                                        border: '.2rem solid #004d40',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#004d40',
                                        border: '.2rem solid #004d40',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
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
                        >
                        </TextField>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >
                        <TextField
                            id='password'
                            type='password'
                            label='Password'
                            placeholder='Ex: ImASuperSecretPassword'
                            variant='outlined'
                            value={form.password}
                            onChange={handleChange}
                            size='small'
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
                                input: {
                                    color: '#fafafa',
                                    width: '18rem'
                                },
                                label: {
                                    color: '#fafafa'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#004d40',
                                        border: '.2rem solid #004d40',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#004d40',
                                        border: '.2rem solid #004d40',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#004d40',
                                        border: '.2rem solid #004d40',
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
                        >
                        </TextField>
                    </div>

                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: '2rem'
                        }}
                    >

                        <Button
                            variant='outlined'
                            size='large'
                            sx={{
                                color: '#fafafa',
                                display: 'flex',
                                border: '.2rem solid #004d40',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            Login
                        </Button>
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default Login;