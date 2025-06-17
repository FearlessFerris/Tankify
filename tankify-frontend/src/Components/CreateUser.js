// Create User V2 Component Implementation 
 

// Dependencies 
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { CheckCircle, CloudUploadOutlined, DeleteOutline, Error, LinkOutlined } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { validateCreateUserForm } from '../utils/formValidators';


// Context Providers 
import { useAlert } from '../ContextDirectory/AlertContext';
import { useUser } from '../ContextDirectory/UserContext';


// Create User V2 Component 
function CreateUserV2() {

    const navigate = useNavigate();
    const showAlert = useAlert();

    // State Variables 
    const fileInputRef = useRef( null );
    const [ linkImage, setLinkImage ] = useState( false );
    const [ fileName, setFileName ] = useState( '' );
    const [ form, setForm ] = useState({ 
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        image: null,
    });

    const handleFormChange = ( event ) => { 
        const { id, value } = event.target;
        setForm(( previous ) => ({ 
            ...previous,
            [ id ]: value
        }));
    }

    const handleFileChange = ( event ) => { 
        if( event.target.files && event.target.files.length > 0 ){ 
            setForm({ 
                ...form,
                image: event.target.files[ 0 ]
            });
            setFileName( event.target.files[ 0 ].name );
            setLinkImage( false );
        }
    }

    const handleFileRemove = () => { 
        setForm({ 
            ...form, 
            image: null
        });
        setFileName( '' );
        if( fileInputRef.current ){ 
            fileInputRef.current.value = '';
        }
    }

    const handleLinkImage = () => { 
        if( linkImage === false ){ 
            handleFileRemove(); 
            setLinkImage( true );
        }
        else{ 
            handleLinkImageRemove(); 
        }
    }

    const handleLinkImageRemove = () => {
        setForm({ 
            ...form, 
            image: null
        }); 
        setLinkImage( false );
    }

    const getAdornmentColor = ( isValid ) => ( isValid ? '#fafafa' : '#ab003c' );

    // API Helper Functions 
    const handleSubmit = async ( event ) => { 
        event.preventDefault(); 
        const errors = validateCreateUserForm( form );
        if( errors.length > 0 ){ 
            showAlert( errors[ 0 ], 'error' );
        }
        const formData = new FormData(); 
        const fieldsToAppend = [ 'username', 'password', 'confirmPassword', 'email' ];
        fieldsToAppend.forEach(( key ) => { 
            if( form[ key ] ){ 
                formData.append( key, form[ key ] );
            }
        });
        if( form.image ){ 
            if( typeof form.image === 'string' ){ 
                formData.append( 'link', form.image );
            }
            else{ 
                formData.append( 'image', form.image );
            }
        }
        try{ 
            const response = await apiClient.post( '/create', formData );
            setForm({ 
                username: '',
                password: '', 
                confirmPassword: '', 
                email: '',
                image: null
            });
            setFileName( '' );
            setLinkImage( false );
            showAlert( response.data.message, 'success' );
            navigate( '/user/login' );
        }
        catch( error ){ 
            console.error( 'Error creating user' ) 
        }
    }

    // Initial Data Fetching 


    // Modular Input Renders 

    // Create User Form Input Render 
    const renderFormInput = () => {
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
                    variant='h2'
                    sx={{
                        color: '#fafafa',
                        textAlign: 'center'
                    }}
                >
                    Create&nbsp;<span style={{ color: '#ab003c' }} > Account </span>
                </Typography>

                <Divider
                    aria-hidden='true'
                    sx={{
                        backgroundColor: '#ab003c',
                        marginBottom: '1rem',
                        mx: 'auto',
                        width: '30rem'
                    }}
                />

                <TextField
                    id='username'
                    label='Username'
                    placeholder='Ex: Javaris Jamar Javarison Lamar'
                    size='small'
                    variant='standard'
                    InputProps ={ getValidationAdornment( form.username, 'username' ) }
                    onChange = { handleFormChange }
                    sx={inputStyles}
                    value = { form.username }
                />

                <TextField
                    id='password'
                    label='Password'
                    type='password'
                    placeholder='Ex: ImASuperSecretPassword123@!'
                    size='small'
                    variant='standard'
                    InputProps = { getValidationAdornment( form.password, 'password' ) }
                    onChange = { handleFormChange }
                    sx={inputStyles}
                    value = { form.password }
                />

                <TextField
                    id='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    placeholder='Ex: ImASuperSecretPassword123@!'
                    size='small'
                    variant='standard'
                    InputProps = { getValidationAdornment( form.confirmPassword, 'confirmPassword' ) }
                    onChange = { handleFormChange }
                    sx={inputStyles}
                    value = { form.confirmPassword }
                />

                <TextField
                    id='email'
                    label='Email'
                    type='email'
                    placeholder='Ex: jacksparrow@hotmail.com'
                    size='small'
                    variant='standard'
                    InputProps = { getValidationAdornment( form.email, 'email' ) }
                    onChange = { handleFormChange }
                    sx={inputStyles}
                    value = { form.email }
                />
            </Box>
        )
    }


    // Create Form Buttons Render 
    const renderFormButtons = () => {

        return (
            <>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: '.5rem'
                }}
                >
                <Button
                    component='label'
                    variant='standard'
                    size = 'large'
                    startIcon = { <CloudUploadOutlined /> }
                    sx={{
                        backgroundColor: '#ab003c',
                        border: '2px solid transparent',
                        color: '#fafafa',
                        marginRight: '1rem',
                        transition: 'all 0.3s ease',
                        width: '10rem',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            borderColor: '#ab003c',
                            boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                            color: '#fafafa',
                        }
                    }}
                    >
                    Upload Image
                    <input
                        type='file'
                        name='image'
                        hidden
                        ref = { fileInputRef }
                        onChange = { handleFileChange }
                    />
                </Button>
                <Button
                    component='label'
                    variant='standard'
                    onClick = { handleLinkImage }
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
                    { linkImage ? 'Remove Link' : 'Link Image' }
                </Button>

            </Box>
                { fileName && ( 
                    <Box 
                    sx = {{ 
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                    > 
                        <Typography
                            variant = 'h6'
                            sx = {{ 
                                color: '#ab003c'
                            }}
                        > 
                        { fileName }
                        <IconButton
                                onClick={handleFileRemove}
                                sx={{
                                    color: '#ab003c',
                                    marginLeft: '.2rem',
                                    '&:hover':{ 
                                        backgroundColor: '#fafafa'
                                    }
                                }}
                            >
                                <DeleteOutline />
                            </IconButton>
                        </Typography>
                    </Box> 
                )}
                { linkImage && ( 
                    <Box 
                        sx = {{ 
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    > 
                        <TextField 
                            id = 'image'
                            name = 'Image URL'
                            placeholder = 'Ex: www.pirateswithhats.net'
                            variant = 'standard'
                            size = 'small'
                            onChange = { handleFormChange }
                            value = { form.image }
                            sx = {{ 
                                ...inputStyles,
                                marginTop: '0rem'
                            }}
                        />
                    </Box>
                )}
                <Button
                     type = 'submit'
                     variant = 'standard'
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
                    Create 
                </Button>
            </>
        )
    }

    // Render Login Link  
    const renderLoginLink = () => { 

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
                    Already have an account? { ' ' }
                    <Button 
                        onClick = { () => navigate( '/user/login' ) }
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
                        Login Here
                    </Button>
                    </Typography>
                </Box>
            </>
        )
    }

    // Input Props Render 
    const getValidationAdornment = ( input, fieldName ) => { 
        
        let isValid = false; 

        switch( fieldName ){ 
            case 'username': 
                isValid = input.length >= 6;
                break;
            case 'password': 
                isValid = input.length >= 8 && /\d/.test( input )
                break; 
            case 'confirmPassword': 
                isValid = input === form.password && input.length >= 8; 
                break; 
            case 'email': 
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
                break;
        }

        return {
        endAdornment: (
            <InputAdornment position="end">
                {isValid ? (
                    <CheckCircle sx={{ color: getAdornmentColor(true) }} />
                ) : (
                    <Error sx={{ color: getAdornmentColor(false) }} />
                )}
            </InputAdornment>
        )
    };
    };

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

    // CreateUser Render 
    return (
        <Box
            onSubmit = { handleSubmit }
            component='form'
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
                width: '45rem'
            }}
        >
            { renderFormInput() }
            { renderFormButtons() }
            { renderLoginLink() }
        </Box>
    )

}

export default CreateUserV2;