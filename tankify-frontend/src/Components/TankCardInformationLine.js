// TankCardInformationLine Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';


// Components & Necessary Files 


// Context Providers 


// TankCardInformationLine Component 
function TankCardInformationLine ({ IconComponent, label, value, description = false }) { 

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: description ? 'column' : 'row',
                justifyContent: description ? 'center' : 'space-between',
                marginY: description ? '1rem' : '0.2rem',
                textAlign: description ? 'center' : 'left',
                width: '100%'
            }}
        >
            {description ? (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.5rem'
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#fafafa',
                                fontWeight: 'bold',
                                marginRight: '.3rem'
                            }}
                        >
                            {label}
                        </Typography>
                        {IconComponent && (
                            <IconComponent
                                fontSize="1rem"
                                style={{
                                    color: '#4b4848',
                                    transition: 'color 0.3s ease'
                                }}
                            />
                        )}
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#ab003c',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-line'
                        }}
                    >
                        {value}
                    </Typography>
                </>
            ) : (
                <>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#fafafa'
                        }}
                    >
                        {label}
                    </Typography>
                    <Box
                        sx={{
                            alignItems: 'center',
                            color: '#ab003c',
                            display: 'flex',
                            fontWeight: 'bold',
                            textAlign: 'right'
                        }}
                    >
                        {IconComponent && (
                            <IconComponent
                                fontSize="1rem"
                                style={{
                                    color: '#4b4848',
                                    marginRight: '.3rem',
                                    position: 'relative',
                                    top: '.1rem'
                                }}
                            />
                        )}
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#ab003c',
                                fontWeight: 'bold'
                            }}
                        >
                            {value}
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default TankCardInformationLine; 