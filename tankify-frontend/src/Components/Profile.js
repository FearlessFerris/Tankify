// Profile Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext';
import { formControlClasses } from '@mui/material';


// Profile Component 
function Profile() {

    const { user } = useUser();

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
            }}
            >
            <Avatar
                src={user.image}
                alt='User profile'
                sx={{
                    width: '7rem',
                    height: '7rem',
                    marginBottom: '1rem',
                }}
            />
            <Typography
                variant='h2'
                sx={{
                    color: '#fafafa',
                    marginBottom: '1rem',
                }}
            >
                Welcome, <span style={{ color: '#ab003c' }}>{user.username}</span>
            </Typography>

            {/* Email Field */}
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
                    <Button
                        size='small'
                        sx={{
                            minWidth: 'auto', // To keep button compact
                            color: '#fafafa',
                            border: '.2rem solid #004d40',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            padding: '0.3rem',
                        }}
                    >
                        <EditIcon sx={{ color: '#ab003c' }} />
                    </Button>
                </Box>
            </Box>

            {/* Balance Field */}
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
                    <Button
                        size='small'
                        sx={{
                            minWidth: 'auto',
                            color: '#fafafa',
                            border: '.2rem solid #004d40',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            padding: '0.3rem',
                        }}
                    >
                        <EditIcon sx={{ color: '#ab003c' }} />
                    </Button>
                </Box>
            </Box>

            {/* Account Created Field */}
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
                    <Button
                        size='small'
                        sx={{
                            minWidth: 'auto',
                            color: '#fafafa',
                            border: '.2rem solid #004d40',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            padding: '0.3rem',
                        }}
                    >
                        <EditIcon sx={{ color: '#ab003c' }} />
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default Profile;