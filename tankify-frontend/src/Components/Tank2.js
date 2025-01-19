// Tank Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CardMedia, Collapse, Paper, Tooltip, Typography } from '@mui/material';
import { GrMoney } from "react-icons/gr";
import { LiaCrosshairsSolid } from "react-icons/lia";
import { GiChemicalTank, GiGreatWarTank } from 'react-icons/gi';
import { MdOutlineExpandCircleDown, MdRemoveRedEye } from 'react-icons/md';
import { SlPeople } from 'react-icons/sl';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import TorchImageWithSparks from './TorchImageWithSparks';
import InformationLine from './InformationLine';


// Tank Component 
function Tank2() {

    const { tank_id } = useParams();
    const [tank, setTank] = useState([]);
    const [expand, setExpand] = useState({
        firepower: false,
        survivability: false,
        mobility: false,
        spotting: false,
        crew: false
    });

    useEffect(() => {
        const fetchTankData = async () => {
            try {
                const response = await apiClient.get(`/tanks/${tank_id}`)
                setTank(response.data.data);
                console.log(response.data.data);
            }
            catch (error) {
                console.error('Error fetching tank information');
            }
        }
        fetchTankData();
    }, [tank_id]);

    const handleToggleExpand = (key) => {
        setExpand((previous) => ({
            ...previous,
            [key]: !previous[key],
        }));
    }

    const handleToggleAll = () => {
        setExpand((previous) => {
            const isAllTrue = Object.values(previous).every(Boolean);
            const newValue = !isAllTrue;
            return Object.keys(previous).reduce((acc, key) => {
                acc[key] = newValue;
                return acc;
            }, {});
        });
    }

    const fixCurrency = (price) => Number(price).toLocaleString();
    const areAllExpanded = Object.values(expand).every(Boolean);

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Paper
                elevation={4}
                style={{
                    backgroundColor: '#161616',
                    color: '#fafafa',
                    marginTop: '8rem',
                    marginBottom: '8rem',
                    textAlign: 'center',
                    width: '65rem'
                }}
            >
                {tank && (
                    <>
                        <Tooltip
                            arrow
                            title="Vehicle"
                            placement="bottom"
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, -10],
                                            },
                                        },
                                    ],
                                },
                            }}
                        >

                            <Typography
                                variant='h2'
                                sx={{
                                    color: '#ab003c',
                                    marginTop: '1rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                {tank.name}
                            </Typography>
                        </Tooltip>
                        <Tooltip
                            arrow
                            title="Vehicle Price"
                            placement="bottom"
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, -10],
                                            },
                                        },
                                    ],
                                },
                            }}
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    marginTop: '2rem'
                                }}
                            >
                                Price:
                                <GrMoney
                                    fontSize="2rem"
                                    style={{
                                        color: '#4b4848',
                                        marginLeft: '.5rem',
                                        marginRight: '.2rem',
                                        position: 'relative',
                                        top: '.4rem',
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                                <span style={{ color: '#4b4848' }}> {tank.price ? fixCurrency(tank.price) : 'NA'} </span>
                            </Typography>
                        </Tooltip>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'inline-block',
                                width: '50rem',
                                height: '23rem',
                                marginTop: '1rem',
                                marginBottom: '10rem',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 0
                                }}
                            >
                                <TorchImageWithSparks src={tank.nation_flag_hd} />
                            </Box>

                            <CardMedia
                                component='img'
                                image={tank.image}
                                alt={`${tank.name}`}
                                sx={{
                                    position: 'absolute',
                                    top: '70%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1,
                                    width: '23rem',
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'center ',
                                display: 'flex',
                                justifyContent: 'start',
                                marginLeft: '7rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <Button
                                onClick={handleToggleAll}
                                variant='filled'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#900C3F',
                                    backgroundColor: '#161616',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                    fontStyle: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#2b2a2e',
                                    },
                                }}
                            >
                                <MdOutlineExpandCircleDown
                                    fontSize="1.5rem"
                                    style={{
                                        marginLeft: '.2rem',
                                        marginRight: '.5rem',
                                        position: 'relative',
                                        transition: 'color 0.3s ease',
                                        transform: areAllExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }}
                                />
                                {areAllExpanded ? 'Hide All' : 'Show All'}
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'start',
                                marginLeft: '7rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <Button
                                onClick={() => handleToggleExpand('firepower')}
                                variant='filled'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#900C3F',
                                    backgroundColor: '#161616',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                    fontStyle: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#2b2a2e',
                                    },
                                }}
                            >
                                <LiaCrosshairsSolid
                                    fontSize="1.5rem"
                                    style={{
                                        marginLeft: '.2rem',
                                        marginRight: '.5rem',
                                        position: 'relative',
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                                {expand.firepower ? 'Hide Firepower' : 'Show Firepower'}
                            </Button>
                            <Collapse 
                                in = {expand.firepower} 
                                timeout = 'auto' 
                                unmountOnExit
                            >
                                <InformationLine 
                                    label = 'Aim Time:' 
                                    tooltip = 'Aim time in seconds'
                                    value = { tank.default_profile?.gun?.[ 'aim_time' ] } 
                                />
                                <InformationLine 
                                    label = 'Caliber:' 
                                    tooltip = 'Caliber of gun in millimeters'
                                    value = { tank.default_profile?.gun?.[ 'caliber' ] }
                                    unit = 'mm' 
                                />
                                <InformationLine 
                                    label = 'Dispersion:' 
                                    tooltip = 'Dispersion of gun up to 100 meters'
                                    value = { tank.default_profile?.gun?.[ 'dispersion' ] }
                                    unit = ' /100m' 
                                />
                                <InformationLine 
                                    label = 'Fire Rate:' 
                                    tooltip = 'Rate of fire in rounds per minute'
                                    value = { tank.default_profile?.gun?.[ 'fire_rate' ] }
                                    unit = 'rpm' 
                                />
                                <InformationLine 
                                    label = 'Gun Name:' 
                                    tooltip = 'Gun Model Name'
                                    value = { tank.default_profile?.gun?.[ 'name' ] } 
                                />
                                <InformationLine 
                                    label = 'Gun Weight:' 
                                    tooltip = 'Gun Model Weight'
                                    value = { tank.default_profile?.gun?.[ 'weight' ] }
                                    unit = ' kg' 
                                />
                            </Collapse>
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'start',
                                marginLeft: '7rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <Button
                                onClick={() => handleToggleExpand('survivability')}
                                variant='filled'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#900C3F',
                                    backgroundColor: '#161616',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                    fontStyle: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#2b2a2e',
                                    },
                                }}
                            >
                                <GiChemicalTank
                                    fontSize="2rem"
                                    style={{
                                        marginRight: '.5rem',
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                                {expand.survivability ? 'Hide Survivability' : 'Show Survivability'}
                            </Button>
                            <Collapse in={expand.survivability} timeout='auto' unmountOnExit>
                                <InformationLine 
                                    label = 'Tier:' 
                                    tooltip = 'Vehicle Tier'
                                    value = { tank.tier }
                                />
                                <InformationLine 
                                    label = 'HP:' 
                                    tooltip = 'Vehicle HP'
                                    value = { tank.default_profile?.hp }
                                />
                                <InformationLine 
                                    label = 'Hull Armor:' 
                                    tooltip = 'Vehicle Front / Side / Rear Hull Armor in millimeters'
                                    value = { `${tank.default_profile?.armor?.hull?.['front']}/${tank.default_profile?.armor?.hull?.['sides']}/${tank.default_profile?.armor?.hull?.['rear'] }` }
                                />
                                { tank.default_profile?.armor?.turret && (
                                    <InformationLine 
                                    label = 'Turret Armor:' 
                                    tooltip = 'Vehicle Front / Side / Rear Turret Armor in millimeters'
                                    value = { `${tank.default_profile?.armor?.turret?.['front']}/${tank.default_profile?.armor?.turret?.['sides']}/${tank.default_profile?.armor?.turret?.['rear']}` }
                                />
                                )}
                                <InformationLine 
                                    label = 'Max Ammo:' 
                                    tooltip = 'Vehicle max ammo capacity'
                                    value = { tank.default_profile?.max_ammo }
                                />
                            </Collapse>
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'center ',
                                display: 'flex',
                                justifyContent: 'start',
                                marginLeft: '7rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <Button
                                onClick={() => handleToggleExpand('mobility')}
                                variant='filled'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#900C3F',
                                    backgroundColor: '#161616',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                    fontStyle: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#2b2a2e',
                                    },
                                }}
                            >
                                <GiGreatWarTank
                                    fontSize="2rem"
                                    style={{
                                        marginRight: '.5rem',
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                                {expand.mobility ? 'Hide Mobility' : 'Show Mobility'}
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'center ',
                                display: 'flex',
                                justifyContent: 'start',
                                marginLeft: '7rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <Button
                                onClick={() => handleToggleExpand('spotting')}
                                variant='filled'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#900C3F',
                                    backgroundColor: '#161616',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                    fontStyle: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#2b2a2e',
                                    },
                                }}
                            >
                                <MdRemoveRedEye
                                    fontSize="2rem"
                                    style={{
                                        marginRight: '.5rem',
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                                {expand.spotting ? 'Hide Spotting' : 'Show Spotting'}
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'center ',
                                display: 'flex',
                                justifyContent: 'start',
                                marginLeft: '7rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <Button
                                onClick={() => handleToggleExpand('crew')}
                                variant='filled'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#900C3F',
                                    backgroundColor: '#161616',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                    fontStyle: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#2b2a2e',
                                    },
                                }}
                            >
                                <SlPeople
                                    fontSize="2rem"
                                    style={{
                                        marginRight: '.5rem',
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                                {expand.crew ? 'Hide Crew' : 'Show Crew'}
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>

        </Box>
    )
}

export default Tank2;