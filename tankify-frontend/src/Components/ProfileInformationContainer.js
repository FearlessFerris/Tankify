// Profile Information Container Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';


// Components & Necessary Files 


// Profile Information Container 
function ProfileInformationContainer({ label, value, tooltip }) {

    // Information Line Render 
    const renderInformationLine = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: '#ab003c',
                    }}
                >
                    { label }:
                </Typography>
                <Tooltip
                    arrow
                    title= { tooltip }
                    placement='left-start'
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [2, -2],
                                    },
                                },
                            ],
                        }
                    }
                    }
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#fafafa',
                        }}
                    >
                        { value }
                    </Typography>
                </Tooltip>
            </Box>
        )
    }

    // Profile Information Container Render 
    return (
        <>
            { renderInformationLine() }
        </>
    )

}

export default ProfileInformationContainer; 