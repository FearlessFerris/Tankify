// Carousel Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, TextField, Typography } from '@mui/material'; 


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Carousel Component 
function Carousel() {

    const [ tanks, setTanks ] = useState([]);

    useEffect(() => {
       const fetchTanks = async () => {
        try{
            const response = await apiClient.get( '/tanks/all' );
            console.log( response );
            console.log( response.data.tanks );
            setTanks( response.data.tanks );
        }
        catch{
            console.error( 'Error retrieving tanks!' );
        }
       };
       fetchTanks();
    }, []);

    return(
        <div
            className = 'carousel-container'
            style = {{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <h1

            > Tank Inventory </h1>

            <Box > 
                { tanks && tanks.length > 0 ? (
                    tanks.map(( tank ) => ( 
                        <Card
                            key = { tank.id }
                            sx = {{ 
                                alignItems: 'center',
                                border: '.2rem solid #ab003c',
                                borderRadius: '1rem',
                                display: 'flex',
                                margin: '2rem',
                                maxWidth: '55rem'
                            }}
                        >
                            <CardMedia 
                                component = 'img'
                                image = { tank.image_url }
                                alt = { tank.name }
                                sx = {{
                                    flexShrink: 0,
                                    marginRight: '0.5rem',
                                    objectFit: 'cover',
                                    width: '18rem',
                                }}
                            />
                            <CardContent>

                            <Typography 
                                variant = 'h5'
                                sx = {{
                                    fontWeight: 'bold',
                                    color: '#004d40'
                                }}    
                            >
                            <span style = {{ fontWeight: 'bold', color: '#ab003c' }}> Tank Name: </span> { tank.name }
                            </Typography>
                            <Typography 
                                variant = 'h6'
                                sx = {{
                                    fontWeight: 'bold',
                                    color: '#004d40'
                                }}
                            >
                            <span style = {{ fontWeight: 'bold', color: '#ab003c' }}> Description: </span> { tank.description }
                            </Typography>
                            <Typography 
                                variant = 'h6'
                                sx = {{
                                    fontWeight: 'bold',
                                    color: '#004d40'
                                }}
                            >
                            <span style = {{ fontWeight: 'bold', color: '#ab003c' }}> Price: </span> { tank.price }
                            </Typography>
                            <Typography 
                                variant = 'h6'
                                sx = {{
                                    fontWeight: 'bold',
                                    color: '#004d40'
                                }}
                            >
                            Rating: { tank.rating }
                            </Typography>
                            </CardContent>
                        </Card>
                    ))
                ):(
                    <Typography 
                        variant = 'h4'
                    >
                    No Tanks Available 
                    </Typography>
                )}
            </Box>
        </div>
    )
}

export default Carousel;