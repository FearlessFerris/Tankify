// Tank Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CardMedia, Collapse, Grid2, Paper, Tooltip, Typography } from '@mui/material';
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
        crew: false,
        description: false
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

    const fixNumber = ( number ) => Number( number ).toLocaleString();
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
                            placement="left-start"
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [25, -370],
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
                            placement="left-start"
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [10, -390],
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
                                <span style={{ color: '#4b4848' }}> {tank.price ? fixNumber( tank.price ) : 'NA'} </span>
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
                                alignItems: 'flex-start',
                                display: 'flex',
                                justifyContent: 'start',
                                marginLeft: '7rem',
                                marginBottom: '1rem',
                                width: '25rem'
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
                        <Tooltip
                                    arrow
                                    title='Vehicle Description'
                                    placement="left-start"
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [42, -15],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                        <Box
                            sx={{
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'start',
                                marginLeft: '7rem',
                                marginRight: '7rem',
                                marginBottom: '1rem',
                            }}
                            >
                            <Button
                                onClick={ () => handleToggleExpand( 'description' ) }
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
                                        transform: expand.description ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }}
                                    />
                                { expand.description ? 'Hide Description' : 'Show Description' }
                            </Button>
                            <Collapse
                                in = { expand.description }
                                timeout='auto'
                                unmountOnExit
                                >
                                <Typography
                                    variant = 'body1'
                                    sx = {{
                                        marginLeft: '1rem',
                                        marginRight: '1rem',
                                        textAlign: 'start'
                                    }}
                                    >
                                { tank.description }
                                </Typography>
                            </Collapse>
                        </Box> 
                        </Tooltip> 
                        <Box
                            sx={{
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'start',
                                marginLeft: '7rem',
                                marginBottom: '1rem',
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
                                in={expand.firepower}
                                timeout='auto'
                                unmountOnExit
                                >
                                <InformationLine
                                    label='Aim Time:'
                                    value={tank.default_profile?.gun?.['aim_time']}
                                    tooltip='Aim time in seconds'
                                    unit='s'
                                    />
                                <InformationLine
                                    label='Caliber:'
                                    value={tank.default_profile?.gun?.['caliber']}
                                    tooltip='Caliber of gun in millimeters'
                                    unit='mm'
                                    />
                                <InformationLine
                                    label='Dispersion:'
                                    value={tank.default_profile?.gun?.['dispersion']}
                                    tooltip='Dispersion of gun up to 100 meters'
                                    unit=' /100m'
                                    />
                                <InformationLine
                                    label='Fire Rate:'
                                    value={tank.default_profile?.gun?.['fire_rate']}
                                    tooltip='Rate of fire in rounds per minute'
                                    unit='rpm'
                                    />
                                <InformationLine
                                    label='Gun Name:'
                                    value={tank.default_profile?.gun?.['name']}
                                    tooltip='Gun Model Name'
                                    />
                                <InformationLine
                                    label='Gun Weight:'
                                    value={ fixNumber( tank.default_profile?.gun?.['weight'] )}
                                    tooltip='Gun Model Weight'
                                    unit=' kg'
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
                                    label='Tier:'
                                    value={tank.tier}
                                    tooltip='Vehicle Tier'
                                    />
                                <InformationLine
                                    label='HP:'
                                    value={tank.default_profile?.hp}
                                    tooltip='Vehicle HP'
                                    />
                                <InformationLine
                                    label='Hull Armor:'
                                    value={`${tank.default_profile?.armor?.hull?.['front']}/${tank.default_profile?.armor?.hull?.['sides']}/${tank.default_profile?.armor?.hull?.['rear']}`}
                                    tooltip='Vehicle Front / Side / Rear Hull Armor in millimeters'
                                    />
                                {tank.default_profile?.armor?.turret && (
                                    <InformationLine
                                    label='Turret Armor:'
                                    value={`${tank.default_profile?.armor?.turret?.['front']}/${tank.default_profile?.armor?.turret?.['sides']}/${tank.default_profile?.armor?.turret?.['rear']}`}
                                    tooltip='Vehicle Front / Side / Rear Turret Armor in millimeters'
                                    />
                                )}
                                <InformationLine
                                    label='Max Ammo:'
                                    value={tank.default_profile?.max_ammo}
                                    tooltip='Vehicle max ammo capacity'
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
                            <Collapse
                                in={expand.mobility}
                                timeout='auto'
                                unmountOnExit
                            >
                                <InformationLine
                                    label='Top Speed Forward:'
                                    value={tank.default_profile?.speed_forward}
                                    tooltip='Top vehicle speed forward in kilometers per hour'
                                    unit=' km/h'
                                />
                                <InformationLine
                                    label='Top Speed Reverse:'
                                    value={tank.default_profile?.speed_backward}
                                    tooltip='Top vehicle reverse speed in kilometers per hour'
                                    unit=' km/h'
                                />
                                <InformationLine
                                    label='Traverse Speed:'
                                    value={tank.default_profile?.suspension?.['traverse_speed']}
                                    tooltip='Top vehicle traverse speed in degrees per second'
                                    unit=' deg/s'
                                />
                                <InformationLine
                                    label='Max Weight:'
                                    value={ fixNumber( tank.default_profile?.max_weight ) }
                                    tooltip='Maximum vehicle weight'
                                    unit=' tons'
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
                            <Collapse
                                in={expand.spotting}
                                timeout='auto'
                                unmountOnExit
                            >
                                <InformationLine
                                    label='View Range'
                                    value={tank.default_profile?.turret?.view_range}
                                    tooltip='Maximum view range in meters'
                                    unit=' m'
                                />
                                <InformationLine
                                    label='Signal Range'
                                    value={tank.default_profile?.radio?.signal_range}
                                    tooltip='Maximum signal range in meters'
                                    unit=' m'
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
                            <Collapse
                                in={expand.crew}
                                timeout='auto'
                                unmountOnExit
                            >
                                <InformationLine
                                    label='Crew Members'
                                    value={tank.crew?.length}
                                    tooltip='Total number of crew members'
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        gap: '1rem',
                                        marginTop: '1rem',
                                        marginRight: '6rem',
                                        marginBottom: '2rem'
                                    }}
                                >
                                    {tank.crew?.map((crewMember, index) => (
                                        <Box
                                            key={`crew-member-${index}`}
                                            sx={{
                                                textAlign: 'start',
                                            }}
                                        >
                                            <Tooltip
                                                arrow
                                                title={`Vehicle ${crewMember.member_id}`}
                                                placement="bottom"
                                                slotProps={{
                                                    popper: {
                                                        modifiers: [
                                                            {
                                                                name: 'offset',
                                                                options: {
                                                                    offset: [0, 20],
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={`https://na-wotp.wgcdn.co/static/6.2.8_cfaf5d/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/${tank.nation.toLowerCase()}-face-${index + 1}.png`}
                                                    alt={crewMember.member_id}
                                                    style={{
                                                        width: '6rem',
                                                        height: '5rem',
                                                    }}
                                                />
                                            </Tooltip>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    marginTop: '0.5rem',
                                                    color: '#fafafa',
                                                }}
                                            >
                                                {crewMember.member_id.toUpperCase()}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Box>
                    </>
                )}
            </Paper>

        </Box>
    )
}

export default Tank2;