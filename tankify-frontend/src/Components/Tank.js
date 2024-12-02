// Tank Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Tank Component 
function Tank(){

    const { tank_id } = useParams();
    console.log( `Tank ID: ${ tank_id }`)
    const [ tank, setTank ] = useState( null );

    useEffect(() => {
        const fetchTankData = async () => {
        try{
            const response = await apiClient.get( `/tanks/${ tank_id }` )
            console.log( response.data );
            setTank( response.data.tank );
        }
        catch{ 
            console.error( 'Error fetching tank information!' );
        }
    }
        fetchTankData();
    }, [ tank_id ] );

    return(
        <div    
            className = 'tank-container'
        >   

        <Typography
            variant = 'h3'
        >
            Tank Component 
        </Typography>    
        </div>
    )
}

export default Tank;