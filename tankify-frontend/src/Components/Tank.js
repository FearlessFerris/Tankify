// Tank Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Paper, Typography } from '@mui/material';


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

    const capitalizeFirst = ( word ) => {
        return word.split( ' ' ).map( word => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
    }

    const capitalizeNation = ( word ) => {
        if( word.length === 2 || word.length === 3 || word.length === 4 ){
            return word.toUpperCase()
        }
        else {
            return capitalizeFirst( word )
        }
    }

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
                        width: '70rem'
                    }}
                >
                    {tank && (
                        <>
                            <Card
                                sx = {{
                                    backgroundColor: '#2b2a2e',
                                    color: '#fafafa',
                                    height: '150rem',
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
                                        marginLeft: '5rem',
                                        width: '80rem',
                                    }}
                                />
                                <Box
                                    sx = {{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginLeft: '2rem',
                                        textAlign: 'start'
                                    }}
                                >   
                                    <Typography 
                                        variant = 'h4'
                                    >
                                    Tier:&nbsp; 
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        sx = {{
                                            color: '#ab003c'
                                        }}
                                    >
                                    { tank.tier}
                                    </Typography>
                                </Box>
                                <Box 
                                    sx = {{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginLeft: '2rem',
                                        textAlign: 'start'
                                    }}
                                >
                                    <Typography
                                        variant = 'h4'
                                    >
                                    Nation:&nbsp; 
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        sx = {{
                                            color: '#ab003c'
                                        }}
                                    >
                                    { capitalizeNation( tank.nation ) }
                                    </Typography>
                                </Box>
                                <Box 
                                    sx = {{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginLeft: '2rem',
                                        textAlign: 'start'
                                    }}
                                >
                                    <Typography 
                                        variant = 'h4'
                                    >
                                    Price:&nbsp; 
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        sx = {{
                                            color: '#ab003c'
                                        }}
                                    >
                                    {tank.price}
                                    </Typography>
                                </Box>
                                <Box 
                                    sx = {{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginLeft: '2rem',
                                        marginRight: '2rem',
                                        textAlign: 'start'
                                    }}
                                >
                                    <Typography
                                        variant = 'h4'
                                    >
                                    Description:&nbsp; 
                                    </Typography>
                                    <Typography
                                        variant = 'h4'
                                        sx = {{
                                            color: '#ab003c',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '45rem',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                    { tank.description } 
                                    </Typography>
                                    <Button
                                        variant = 'outlined'
                                        size = 'large'
                                        sx = {{
                                            color: '#fafafa',
                                            border: '.2rem solid #ab003c',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
                                        }}
                                    > 
                                    Show More 
                                    </Button>
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