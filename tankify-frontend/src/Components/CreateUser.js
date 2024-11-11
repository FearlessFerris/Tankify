// Create User Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { CheckCircle, CloudUploadOutlined, DeleteOutline, Error, LinkOutlined } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from '../ContextDirectory/AlertContext';


// Create User Component 
function CreateUser() {

    const navigate = useNavigate();
    const showAlert = useAlert();
    const [linkImage, setLinkImage] = useState(false);
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

        if (id === 'image') {
            setForm({ ...form, image: value });
            setLinkImage(true);
            setFileName('');
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setForm({ ...form, image: e.target.files[0] });
            setFileName(e.target.files[0].name)
            setLinkImage(false);
        }
    };

    const handleFileRemove = () => {
        setForm({
            ...form,
            image: null
        });
        setFileName('');
    }

    const handleLinkImage = () => {
        setLinkImage(true);
        setForm({ ...form, image: '' });
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

        if (form.image && typeof form.image !== 'string') {
            formData.append('image', form.image);
        }

        if (form.image && typeof form.image === 'string') {
            formData.append('link', form.image);
        }

        if (form.username === '') {
            showAlert('Username field is required!', 'error')
            return
        }
        if (form.password === '' || form.confirmPassword === '') {
            showAlert('Password field is required!', 'error');
            return
        }
        
        try {
            const response = await apiClient.post('/create', formData);
            setForm({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                image: null
            });
            setFileName('');
            setLinkImage(false);
            showAlert(response.data.message, 'success');
            navigate('/user/login');
        }
        catch (error) {
            console.error('Error creating a new user!', error.response ? error.response.data : error.message);
            showAlert('Unable to create a new user. Please try again.', 'error');
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '1rem',
                            marginBottom: '1rem',
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
                            }}
                        >
                            Upload Image
                            <input
                                type='file'
                                name='image'
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        <Button
                            onClick={() => handleLinkImage()}
                            component='label'
                            variant='outlined'
                            size='large'
                            startIcon={<LinkOutlined />}
                            sx={{
                                color: '#fafafa',
                                display: 'flex',
                                border: '.2rem solid #004d40',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                marginLeft: '1rem'
                            }}
                        >
                            Link Image
                        </Button>
                    </div>
                    {fileName && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                maxWidth: '300px',
                                marginBottom: '1rem',
                                border: '.2rem solid #004d40',
                                borderRadius: '.3rem',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            <Typography
                                variant='body2'
                                sx={{
                                    color: '#fafafa',
                                    textAlign: 'center',
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
                        </Box>
                    )}

                    {linkImage && !fileName && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: '1rem',
                                marginBottom: '1rem',
                            }}
                        >

                            <TextField
                                id='image'
                                label='Image URL'
                                placeholder='Enter the URL for your image'
                                variant='outlined'
                                size='small'
                                value={form.image}
                                onChange={handleChange}
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
                                    marginBottom: '1rem'
                                }}
                            ></TextField>
                        </div>
                    )}
                    <Button
                        type='submit'
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
                </Box>
            </form>
        </div>
    )
}

export default CreateUser;