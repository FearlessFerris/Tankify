// TankCardInformationLine Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Box, Typography } from 'material/ui';


// Components & Necessary Files 


// Context Providers 


// TankCardInformationLine Component 
function TankCardInformationLine ({ IconComponent, label, value }) { 


    return( 
        <Box
            sx = {{ 
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Typography
                variant = 'body1'
                sx = {{ 
                    color: '#fafafa',
                    marginLeft: '.5rem',
                    textAlign: 'center'
                }}
            > 
                { label }
            </Typography>
            <Typography
                variant = 'body1'
                sx = {{ 
                    color: '#ab003c',
                    fontWeight: 'bold',
                    marginRight: '.5rem'
                }}
            > 
            { IconComponent && ( 
                <IconComponent 
                    fontSize = '1rem'
                    style = {{ 
                        color: '#4b4848',
                        marginRight: '.2rem',
                        position: 'relative',
                        top: '.2rem',
                        transition: 'color 0.3s ease'
                    }}
                />
            )}
            { value }
            </Typography>
        </Box>
    )
}

export default TankCardInformationLine; 