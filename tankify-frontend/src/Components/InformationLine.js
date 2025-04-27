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
            alignItems: 'center',
            backgroundColor: '#161616',
            border: '2px solid transparent',
            borderRadius: '.5rem',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            minWidth: '4rem',
            paddingLeft: '.5rem',
            paddingRight: '.5rem',
            textAlign: 'start',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            '&:hover': {
                backgroundColor: 'transparent',
                borderColor: '#ab003c',
                boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
            },
            '&:hover .label': {
                color: '#fafafa',
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