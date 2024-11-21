// Carousel Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, TextField, Typography } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// // Carousel Component 
function Carousel() {
    const [tanks, setTanks] = useState([]);

    useEffect(() => {
        const fetchTanks = async () => {
            try {
                const response = await apiClient.get('/tanks/all');
                const apiTanks = Object.values(response.data.data || {});
                setTanks(apiTanks);
                console.log(tanks);
            } catch {
                console.error('Error retrieving tanks!');
            }
        };
        fetchTanks();
    }, []);

    return (
        <div
            className='carousel-container'
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >   

            <Typography
                variant='h3'
                sx={{
                    marginBottom: '4rem',
                }}
            >
                Tank Inventory
            </Typography>
            <Box>
                {tanks && tanks.length > 0 ? (
                    tanks.map((tank, index) => (
                        <Card
                            key={index}
                            sx={{
                                alignItems: 'center',
                                backgroundColor: '#263238',
                                border: '.2rem solid #fafafa',
                                borderRadius: '1rem',
                                display: 'flex',
                                margin: '2rem',
                                maxWidth: '30rem',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                overflow: 'visible',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.08)',
                                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)',
                                },
                            }}
                        >
                            <CardMedia
                                component='img'
                                image={tank.images?.big_icon}
                                alt={tank.name}
                                sx={{
                                    flexShrink: 0,
                                    marginRight: '0.5rem',
                                    objectFit: 'cover',
                                    maxWidth: '10rem',
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#ab003c',
                                    }}
                                >
                                    {tank.name}
                                </Typography>   
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant='h4'>No Tanks Available</Typography>
                )}
            </Box>
        </div>
    );
}

export default Carousel;
