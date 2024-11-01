// Create User Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { CheckCircle, CloudUploadOutlined, DeleteOutline, Error } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from '../ContextDirectory/AlertContext';


// Create User Component 
function CreateUser() {

    const showAlert = useAlert();
    const [fileName, setFileName] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        image: null,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({
            ...form,
            [id]: value
        });

        if (id === 'password' || id === 'confirmPassword') {
            setPasswordsMatch(value === (id === 'password' ? form.confirmPassword : form.password));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setForm({ ...form, image: e.target.files[0] });
            setFileName(e.target.files[0].name)
        }
    };

    const handleFileRemove = () => {
        setForm({
            ...form,
            image: null
        });
        setFileName('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordsMatch) {
            showAlert('Passwords do not match', 'error');
            return
        }
        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('password', form.password);
        formData.append('email', form.email);
        if (form.image) {
            formData.append('image', form.image);
        }
        if ( form.username === '' ){
            showAlert( 'Username field is required!', 'error' )
            return
        }
        if( form.password === '' || form.confirmPassword === '' ){
            showAlert( 'Password field is required!', 'error' );
            return
        }
        
         try {
            const response = await apiClient.post('/create', formData);
            console.log(response.data.message);
            setForm({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                image: null
            });
            showAlert(`Congratulations ${form.username}, your account was successfully created!`, 'success')
        }
        catch {
            console.error('Error creating a new user!');
        }
    }

    const getAdornmentColor = (isValid) => (isValid ? '#004d40' : '#ab003c');

    return (
        <div
            className='create-user-container'
            style={{
                color: '#eceff1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10rem'
            }}
        >
            <form
                onSubmit={handleSubmit}
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
                        marginBottom: '4rem',
                        marginTop: '2rem'
                    }}
                >
                    Create User
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}
                >
                    {/* Username Field */}
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
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >
                        <TextField
                            id='confirmPassword'
                            type='password'
                            label='Confirm Password'
                            placeholder='Ex: ImASuperSecretPassword'
                            variant='outlined'
                            value={form.confirmPassword}
                            onChange={handleChange}
                            size='small'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {form.password && form.password === form.confirmPassword ? (
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
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >
                        <TextField
                            id='email'
                            type='email'
                            label='Email'
                            placeholder='Ex: jacksparrow@hotmail.com'
                            variant='outlined'
                            value={form.email}
                            onChange={handleChange}
                            size='small'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? (
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
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '1rem',
                        }}
                    >
                        <Button
                            component='label'
                            role={undefined}
                            variant='outlined'
                            size='large'
                            startIcon={<CloudUploadOutlined />}
                            sx={{
                                color: '#fafafa',
                                display: 'flex',
                                border: '.2rem solid #004d40',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                marginBottom: '1rem', // Add space below the button
                            }}
                        >
                            Image
                            <input
                                type='file'
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        {fileName && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    maxWidth: '300px',
                                    marginBottom: '1rem',
                                }}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: '#fafafa',
                                        textAlign: 'left',
                                        flexGrow: 1,
                                    }}
                                >
                                    {fileName}
                                </Typography>
                                <IconButton
                                    onClick={handleFileRemove}
                                    sx={{
                                        color: '#ab003c',
                                    }}
                                >
                                    <DeleteOutline />
                                </IconButton>
                            </div>
                        )}
                    </div>
                    <div>
                        <Button
                            onClick={handleSubmit}
                            variant='outlined'
                            size='large'
                            sx={{
                                color: '#fafafa',
                                display: 'flex',
                                border: '.2rem solid #004d40',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                marginTop: '1rem'
                            }}
                        >
                            Create
                        </Button>
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default CreateUser;