// TankCard Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Collapse, Typography } from '@mui/material';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { MdNumbers } from 'react-icons/md';
import { FaRegKeyboard } from 'react-icons/fa6';
import { FaFlag } from 'react-icons/fa';
import { GiAbdominalArmor } from 'react-icons/gi';
import { GiBattleTank } from "react-icons/gi";
import { GrMoney } from 'react-icons/gr';


// Components & Necessary Files 
import TankCardInformationLine from './TankCardInformationLine';
import TorchImageWithSparks from './TorchImageWithSparks';


// Context Providers 


// TankCard Component 
function TankCardV2({ tank, navigate }) {

    const fallbackTankImage = '/fallback-tank-silhouette.png';

    // State Variables 
    const [imageError, setImageError] = useState(false);
    const [viewState, setViewState] = useState({
        hovered: false,
        expanded: false,
    });

    // API Helper Functions 


    // Initial Data Fetching 


    // Handle Toggle Hovered 
    const handleToggleHoveredState = () => {
        setViewState((previous) => ({
            ...previous,
            hovered: !previous
        }));
    }

    // Handle Toggle Expanded State
    const handleToggleExpandedState = (event) => {
        event.stopPropagation();
        setViewState((previous) => ({
            ...previous,
            expanded: !previous.expanded,
        }));
    };

    // Handle Currency Fix 
    const handleCurrencyFix = (price) => Number(price).toLocaleString();


    // TankCard Component Render 
    return (
        <Card
            onClick={() => navigate(`/tank/${tank.id}`)}
            sx={{
                backgroundColor: '#0d0d0d',
                borderRadius: '.5rem',
                cursor: 'pointer',
                position: 'relative',
                transition: 'height 0.3s ease, box-shadow 0.3s ease',
                width: '20rem',
                '&:hover': {
                    boxShadow: '0px 8px 20px rgba( 0, 0, 0, 0.4 )'
                }
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '10rem',
                    marginBottom: '0.2rem',
                }}
            >
                <TorchImageWithSparks
                    src={tank.nation_flag_hd}
                    height='10rem'
                    containerStyle={{ width: '100%' }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '60%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        height: 'auto',
                        zIndex: 2,
                        pointerEvents: 'none',
                    }}
                >
                    <Box
                        component="img"
                        src={imageError ? fallbackTankImage : tank.image}
                        alt={tank.name}
                        onError={(e) => {
                            if (!imageError) {
                                e.target.src = fallbackTankImage;
                                setImageError(true);
                            }
                        }}
                        sx={{
                            width: '100%',
                            objectFit: 'contain',
                            display: 'block',
                        }}
                    />
                </Box>

            </Box>
            <CardContent
                sx={{
                    paddingX: '0.75rem',
                }}
            >
                <TankCardInformationLine
                    IconComponent={GiBattleTank}
                    label='Name:'
                    value={tank.name}
                />
                <TankCardInformationLine
                    IconComponent={GrMoney}
                    label='Price:'
                    value={handleCurrencyFix(tank.price)}
                />
                <TankCardInformationLine
                    IconComponent={MdNumbers}
                    label='Tier:'
                    value={tank.tier}
                />
                <TankCardInformationLine
                    IconComponent={FaFlag}
                    label='Nation:'
                    value={tank.nation}
                />
                {viewState.expanded && (
                    <>
                        <TankCardInformationLine
                            IconComponent={MdOutlineHealthAndSafety}
                            label='HP:'
                            value={tank.default_profile['hp']}
                        />
                        <TankCardInformationLine
                            IconComponent={GiAbdominalArmor}
                            label='Hull Armor:'
                            value={`${tank.default_profile.armor.hull['front']}/${tank.default_profile.armor.hull['rear']}/${tank.default_profile.armor.hull['sides']}`}
                        />
                        {tank.default_profile.armor.turret && (
                            <TankCardInformationLine
                                IconComponent={GiAbdominalArmor}
                                label='Turret Armor:'
                                value={`${tank.default_profile.armor.turret?.['front']}/${tank.default_profile.armor.turret?.['rear']}/${tank.default_profile.armor.turret?.['sides']}`}
                            />
                        )}
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <TankCardInformationLine
                                IconComponent={FaRegKeyboard}
                                label='Description:'
                                value={tank.description}
                                description='true'
                            />
                        </Box>
                    </>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1rem'
                    }}
                >
                    <Button
                        onClick={handleToggleExpandedState}
                        sx={{
                            alignItems: 'center',
                            backgroundColor: '#ab003c',
                            border: '2px solid transparent',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                            color: '#fafafa',
                            display: 'flex',
                            fontStyle: 'bold',
                            fontSize: '1rem',
                            height: '2.5rem',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease, width 0.3s ease',
                            whiteSpace: 'nowrap',
                            width: '8rem',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                borderColor: '#ab003c',
                                boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                                color: '#fafafa',
                            },
                            '&:hover .compare-icon': {
                                transform: 'rotate(180deg)',
                                color: '#fafafa'
                            }
                        }}
                    >
                        {viewState.expanded ? 'Hide' : 'Show More'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default TankCardV2;