// Tank Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Paper, Tooltip, Typography } from '@mui/material';
import { GiBattleTank, GiChemicalTank, GiGreatWarTank } from "react-icons/gi";
import { MdOutlineExpandCircleDown, MdRemoveRedEye } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { GrMoney } from "react-icons/gr";
import { FaCodeCompare } from "react-icons/fa6";


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import TorchImageWithSparks from './TorchImageWithSparks';


// Tank Component 
function Tank() {

    const { tank_id } = useParams();
    const [tank, setTank] = useState(null);
    const [showAllInfo, setShowAllInfo] = useState(false);
    const [expand, setExpand] = useState({
        crew: false,
        information: false,
        description: false,
        firepower: false,
        mobility: false,
        spotting: false,
        survivability: false,
        vehicle: false
    })

    useEffect(() => {
        const fetchTankData = async () => {
            try {
                const response = await apiClient.get(`/tanks/${tank_id}`)
                console.log(`Response: `, response.data.data);
                setTank(response.data.data);
            }
            catch {
                console.error('Error fetching tank information!');
            }
        }
        fetchTankData();
    }, [tank_id]);

    const handleShow = (key) => {
        setExpand((previous) => ({
            ...previous,
            [key]: !previous[key]
        }));
    }

    const toggleShowAll = () => {
        if (showAllInfo) {
            setExpand({
                crew: false,
                information: false,
                description: false,
                firepower: false,
                mobility: false,
                spotting: false,
                survivability: false,
                vehicle: false,
            });
        } else {
            setExpand({
                crew: true,
                information: true,
                description: true,
                firepower: true,
                mobility: true,
                spotting: true,
                survivability: true,
                vehicle: true,
            });
        }
        setShowAllInfo((prev) => !prev);
    };

    return (
        <div
            className='tank-container'
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: '8rem',
                    marginBottom: '8rem'
                }}
            >
                <Paper
                    elevation={3}
                    style={{
                        backgroundColor: '#161616',
                        color: '#fafafa',
                        textAlign: 'center',
                        width: '70rem'
                    }}
                >
                    {tank && (
                        <>
                            <Card
                                sx={{
                                    backgroundColor: '#161616',
                                    color: '#fafafa',
                                    minHeight: expand.description ? '60rem' : '40rem',
                                    textAlign: 'center',
                                    transition: 'height 0.3s ease-in-out',
                                    boxShadow: '0px 6px 6px rgba(0, 0, 0.4, 0.4)'
                                }}
                            >
                                <Typography
                                    variant='h1'
                                    sx={{
                                        color: '#ab003c'
                                    }}
                                >
                                    {tank.name}
                                </Typography>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        color: '#ab003c',
                                        marginTop: '3rem'
                                    }}
                                >
                                    Cost:
                                    <GrMoney
                                        fontSize="2rem"
                                        style={{
                                            color: '#4b4848',
                                            marginLeft: '.5rem',
                                            marginRight: '-.1rem',
                                            position: 'relative',
                                            top: '.5rem',
                                            transition: 'color 0.3s ease',
                                        }}
                                    />
                                    <span style={{ color: '#4b4848' }}> {tank.price} </span>
                                </Typography>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        width: '60rem',
                                        height: '25rem',
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
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        marginBottom: '4rem'
                                    }}
                                >
                                    <Button
                                        variant='filled'
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: '#900C3F',
                                            backgroundColor: '#161616',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                            fontStyle: 'bold',
                                            fontSize: '1rem',
                                            marginRight: '1rem',
                                            width: '8rem',
                                            '&:hover': {
                                                backgroundColor: '#ab003c',
                                                color: '#2b2a2e',
                                            },
                                        }}
                                    >
                                        <GrMoney
                                            fontSize="2rem"
                                            style={{
                                                marginRight: '.5rem',
                                                transition: 'color 0.3s ease',
                                            }}
                                        />
                                        Purchase
                                    </Button>
                                    <Button
                                        variant='filled'
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: '#900C3F',
                                            backgroundColor: '#161616',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                            fontStyle: 'bold',
                                            fontSize: '1rem',
                                            marginRight: '1rem',
                                            width: '8rem',
                                            '&:hover': {
                                                backgroundColor: '#ab003c',
                                                color: '#2b2a2e',
                                            },
                                        }}
                                    >
                                        <FaCodeCompare
                                            fontSize="2rem"
                                            style={{
                                                marginRight: '.5rem',
                                                transition: 'color 0.3s ease',
                                            }}
                                        />
                                        Compare
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        marginLeft: '5rem',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    <Button
                                        onClick={() => handleShow('information')}
                                        variant="filled"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: '#900C3F',
                                            backgroundColor: '#161616',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                            fontStyle: 'bold',
                                            fontSize: '1rem',
                                            marginRight: '1rem',
                                            '&:hover': {
                                                backgroundColor: '#ab003c',
                                                color: '#2b2a2e',
                                            },
                                        }}
                                    >
                                        <GiBattleTank
                                            fontSize="2rem"
                                            style={{
                                                marginRight: '.5rem',
                                                transition: 'color 0.3s ease',
                                            }}
                                        />
                                        {expand.information ? 'Hide Tank Information' : 'Show Tank Information'}
                                    </Button>
                                    <Button
                                        onClick={() => toggleShowAll()}
                                        variant="filled"
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
                                            fontSize="2rem"
                                            style={{
                                                marginRight: '.5rem',
                                                transition: 'color 0.3s ease',
                                                transform: showAllInfo ? 'rotate(180deg)' : 'rotate(0deg)'
                                            }}
                                        />
                                        {showAllInfo ? 'Hide All' : 'Show All'}
                                    </Button>
                                </Box>
                                {expand.information && (
                                    <>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '4rem'
                                            }}
                                        >
                                            <Tooltip
                                                arrow
                                                title="Vehicle Tier"
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
                                                    variant='h5'
                                                    sx={{
                                                        marginRight: '.5rem'
                                                    }}
                                                >
                                                    Tier:
                                                </Typography>
                                            </Tooltip>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c'
                                                }}
                                            >
                                                {tank.tier}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '4rem'
                                            }}
                                        >
                                            <Tooltip
                                                arrow
                                                title="Vehicle Nation"
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
                                                    variant='h5'
                                                    sx={{
                                                        marginRight: '.5rem'
                                                    }}
                                                >
                                                    Nation:
                                                </Typography>
                                            </Tooltip>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c'
                                                }}
                                            >
                                                {tank.nation}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Tooltip
                                                arrow
                                                title="Vehicle Description"
                                                placement="bottom"
                                                slotProps={{
                                                    popper: {
                                                        modifiers: [
                                                            {
                                                                name: 'offset',
                                                                options: {
                                                                    offset: [0, -170],
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            >

                                                <Typography
                                                    variant='h5'
                                                    sx={{
                                                        marginRight: '.5rem'
                                                    }}
                                                >
                                                    Description:
                                                </Typography>
                                            </Tooltip>
                                            <Typography
                                                variant='h5'
                                                noWrap={!expand.description}
                                                sx={{
                                                    color: '#ab003c',
                                                    maxWidth: '36rem'
                                                }}
                                            >
                                                {tank.description}
                                            </Typography>
                                            <Box

                                            >

                                                <Button
                                                    onClick={() => handleShow('description')}
                                                    variant="filled"
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        color: '#900C3F',
                                                        backgroundColor: '#161616',
                                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                                        fontStyle: 'bold',
                                                        fontSize: '1rem',
                                                        marginLeft: '.5rem',
                                                        '&:hover': {
                                                            backgroundColor: '#ab003c',
                                                            color: '#2b2a2e',
                                                        },
                                                    }}
                                                >
                                                    <MdOutlineExpandCircleDown
                                                        style={{
                                                            marginRight: '.5rem',
                                                            transition: 'color 0.3s ease',
                                                            transform: expand.description ? 'rotate(180deg)' : 'rotate(0deg)'
                                                        }}
                                                    />
                                                    {expand.description ? 'Hide Description' : 'Show Description'}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </>
                                )}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        marginLeft: '5rem',
                                        marginBottom: '1rem',
                                        marginTop: '1rem'
                                    }}
                                >
                                    <Button
                                        onClick={() => handleShow('survivability')}
                                        variant="filled"
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
                                </Box>
                                {expand.survivability && (
                                    <>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                HP:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile['hp']}
                                            </Typography>
                                        </Box>
                                        {tank.default_profile.armor && tank.default_profile.armor.turret !== null ? (
                                            <>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'start',
                                                        marginLeft: '6rem',
                                                        marginRight: '6rem'
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h5'
                                                    >
                                                        Hull Armor:
                                                    </Typography>
                                                    <Typography
                                                        variant='h5'
                                                        sx={{
                                                            color: '#ab003c',
                                                            marginLeft: '.5rem'
                                                        }}
                                                    >
                                                        {tank.default_profile.armor.hull['front']}/{tank.default_profile.armor.hull['rear']}/{tank.default_profile.armor.hull['sides']}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'start',
                                                        marginLeft: '6rem',
                                                        marginRight: '6rem'
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h5'
                                                    >
                                                        Turret Armor:
                                                    </Typography>
                                                    <Typography
                                                        variant='h5'
                                                        sx={{
                                                            color: '#ab003c',
                                                            marginLeft: '.5rem'
                                                        }}
                                                    >
                                                        {tank.default_profile.armor.turret['front']}/{tank.default_profile.armor.turret['rear']}/{tank.default_profile.armor.turret['sides']}
                                                    </Typography>
                                                </Box>
                                            </>
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'start',
                                                    marginLeft: '6rem',
                                                    marginRight: '6rem'
                                                }}
                                            >
                                                <Typography
                                                    variant='h5'
                                                >
                                                    Hull Armor:
                                                </Typography>
                                                <Typography
                                                    variant='h5'
                                                    sx={{
                                                        color: '#ab003c',
                                                        marginLeft: '.5rem'
                                                    }}
                                                >
                                                    {tank.default_profile.armor.hull['front']}/{tank.default_profile.armor.hull['rear']}/{tank.default_profile.armor.hull['sides']}
                                                </Typography>
                                            </Box>
                                        )}
                                    </>
                                )}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        marginLeft: '5rem',
                                        marginBottom: '1rem',
                                        marginTop: '1rem'
                                    }}
                                >
                                    <Button
                                        onClick={() => handleShow('mobility')}
                                        variant="filled"
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
                                {expand.mobility && (
                                    <>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                Chance of Fire:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile.engine['fire_chance']}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                Engine Power:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile.engine['power']}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                Load Limit:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile['max_weight']} Tons
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                Top Speed Backward:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile['speed_backward']}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                Top Speed Forward:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile['speed_forward']}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                Traverse Speed:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile.suspension['traverse_speed']}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                Weight:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile['weight']} Tons
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        marginLeft: '5rem',
                                        marginBottom: '1rem',
                                        marginTop: '1rem'
                                    }}
                                >
                                    <Button
                                        onClick={() => handleShow('spotting')}
                                        variant="filled"
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
                                {expand.spotting && (
                                    <>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                View Range:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile.turret['view_range']}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem',
                                                marginBottom: '2rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                Signal Range:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.default_profile.radio['signal_range']}
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        marginLeft: '5rem',
                                        marginBottom: '2rem',
                                        marginTop: '1rem'
                                    }}
                                >
                                    <Button
                                        onClick={() => handleShow('crew')}
                                        variant="filled"
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
                                {expand.crew && (
                                    <>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                marginLeft: '6rem',
                                                marginRight: '6rem'
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                            >
                                                Crew Members:
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    color: '#ab003c',
                                                    marginLeft: '.5rem'
                                                }}
                                            >
                                                {tank.crew.length}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                gap: '1rem',
                                                marginTop: '1rem',
                                                marginLeft: '6rem',
                                                marginRight: '6rem',
                                                marginBottom: '2rem'
                                            }}
                                        >
                                            {tank.crew.map((crewMember, index) => (
                                                <Box
                                                    key={`crew-member-${index}`}
                                                    sx={{
                                                        textAlign: 'start',
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
                                    </>
                                )}
                            </Card>
                        </>
                    )}
                </Paper>
            </Box>
        </div>
    )
}

export default Tank;

// https://na-wotp.wgcdn.co/static/6.2.8_cfaf5d/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/uk-face-6.png
// //na-wotp.wgcdn.co/static/6.2.8_cfaf5d/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/italy-face-1.png
// `https://na-wotp.wgcdn.co/static/6.2.8_cfaf5d/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/${ tank.nation.toLowerCase() }-face-${ tank.crew.length }.png`