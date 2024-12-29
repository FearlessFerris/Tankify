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
    const [hoveredTooltip, setHoveredTooltip] = useState(null);

    const handleTooltipToggle = (key, isOpen) => {
        setHoveredTooltip(isOpen ? key : null);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#0c1418',
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
                        color="#fafafa"
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
                    <Tooltip
                        title="Home"
                        arrow
                        open={hoveredTooltip === 'home'}
                        onOpen={() => handleTooltipToggle('home', true)}
                        onClose={() => handleTooltipToggle('home', false)}
                    >
                        <Button
                            component={Link}
                            to="/"
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
                            Home
                        </Button>
                    </Tooltip>
                    <Tooltip
                        title="Shop"
                        arrow
                        open={hoveredTooltip === 'shop'}
                        onOpen={() => handleTooltipToggle('shop', true)}
                        onClose={() => handleTooltipToggle('shop', false)}
                    >
                        <Button
                            component={Link}
                            to="/shop"
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
                            Shop
                        </Button>
                    </Tooltip>
                    {user ? (
                        <>
                            <Tooltip
                                title="Profile"
                                arrow
                                open={hoveredTooltip === 'profile'}
                                onOpen={() => handleTooltipToggle('profile', true)}
                                onClose={() => handleTooltipToggle('profile', false)}
                            >
                                <Button
                                    component={Link}
                                    to="/user/profile"
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
                                    Profile
                                </Button>
                            </Tooltip>
                            <Tooltip
                                title="Logout"
                                arrow
                                open={hoveredTooltip === 'logout'}
                                onOpen={() => handleTooltipToggle('logout', true)}
                                onClose={() => handleTooltipToggle('logout', false)}
                            >
                                <Button
                                    variant="filled"
                                    size="large"
                                    onClick={() => logout()}
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
                                    Logout
                                </Button>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip
                                title="Create"
                                arrow
                                open={hoveredTooltip === 'create'}
                                onOpen={() => handleTooltipToggle('create', true)}
                                onClose={() => handleTooltipToggle('create', false)}
                            >
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
                            </Tooltip>
                            <Tooltip
                                title="Login"
                                arrow
                                open={hoveredTooltip === 'login'}
                                onOpen={() => handleTooltipToggle('login', true)}
                                onClose={() => handleTooltipToggle('login', false)}
                            >
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
                            </Tooltip>
                        </>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MenuSearch />
                    {user && (
                        <Tooltip
                            title="User Profile"
                            arrow
                            open={hoveredTooltip === 'avatar'}
                            onOpen={() => handleTooltipToggle('avatar', true)}
                            onClose={() => handleTooltipToggle('avatar', false)}
                        >
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
                        </Tooltip>
                    )}
                </Box>
            </Box>
        </AppBar>
    );
}

export default Navbar;