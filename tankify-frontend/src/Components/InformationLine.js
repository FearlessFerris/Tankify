// InformationLine Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Box, Button, CardMedia, Collapse, Paper, Tooltip, Typography } from '@mui/material';


// Components & Necessary Files 


// InformationLine Component 
function InformationLine({ label, value, tooltip, unit = null }) {



    return (
        <Tooltip
    arrow
    title={tooltip}
    placement="left-start"
    slotProps={{
        popper: {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [8, 0],
                    },
                },
            ],
        },
    }}
>
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            backgroundColor: '#161616',
            padding: '.5rem',
            borderRadius: '.5rem',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            minWidth: '8rem',
            textAlign: 'start',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#ab003c',
            },
            '&:hover .label': {
                color: '#161616',
            },
            '&:hover .value': {
                color: '#fafafa',
            },
        }}
    >
        <Typography
            variant='h6'
            className="label"
            sx={{
                transition: 'color 0.2s ease',
                color: '#fafafa'
            }}
        >
            {label}
        </Typography>
        <Typography
            variant='h6'
            className="value"
            sx={{
                transition: 'color 0.2s ease',
                color: '#ab003c', 
                marginLeft: '.5rem',
            }}
        >
            {value}{unit}
        </Typography>
    </Box>
</Tooltip>

    )
}

export default InformationLine;