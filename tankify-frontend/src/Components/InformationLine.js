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
                                offset: [4, 0],
                            },
                        },
                    ],
                },
            }}
        >
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'start',
                marginLeft: '1rem'
            }}
        >
            <Typography
                variant='h6'
                sx={{

                }}
            >
                {label}
            </Typography>
                <Typography
                    variant='h6'
                    sx={{
                        color: '#ab003c',
                        marginLeft: '.5rem'
                    }}
                >
                    {value}{unit}
                </Typography>
        </Box>
            </Tooltip>
    )
}

export default InformationLine;