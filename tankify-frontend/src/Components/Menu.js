// Menu Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { AppBar, Box, Container, Button, TextField, Typography } from '@mui/material';


// Necessary Files & Components 
import tankIcon from '../Static/Tank.png';
import MenuSearch from './MenuSearch';


// Menu Component 
function Menu() {

    

    return (
        <AppBar
            position='fixed'
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
                        variant='h3'
                        color='#eceff1'
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
                    <Button
                        variant='outlined'
                        size='large'
                        sx={{
                            color: '#eceff1',
                            border: '.2rem solid #004d40',
                            fontSize: '1.2rem',
                            margin: '0 .5rem',
                            minWidth: '8rem',
                            padding: '.2rem 1.5rem'
                        }}
                    >
                        Home
                    </Button>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={{
                            color: '#eceff1',
                            border: '.2rem solid #004d40',
                            fontSize: '1.2rem',
                            margin: '0 .5rem',
                            minWidth: '8rem',
                            padding: '.2rem 1.5rem'
                        }}
                    >
                        Shop
                    </Button>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={{
                            color: '#eceff1',
                            border: '.2rem solid #004d40',
                            fontSize: '1.2rem',
                            margin: '0 .5rem',
                            minWidth: '8rem',
                            padding: '.2rem 1.5rem'
                        }}
                    >
                        Deals
                    </Button>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={{
                            color: '#eceff1',
                            border: '.2rem solid #004d40',
                            fontSize: '1.2rem',
                            margin: '0 .5rem',
                            minWidth: '8rem',
                            padding: '.2rem 1.5rem'
                        }}
                    >
                        Create
                    </Button>

                    <Button
                        variant='outlined'
                        size='large'
                        sx={{
                            color: '#eceff1',
                            border: '.2rem solid #004d40',
                            fontSize: '1.2rem',
                            margin: '0 .5rem',
                            minWidth: '8rem',
                            padding: '.2rem 1.5rem'
                        }}
                    >
                        Login
                    </Button>
                </Box>

                <MenuSearch /> 
            </Box>
        </AppBar>
    );
}

export default Menu;