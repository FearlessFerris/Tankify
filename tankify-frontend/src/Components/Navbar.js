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
    const [openTooltip, setOpenTooltip] = useState({
        avatar: false,
        home: false,
        shop: false,
        create: false,
        login: false,
        logout: false,
        profile: false,
    });

    const timeoutRefs = useRef({
        avatar: null,
        home: null,
        shop: null,
        create: null,
        login: null,
        logout: null,
        profile: null,
    });

    const handleTooltipOpen = (key) => {
        if (timeoutRefs.current[key]) {
            clearTimeout(timeoutRefs.current[key]);
        }
        timeoutRefs.current[key] = setTimeout(() => {
            setOpenTooltip((prev) => ({ ...prev, [key]: true }));
        }, 500);
    };

    const handleTooltipClose = (key) => {
        if (timeoutRefs.current[key]) {
            clearTimeout(timeoutRefs.current[key]);
            timeoutRefs.current[key] = null;
        }
        setOpenTooltip((prev) => ({ ...prev, [key]: false }));
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#0c1418',
                overflow: 'hidden',
                padding: '0 2rem',
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
                            marginRight: '1rem',
                        }}
                    >
                        Tankify
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start', 
                        alignItems: 'center',
                        flexGrow: 1,
                        ml: '30%', 
                        gap: '1rem',
                    }}
                >
                    <Tooltip
                        title="Home"
                        arrow
                        open={Boolean(openTooltip.home)}
                        onMouseEnter={() => handleTooltipOpen('home')}
                        onMouseLeave={() => handleTooltipClose('home')}
                    >
                        <Button
                            component={Link}
                            to="/"
                            variant="filled"
                            size="large"
                            onMouseEnter={() => handleTooltipOpen('home')}
                            onMouseLeave={() => handleTooltipClose('home')}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#fafafa',
                                backgroundColor: '#161616',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                fontStyle: 'bold',
                                fontSize: '1rem',
                                width: '8rem',
                                '&:hover': {
                                    backgroundColor: '#ab003c',
                                    color: '#fafafa',
                                },
                            }}
                        >
                            Home
                        </Button>
                    </Tooltip>

                    <Tooltip
                        title="Shop"
                        arrow
                        open={Boolean(openTooltip.shop)}
                        onMouseEnter={() => handleTooltipOpen('shop')}
                        onMouseLeave={() => handleTooltipClose('shop')}
                    >
                        <Button
                            component={Link}
                            to="/shop"
                            variant="filled"
                            size="large"
                            onMouseEnter={() => handleTooltipOpen('shop')}
                            onMouseLeave={() => handleTooltipClose('shop')}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#fafafa',
                                backgroundColor: '#161616',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                fontStyle: 'bold',
                                fontSize: '1rem',
                                width: '8rem',
                                '&:hover': {
                                    backgroundColor: '#ab003c',
                                    color: '#fafafa',
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
                                open={Boolean(openTooltip.profile)}
                                onMouseEnter={() => handleTooltipOpen('profile')}
                                onMouseLeave={() => handleTooltipClose('profile')}
                            >
                                <Button
                                    component={Link}
                                    to="/user/profile"
                                    variant="filled"
                                    size="large"
                                    onMouseEnter={() => handleTooltipOpen('profile')}
                                    onMouseLeave={() => handleTooltipClose('profile')}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#fafafa',
                                        backgroundColor: '#161616',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                        fontStyle: 'bold',
                                        fontSize: '1rem',
                                        width: '8rem',
                                        '&:hover': {
                                            backgroundColor: '#ab003c',
                                            color: '#fafafa',
                                        },
                                    }}
                                >
                                    Profile
                                </Button>
                            </Tooltip>
                            <Tooltip
                                title="Logout"
                                arrow
                                open={Boolean(openTooltip.logout)}
                                onMouseEnter={() => handleTooltipOpen('logout')}
                                onMouseLeave={() => handleTooltipClose('logout')}
                            >
                                <Button
                                    variant="filled"
                                    size="large"
                                    onClick={() => logout()}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#fafafa',
                                        backgroundColor: '#161616',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                        fontStyle: 'bold',
                                        fontSize: '1rem',
                                        width: '8rem',
                                        '&:hover': {
                                            backgroundColor: '#ab003c',
                                            color: '#fafafa',
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
                                open={Boolean(openTooltip.create)}
                                onMouseEnter={() => handleTooltipOpen('create')}
                                onMouseLeave={() => handleTooltipClose('create')}
                            >
                                <Button
                                    component={Link}
                                    to="/user/create"
                                    variant="filled"
                                    size="large"
                                    onMouseEnter={() => handleTooltipOpen('create')}
                                    onMouseLeave={() => handleTooltipClose('create')}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#fafafa',
                                        backgroundColor: '#161616',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                        fontStyle: 'bold',
                                        fontSize: '1rem',
                                        width: '8rem',
                                        '&:hover': {
                                            backgroundColor: '#ab003c',
                                            color: '#fafafa',
                                        },
                                    }}
                                >
                                    Create
                                </Button>
                            </Tooltip>

                            <Tooltip
                                title="Login"
                                arrow
                                open={Boolean(openTooltip.login)}
                                onMouseEnter={() => handleTooltipOpen('login')}
                                onMouseLeave={() => handleTooltipClose('login')}
                            >
                                <Button
                                    component={Link}
                                    to="/user/login"
                                    variant="filled"
                                    size="large"
                                    onMouseEnter={() => handleTooltipOpen('login')}
                                    onMouseLeave={() => handleTooltipClose('login')}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#fafafa',
                                        backgroundColor: '#161616',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                        fontStyle: 'bold',
                                        fontSize: '1rem',
                                        width: '8rem',
                                        '&:hover': {
                                            backgroundColor: '#ab003c',
                                            color: '#fafafa',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </Tooltip>
                        </>
                    )}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <MenuSearch />
                    {user && (
                        <Tooltip
                            title="User Profile"
                            arrow
                            open={Boolean(openTooltip.avatar)}
                            onMouseEnter={() => handleTooltipOpen('avatar')}
                            onMouseLeave={() => handleTooltipClose('avatar')}
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
                        </Tooltip>
                    )}
                </Box>
            </Box>
        </AppBar>
    );
}

export default Navbar;
