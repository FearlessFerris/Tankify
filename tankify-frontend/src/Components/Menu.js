// Menu Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { AppBar, Container, Button, Typography } from '@mui/material';


// Necessary Files & Components 


// Menu Component 
function Menu(){


    return(
        <AppBar 
            position = 'fixed'
            sx = {{
                backgroundColor: '#263238',
            }}            
        >   
            <Container 
                maxWidth = 'xl'
                sx = {{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                    <Typography
                        variant = 'h3'
                        color = '#eceff1'
                        sx = {{
                            flexGrow: 1
                        }}
                    >
                        Tankify
                    </Typography>

                    <div 
                        className = 'button-container'
                        style = {{
                            display: 'flex',
                            margin: '.5rem'
                        }}
                    >

                    <Button 
                        variant = 'outlined'
                        size = 'large'
                        sx = {{
                            color: '#eceff1',
                            borderColor: '#eceff1',
                            marginLeft: 'auto'
                        }}
                    >
                    Home 
                    </Button>
                    </div>
                    
                    <div 
                        className = 'button-container'
                        style = {{
                            display: 'flex',
                            margin: '.5rem'
                        }}
                    >

                    <Button 
                        variant = 'outlined'
                        size = 'large'
                        sx = {{
                            color: '#eceff1',
                            borderColor: '#eceff1',
                            marginLeft: 'auto'
                        }}
                    >
                    Shop 
                    </Button>
                    </div>

                    <div 
                        className = 'button-container'
                        style = {{
                            display: 'flex',
                            margin: '.5rem'
                        }}
                    >

                    <Button 
                        variant = 'outlined'
                        size = 'large'
                        sx = {{
                            color: '#eceff1',
                            borderColor: '#eceff1',
                            marginLeft: 'auto'
                        }}
                    >
                    Create 
                    </Button>
                    </div>

                    <div 
                        className = 'button-container'
                        style = {{
                            display: 'flex',
                            margin: '.5rem'
                        }}
                    >

                    <Button 
                        variant = 'outlined'
                        size = 'large'
                        sx = {{
                            color: '#eceff1',
                            borderColor: '#eceff1',
                            marginLeft: 'auto'
                        }}
                    >
                    Login 
                    </Button>
                    </div>
            </Container> 
        </AppBar>
    )
}

export default Menu;