// Edit User Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { CheckCircle, CloudUploadOutlined, DeleteOutline, Error, LinkOutlined } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useUser } from '../ContextDirectory/UserContext';
import { useAlert } from '../ContextDirectory/AlertContext';


// Edit User Component 
function EditUser({ user, onClose }) {

    const showAlert = useAlert();
    const { login } = useUser();
    const [linkImage, setLinkImage] = useState(false);
    const [fileName, setFileName] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        email: '',
        image: null,
    });
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({
            ...form,
            [id]: value
        });
        
        if (id === 'password') {
            setShowNewPasswordFields(value.length > 0);
        }
        
        if (id === 'newPassword' || id === 'confirmNewPassword') {
            setPasswordsMatch(value === (id === 'newPassword' ? form.confirmNewPassword : form.newPassword));
        }
        
        if (id === 'image') {
            setForm({ ...form, image: value });
            setLinkImage(true);
            setFileName('');
        }
    }
    
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setForm({ ...form, image: e.target.files[0] });
            setFileName(e.target.files[0].name);
            setLinkImage(false);
        }
    }
    
    const handleFileRemove = () => {
        setForm({
            ...form,
            image: null
        });
        setFileName('');
    }
    
    const handleLinkImage = () => {
        setLinkImage(true);
        setForm({
            ...form,
            image: ''
        });
    }
    
    const handleSaveChanges = async () => {
        try {
            const formData = new FormData()
            if (form.username && form.username !== user.username) {
                formData.append('username', form.username)
            }
            if ( form.password && form.password !== '' && passwordsMatch ){
                formData.append( 'password', form.password );
                formData.append( 'newPassword', form.newPassword );
                formData.append( 'confirmNewPassword', form.confirmNewPassword );
            }
            if ( form.email && form.email !== user.email ){
                formData.append( 'email', form.email );
            }
            if (form.image && !linkImage) {
                formData.append('image', form.image);
            } else if (linkImage) {
                formData.append('imageLink', form.image);
            }
            const response = await apiClient.put(`/edit_user/${user.id}`, formData);
            if (response.status === 200) {
                console.log('success');
                login( response.data.user );
                setForm({ 
                    username: '',
                    password: '',
                    newPassword: '',
                    confirmNewPassword: '',
                    email: ''
                });
                showAlert( response.data.message, 'success' );
                onClose();
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }
    
    const getAdornmentColor = (isValid) => (isValid ? '#fafafa' : '#ab003c');

    return (
        <div
        className='edit-user-component'
        >
            <form
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >

                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: '#2b2a2e',
                        borderRadius: '1rem',
                        border: '.2rem solid #fafafa',
                        display: 'flex',
                        minHeight: 'fit-content',
                        flexDirection: 'column',
                        width: '30rem',
                    }}
                >
                    <Typography
                        variant='h3'
                        sx={{
                            color: '#fafafa',
                            marginTop: '1rem'
                        }}
                    >
                        <span style={{ color: '#ab003c' }}> {user.username}'s </span> Profile
                    </Typography>

                    <div
                        style={{
                            display: 'flex',
                            marginTop: '3rem'
                        }}
                    >
                        <TextField
                            id='username'
                            type='username'
                            label='Username'
                            placeholder='Ex: Javaris Jamar Javarison Lamar'
                            variant='outlined'
                            size='small'
                            value={form.username}
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
                                        borderColor: '#fafafa',
                                        border: '.2rem solid #fafafa',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fafafa',
                                        border: '.2rem solid #fafafa',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#fafafa',
                                        border: '.2rem solid #fafafa',
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
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            marginTop: '1.5rem'
                        }}
                    >
                        <TextField
                            id='password'
                            type='password'
                            label='Password'
                            placeholder='Ex: ImASuperSecretPassword'
                            size='small'
                            variant='outlined'
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
                                input: {
                                    color: '#fafafa',
                                    width: '16rem'
                                },
                                label: {
                                    color: '#fafafa'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fafafa',
                                        border: '.2rem solid #fafafa',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fafafa',
                                        border: '.2rem solid #fafafa',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#fafafa',
                                        border: '.2rem solid #fafafa',
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

                    {showNewPasswordFields && (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    marginTop: '1.5rem'
                                }}
                            >
                                <TextField
                                    id='newPassword'
                                    type='password'
                                    label='New Password'
                                    placeholder='Ex: ImASuperSecretPassword'
                                    size='small'
                                    variant='outlined'
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {form.newPassword.length >= 8 ? (
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
                                            width: '16rem'
                                        },
                                        label: {
                                            color: '#fafafa'
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#fafafa',
                                                border: '.2rem solid #fafafa',
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#fafafa',
                                                border: '.2rem solid #fafafa',
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#fafafa',
                                                border: '.2rem solid #fafafa',
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
                                    marginTop: '1.5rem'
                                }}
                            >
                                <TextField
                                    id='confirmNewPassword'
                                    type='password'
                                    label='Confirm New Password'
                                    placeholder='Ex: ImASuperSecretPassword'
                                    size='small'
                                    variant='outlined'
                                    value={form.confirmNewPassword}
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {form.confirmNewPassword.length >= 8 && passwordsMatch ? (
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
                                            width: '16rem'
                                        },
                                        label: {
                                            color: '#fafafa'
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#fafafa',
                                                border: '.2rem solid #fafafa',
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#fafafa',
                                                border: '.2rem solid #fafafa',
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#fafafa',
                                                border: '.2rem solid #fafafa',
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
                        </>
                    )}
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '1.5rem'
                        }}
                    >
                        <TextField
                            id='email'
                            type='email'
                            label='Email'
                            placeholder='Ex: JackSparrow@hotmail.com'
                            size='small'
                            variant='outlined'
                            value={form.email}
                            onChange={handleChange}
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
                                    width: '16rem'
                                },
                                label: {
                                    color: '#fafafa'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fafafa',
                                        border: '.2rem solid #fafafa',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fafafa',
                                        border: '.2rem solid #fafafa',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#fafafa',
                                        border: '.2rem solid #fafafa',
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
                            marginTop: '1.5rem',
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
                                border: '.2rem solid #fafafa',
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
                                border: '.2rem solid #fafafa',
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
                                border: '.2rem solid #fafafa',
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
                                <DeleteOutline
                                    sx={{
                                        color: '#004d40'
                                    }}
                                />
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
                                            borderColor: '#fafafa',
                                            border: '.2rem solid #fafafa',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#fafafa',
                                            border: '.2rem solid #fafafa',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#fafafa',
                                            border: '.2rem solid #fafafa',
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

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '3rem',
                            marginBottom: '2rem'
                        }}
                    >

                        <Button
                            variant="outlined"
                            onClick={handleSaveChanges}
                            sx={{
                                backgroundColor: '#263238',
                                border: '.2rem solid #fafafa',
                                color: '#fafafa',
                            }}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{
                                backgroundColor: '#263238',
                                border: '.2rem solid #fafafa',
                                color: '#fafafa',
                                marginLeft: '1rem',
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default EditUser;