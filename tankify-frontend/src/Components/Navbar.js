// Navbar Component Implementation 


// Dependencies 
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Container, Button, TextField, Tooltip, Typography } from '@mui/material';


// Necessary Files & Components 
import tankIcon from '../Static/Tank.png';
import MenuSearch from './MenuSearch';


// Navbar Component 
function Navbar() {

    const [openTooltip, setOpenTooltip] = useState({
        home: false,
        shop: false,
        deals: false,
        create: false,
        login: false,
    });

    const timeoutRefs = useRef({
        home: null,
        shop: null,
        deals: null,
        create: null,
        login: null,
    });

    const handleTooltipOpen = ( key ) => {
        if (timeoutRefs.current[key]) {
            clearTimeout(timeoutRefs.current[key]);
        }
        timeoutRefs.current[key] = setTimeout(() => {
            setOpenTooltip((prev) => ({ ...prev, [key]: true }));
        }, 1000 ); 
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
                backgroundColor: '#263238',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0 1rem',
                    boxSizing: 'border-box',
                    flexWrap: 'wrap',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
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
                        color="#eceff1"
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
                        justifyContent: 'center',
                        flexGrow: 1,
                        maxWidth: '50%',
                    }}
                >
                    <Tooltip
                        title="Home"
                        arrow
                        open={openTooltip.home}
                        onOpen={() => handleTooltipOpen('home')}
                        onClose={() => handleTooltipClose('home')}
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -14],
                                        },
                                    },
                                ],
                            },
                        }}
                    >
                        <Button
                            component = { Link }
                            to = '/'
                            variant="outlined"
                            size="large"
                            onMouseEnter={() => handleTooltipOpen('home')}
                            onMouseLeave={() => handleTooltipClose('home')}
                            sx={{
                                color: '#eceff1',
                                border: '.2rem solid #004d40',
                                fontSize: '1.2rem',
                                margin: '0 .5rem',
                                minWidth: '8rem',
                                padding: '.2rem 1.5rem',
                            }}
                        >
                            Home
                        </Button>
                    </Tooltip>

                    <Tooltip
                        title="Shop"
                        arrow
                        open={openTooltip.shop}
                        onOpen={() => handleTooltipOpen('shop')}
                        onClose={() => handleTooltipClose('shop')}
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -14],
                                        },
                                    },
                                ],
                            },
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="large"
                            onMouseEnter={() => handleTooltipOpen('shop')}
                            onMouseLeave={() => handleTooltipClose('shop')}
                            sx={{
                                color: '#eceff1',
                                border: '.2rem solid #004d40',
                                fontSize: '1.2rem',
                                margin: '0 .5rem',
                                minWidth: '8rem',
                                padding: '.2rem 1.5rem',
                            }}
                        >
                            Shop
                        </Button>
                    </Tooltip>

                    <Tooltip
                        title="Deals"
                        arrow
                        open={openTooltip.deals}
                        onOpen={() => handleTooltipOpen('deals')}
                        onClose={() => handleTooltipClose('deals')}
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -14],
                                        },
                                    },
                                ],
                            },
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="large"
                            onMouseEnter={() => handleTooltipOpen('deals')}
                            onMouseLeave={() => handleTooltipClose('deals')}
                            sx={{
                                color: '#eceff1',
                                border: '.2rem solid #004d40',
                                fontSize: '1.2rem',
                                margin: '0 .5rem',
                                minWidth: '8rem',
                                padding: '.2rem 1.5rem',
                            }}
                        >
                            Deals
                        </Button>
                    </Tooltip>

                    <Tooltip
                        title="Create"
                        arrow
                        open={openTooltip.create}
                        onOpen={() => handleTooltipOpen('create')}
                        onClose={() => handleTooltipClose('create')}
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -14],
                                        },
                                    },
                                ],
                            },
                        }}
                    >
                        <Button
                            component = { Link }
                            to = '/user/create'
                            variant="outlined"
                            size="large"
                            onMouseEnter={() => handleTooltipOpen('create')}
                            onMouseLeave={() => handleTooltipClose('create')}
                            sx={{
                                color: '#eceff1',
                                border: '.2rem solid #004d40',
                                fontSize: '1.2rem',
                                margin: '0 .5rem',
                                minWidth: '8rem',
                                padding: '.2rem 1.5rem',
                            }}
                        >
                            Create
                        </Button>
                    </Tooltip>

                    <Tooltip
                        title="Login"
                        arrow
                        open={openTooltip.login}
                        onOpen={() => handleTooltipOpen('login')}
                        onClose={() => handleTooltipClose('login')}
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -14],
                                        },
                                    },
                                ],
                            },
                        }}
                    >
                        <Button
                            component = { Link }
                            to = '/user/login'
                            variant="outlined"
                            size="large"
                            onMouseEnter={() => handleTooltipOpen('login')}
                            onMouseLeave={() => handleTooltipClose('login')}
                            sx={{
                                color: '#eceff1',
                                border: '.2rem solid #004d40',
                                fontSize: '1.2rem',
                                margin: '0 .5rem',
                                minWidth: '8rem',
                                padding: '.2rem 1.5rem',
                            }}
                        >
                            Login
                        </Button>
                    </Tooltip>
                </Box>

                <MenuSearch />
            </Box>
        </AppBar>
    );
}

export default Navbar;