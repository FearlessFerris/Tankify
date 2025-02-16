// Navbar Component Implementation 


// Dependencies 
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Box, Container, Button, TextField, Tooltip, Typography } from '@mui/material';


// Necessary Files & Components 
import tankIcon from '../Static/Tank.png';
import MenuSearch from './MenuSearch';


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext';


// // Navbar Component 
function Navbar() {

    const { user, logout } = useUser();

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#161616',
                padding: '0 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={tankIcon}
                        alt="Tank Icon"
                        style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            marginRight: '0.5rem',
                        }}
                    />
                    <Typography
                        variant="h3"
                        color="#ab003c"
                        sx={{
                            marginRight: '11rem',
                        }}
                    >
                        Tankify
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                        flexGrow: 1,
                    }}
                >
                    <Button
                        component={Link}
                        to="/"
                        variant="outined"
                        size="large"
                        sx={{
                            color: '#ab003c',
                            backgroundColor: '#161616',
                            borderColor: '#ab003c',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                            fontSize: '1rem',
                            width: '8rem',
                            '&:hover': {
                                backgroundColor: '#ab003c',
                                color: '#fafafa'
                            },
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        component={Link}
                        to="/shop"
                        variant="outined"
                        size="large"
                        sx={{
                            color: '#ab003c',
                            backgroundColor: '#161616',
                            borderColor: '#ab003c',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                            fontSize: '1rem',
                            width: '8rem',
                            '&:hover': {
                                backgroundColor: '#ab003c',
                                color: '#fafafa'
                            },
                        }}
                    >
                        Shop
                    </Button>
                    {user ? (
                        <>
                            <Button
                                component={Link}
                                to="/user/profile"
                                variant="outined"
                                size="large"
                                sx={{
                                    color: '#ab003c',
                                    backgroundColor: '#161616',
                                    borderColor: '#ab003c',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                    fontSize: '1rem',
                                    width: '8rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#fafafa'
                                    },
                                }}
                            >
                                Profile
                            </Button>
                            <Button
                                onClick={() => logout()}
                                variant="outined"
                                size="large"
                                sx={{
                                    color: '#ab003c',
                                    backgroundColor: '#161616',
                                    borderColor: '#ab003c',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                    fontSize: '1rem',
                                    width: '8rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#fafafa'
                                    },
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                component={Link}
                                to="/user/create"
                                variant="filled"
                                size="large"
                                sx={{
                                    color: '#fafafa',
                                    backgroundColor: '#161616',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                    width: '8rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                    },
                                }}
                            >
                                Create
                            </Button>
                            <Button
                                component={Link}
                                to="/user/login"
                                variant="filled"
                                size="large"
                                sx={{
                                    color: '#fafafa',
                                    backgroundColor: '#161616',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                    width: '8rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MenuSearch />
                    {user && (
                        <Link
                            to='/user/profile'
                            style={{
                                textDecoration: 'none'
                            }}
                        >

                            <Avatar
                                src={user.image}
                                alt="User profile"
                                sx={{
                                    border: '.1rem solid #ab003c',
                                    marginLeft: '1rem',
                                    width: '3rem',
                                    height: '3rem',
                                }}
                            />
                        </Link>
                    )}
                </Box>
            </Box>
        </AppBar>
    );
}

export default Navbar;