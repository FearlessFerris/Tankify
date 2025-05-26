// TankCard Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Collapse, Typography } from '@mui/material';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { MdNumbers } from 'react-icons/md';
import { FaRegKeyboard } from 'react-icons/fa6';
import { FaFlag } from 'react-icons/fa';
import { GiAbdominalArmor } from 'react-icons/gi';
import { GrMoney } from 'react-icons/gr';


// Components & Necessary Files 
import TankCardInformationLine from './TankCardInformationLine';
import TorchImageWithSparks from './TorchImageWithSparks';

// Context Providers 


// TankCard Component 
function TankCardV2({ tank, navigate }) { 

    // State Variables 
    const [ viewState, setViewState ] = useState({ 
        hovered: false, 
        expanded: false,
    });


    // API Helper Functions 


    // Initial Data Fetching 


    // Handle Toggle Hovered 
    const handleToggleHoveredState = () => { 
        setViewState(( previous ) => ({ 
            ...previous,
            hovered: !previous
        }));
    }

    // Handle Toggle Expanded State
    const handleToggleExpandedState = () => { 
        setViewState(( previous ) => ({ 
            ...previous,
            expanded: !previous.expanded,
        }));
    };

    // Handle Currency Fix 
    const handleCurrencyFix = ( price ) => Number( price ).toLocaleString();


    // TankCard Component Render 
    return( 
        <Card
            sx = {{
                backgroundColor: '#0d0d0d',
                borderRadius: '.5rem',
                cursor: 'pointer',
                position: 'relative',
                transition: 'height 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { 
                    boxShadow: '0px 8px 20px rgba( 0, 0, 0, 0.4 )'
                }
            }}
        >
            <TankCardInformationLine
                IconComponent = { GrMoney }
                label = 'Price'
                value = { tank.price }
            /> 
            <TankCardInformationLine 
                IconComponent = { }
            /> 
        </Card>
    )
}