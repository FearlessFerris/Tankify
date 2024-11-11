// Edit User Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { CheckCircle, CloudUploadOutlined, DeleteOutline, Error, LinkOutlined } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Edit User Component 
function EditUser({ user, onClose }) {

    const [ linkImage, setLinkImage ] = useState( false );
    const [ fileName, setFileName ] = useState( '' );
    const [ passwordsMatch, setPasswordsMatch ] = useState( true );
    const [ form, setForm ] = useState({ 
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        image: null,
    });

    const handleChange = ( e ) => {
        const { id, value } = e.target;
        setForm({
            ...form,
            [ id ]: value
        });

        if ( id === 'password' || id === 'confirmPassword' ) {
            setPasswordsMatch( value === ( id === 'password' ? form.confirmPassword : form.password ));
        }

        if ( id === 'image' ) {
            setForm({ ...form, image: value });
            setLinkImage( true );
            setFileName( '' );
        }
    }

    const handleFileChange = ( e ) => {
        if ( e.target.files && e.target.files.length > 0 ) { 
            setForm({ ...form, image: e.target.files[0] });
            setFileName( e.target.files[0].name );
            setLinkImage( false );
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
        setLinkImage( true );
        setForm({ 
            ...form,
            image: ''
        });
    }

    const handleSaveChanges = async () => {
        try {
            const formData = new FormData();
            formData.append('username', form.username);
            formData.append('password', form.password);
            formData.append('email', form.email);
            if (form.image && !linkImage) {
                formData.append('image', form.image);
            } else if (linkImage) {
                formData.append('imageLink', form.image);
            }
            
            await apiClient.put(`/users/${user.id}`, formData);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }
    
    return(
        <div
            className = 'edit-user-component'
        >
            <form
                style = {{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            > 

            <Box
                sx = {{
                    alignItems: 'center',
                    backgroundColor: '#ab003c',
                    borderRadius: '1rem',
                    border: '.2rem solid #fafafa',
                    display: 'flex',
                    height: '45rem',
                    flexDirection: 'column',
                    width: '30rem',
                }}
                >
                <Typography
                    variant = 'h3'
                    sx = {{
                        color: '#fafafa',
                        marginTop: '1rem'
                    }}
                    > 
                <span style = {{ color: '#004d40' }}> { user.username }'s </span> Profile 
                </Typography>
                
                <div
                    style = {{
                        display: 'flex',
                        marginTop: '3rem'
                    }}
                    >
                    <TextField
                        id = 'username'
                        type = 'username'
                        label = 'Username'
                        placeholder = 'Ex: Javaris Jamar Javarison Lamar'
                        variant = 'outlined'
                        size = 'small'
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
                    style = {{
                        display: 'flex',
                        marginTop: '1.5rem'
                    }}
                >
                    <TextField
                        id = 'password'
                        type = 'password'
                        label = 'Password'
                        placeholder = 'Ex: ImASuperSecretPassword'
                        variant = 'outlined'
                        size = 'small'
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
                        >

                    </TextField>
                </div>
                <div
                    style = {{
                        display: 'flex',
                        marginTop: '1.5rem'
                    }}
                    >
                    <TextField
                        id = 'confirmPassword'
                        type = 'password'
                        label = 'Confirm Password'
                        placeholder = 'Ex: ImASuperSecretPassword'
                        variant = 'outlined'
                        size = 'small'
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
                    >

                    </TextField>
                </div>
                <div
                    style = {{
                        display: 'flex',
                        marginTop: '1.5rem'
                    }}
                    >
                    <TextField
                        id = 'email'
                        type = 'email'
                        label = 'Email'
                        placeholder = 'Ex: JackSparrow@hotmail.com'
                        variant = 'outlined'
                        size = 'small'
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
                        >

                    </TextField>
                </div>

                {/* Password, Confirm Password, and Email Fields */}
                {/* Same styling and onChange logic as username */}
                {/* Upload Image / Link Image Section */}
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
                                sx = {{
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
                    style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '10rem'
                    }}
                >

                <Button
                    variant="contained"
                    onClick={handleSaveChanges}
                    sx={{
                        backgroundColor: '#004d40',
                        color: '#fafafa',
                        '&:hover': {
                            backgroundColor: '#00332f'
                        }
                    }}
                    >
                    Save Changes
                </Button>
                <Button
                    variant="contained"
                    onClick={ onClose }
                    sx={{
                        backgroundColor: '#004d40',
                        color: '#fafafa',
                        marginLeft: '1rem',
                        '&:hover': {
                            backgroundColor: '#00332f'
                        }
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

