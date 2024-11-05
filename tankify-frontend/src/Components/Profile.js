// Profile Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Box, Typography, TextField } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext';
import { formControlClasses } from '@mui/material';


// Profile Component 
function Profile() {

    const { user } = useUser();

    return(
        <div
            className='profile-container'
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '10rem',
                maxWidth: '35rem',
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
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        color: '#ab003c',
                    }}
                >
                    Email:
                </Typography>
                <Typography
                    variant='h4'
                    sx={{
                        color: '#fafafa',
                    }}
                >
                    {user.email}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        color: '#ab003c',
                    }}
                >
                    Balance:
                </Typography>
                <Typography
                    variant='h4'
                    sx={{
                        color: '#fafafa',
                    }}
                >
                    ${user.balance}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        color: '#ab003c',
                    }}
                >
                    Account Created:
                </Typography>
                <Typography
                    variant='h4'
                    sx={{
                        color: '#fafafa',
                    }}
                >
                    {new Date(user.created_at).toLocaleDateString()}
                </Typography>
            </Box>
        </div>
    )
}

export default Profile;