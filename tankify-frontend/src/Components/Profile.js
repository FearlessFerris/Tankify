// Profile Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Backdrop, Box, Button, Typography, TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import EditUser from './Edituser';


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext';
import { formControlClasses } from '@mui/material';


// Profile Component 
function Profile() {

    const { user } = useUser();
    const [ hover, setHover ] = useState( false );
    const [ open, setOpen ] = useState( false );

    const onOpen = () => {
        setOpen( true );
    }

    const onClose = () => {
        setOpen( false );
    }

    return (
        <div
            className='profile-container'
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '10rem',
                maxWidth: '45rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                border: '.2rem solid #004d40',
                borderRadius: '.3rem',
                padding: '2rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '12rem',
                    height: '12rem',
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <img
                    src={user.image}
                    alt="User profile"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '.2rem solid #004d40',
                    }}
                />
                {hover && (
                    <PhotoCamera
                        sx={{
                            position: 'absolute',
                            bottom: '0.5rem',
                            right: '0.5rem',
                            color: '#004d40',
                            fontSize: '2.5rem',
                            backgroundColor: '#ab003c',
                            borderRadius: '50%',
                            padding: '0.3rem',
                            cursor: 'pointer',
                        }}
                    />
                )}
            </Box>
            <Typography
                variant='h2'
                sx={{
                    color: '#fafafa',
                    marginBottom: '1rem',
                }}
            >
                Welcome, <span style={{ color: '#ab003c' }}>{user.username}</span>
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{ color: '#ab003c' }}
                >
                    Email:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant='h4'
                        sx={{ color: '#fafafa', marginRight: '0.5rem' }}
                    >
                        {user.email}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{ color: '#ab003c' }}
                >
                    Balance:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant='h4'
                        sx={{ color: '#fafafa', marginRight: '0.5rem' }}
                    >
                        ${user.balance}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{ color: '#ab003c' }}
                >
                    Account Created:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant='h4'
                        sx={{ color: '#fafafa', marginRight: '0.5rem' }}
                    >
                        {new Date(user.created_at).toLocaleDateString()}
                    </Typography>
                </Box>
            </Box>
                <Button 
                    onClick = { onOpen }
                    size = 'large'
                    variant = 'outlined'
                    startIcon = { <EditIcon sx = {{ color: '#ab003c' }} /> }
                    sx={{
                        color: '#fafafa',
                        border: '.2rem solid #004d40',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                Edit
                </Button> 

                <Box 
                    sx = {{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <Backdrop 
                        open = { open }
                        onClose = { onClose }
                    >
                    { open && (
                        <EditUser user = { user } onClose = { onClose } /> 
                    )}
                    </Backdrop>
                </Box>
        </div>
    );
}

export default Profile;