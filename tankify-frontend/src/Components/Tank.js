// Tank Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Paper, Typography } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Tank Component 
function Tank() {

    const { tank_id } = useParams();
    console.log(`Tank ID: ${tank_id}`)
    const [tank, setTank] = useState(null);

    useEffect(() => {
        const fetchTankData = async () => {
            try {
                const response = await apiClient.get(`/tanks/${tank_id}`)
                console.log(`Response: `, response.data.data);
                setTank(response.data.data);
            }
            catch {
                console.error('Error fetching tank information!');
            }
        }
        fetchTankData();
    }, [tank_id]);

    return (
        <div
            className='tank-container'
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: '8rem',
                    marginBottom: '8rem'
                }}
            >
                <Paper
                    elevation={3}
                    style={{
                        backgroundColor: '#2b2a2e',
                        border: '.1rem solid #0f0e0e',
                        color: '#fafafa',
                        textAlign: 'center',
                        width: '80rem'
                    }}
                >
                    {tank && (
                        <>
                            <Card
                                sx = {{
                                    backgroundColor: '#2b2a2e',
                                    color: '#fafafa',
                                    height: '100rem',
                                    textAlign: 'center'
                                }}
                            >
                                <Typography
                                    variant='h1'
                                    sx = {{
                                        color: '#ab003c'
                                    }}
                                >
                                    {tank.name}
                                </Typography>
                                <CardMedia
                                    component='img'
                                    image={tank.hd_image}
                                    alt={`${tank.name}`}
                                    sx={{
                                        flexShrink: 0,
                                        height: '30rem',
                                        marginLeft: '10rem',
                                        width: '80rem',
                                    }}
                                />
                                <Box
                                    sx = {{
                                        textAlign: 'start'
                                    }}
                                >   
                                <Typography 
                                    variant = 'h3'
                                    sx = {{
                                        
                                    }}
                                >
                                Tier: 
                                </Typography>
                                    <Typography
                                        variant='h3'
                                        >
                                        {tank.tier}
                                    </Typography>
                                    <Typography
                                        variant='h3'
                                        >
                                        {tank.nation}
                                    </Typography>
                                    <Typography
                                        variant='h3'
                                        >
                                        {tank.price}
                                    </Typography>
                                </Box>
                            </Card>
                        </>
                    )}
                </Paper>
            </Box>
        </div>
    )
}

export default Tank;