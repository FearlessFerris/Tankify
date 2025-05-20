// Tank Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, CardMedia, Collapse, Grow, Paper, Tooltip, Typography } from '@mui/material';
import { FaNewspaper } from 'react-icons/fa';
import { FaCodeCompare } from 'react-icons/fa6';
import { GrMoney } from 'react-icons/gr';
import { LiaCrosshairsSolid } from 'react-icons/lia';
import { MdOutlineExpandCircleDown } from 'react-icons/md';
import { PiStackFill } from 'react-icons/pi';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import InformationLine from './InformationLine';
import TorchImageWithSparks from './TorchImageWithSparks';


// Context Providers 
import { useAlert } from '../ContextDirectory/AlertContext';
import { useUser } from '../ContextDirectory/UserContext';


// Tank Component 
function Tank() {


    // Call Custom Hooks 
    const showAlert = useAlert();
    const { user, refreshUserData, fetchDefaultCurrency } = useUser();

    // Call React Router Hooks 
    const navigate = useNavigate();
    const location = useLocation();

    // Extract tank_id from Params 
    const { tank_id } = useParams();


    // State Variables 
    const [compareButtonHover, setCompareButtonHover] = useState(false);
    const [isColumn, setIsColumn] = useState(false);
    const [expand, setExpand] = useState({
        firepower: false,
        survivability: false,
        mobility: false,
        spotting: false,
        crew: false,
        description: false
    });
    const [purchaseOpen, setPurchaseOpen] = useState(false);
    const [tank, setTank] = useState([]);

    // Conditional Values 
    const buttonText = isColumn ? 'Inline Information' : 'Stack Information';
    const iconComponent = isColumn ? FaNewspaper : PiStackFill;

    // Helper Functions 

    // API Helper Functions 
    const fetchTankData = async () => {
        try {
            const response = await apiClient.get(`/tanks/${tank_id}`)
            setTank(response.data.data);
        }
        catch (error) {
            console.error('Error fetching tank information');
        }
    }

    // Initial Data Fetching 
    useEffect(() => {
        fetchTankData();
    }, [tank_id]);

    // State Handler Functions 

    // Handle Toggle Purchase 
    const handleTogglePurchase = () => {
        if (user) {
            setPurchaseOpen(true);
        }
        else {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            navigate('/user/login');
        }
    }

    // Handle Toggle Purchase Close
    const handleTogglePurchaseClose = () => {
        setPurchaseOpen(false);
    }

    // Handle Toggle is Column
    const handleToggleIsColumn = () => {
        setIsColumn((previous) => !previous);
    }

    // Handle Toggle Expand 
    const handleToggleExpand = (key) => {
        setExpand((previous) => ({
            ...previous,
            [key]: !previous[key],
        }));
    }

    // Handle Toggle All 
    const handleToggleAll = () => {
        setExpand((previous) => {
            const isAllTrue = Object.values(previous).every(Boolean);
            const newValue = !isAllTrue;
            return Object.keys(previous).reduce((acc, key) => {
                acc[key] = newValue;
                return acc;
            }, {});
        })
    }

    const fixNumber = (number) => Number(number).toLocaleString();
    const areAllExpanded = Object.values(expand).every(Boolean);

    // Handle Compare Button Hover 
    const handleCompareButtonHover = () => {
        setCompareButtonHover((previous) => !previous);
    }



    // Modular Input Renders ------------------------------------------------------------------


    // Render Toggle Button
    const renderToggleAllButton = () => (
        <Button
            onClick={handleToggleAll}
            sx={{
                width: '12rem',
                height: '2.8rem',
                backgroundColor: '#ab003c',
                color: '#fafafa',
                fontWeight: 'bold',
                fontSize: '1rem',
                border: '2px solid transparent',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                overflow: 'hidden',
                padding: 0,
                transition: 'border-color 0.2s ease, box-shadow 0.3s ease',
                '&:hover': {
                    backgroundColor: 'transparent',
                    borderColor: '#ab003c',
                    boxShadow: '0 0 12px rgba(171, 0, 60, 0.6)',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1)',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
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
                        transform: areAllExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                />
                {areAllExpanded ? 'Hide All' : 'Show All'}
            </Box>
        </Button>
    );


    // Render Compare Button 
    const renderCompareButton = () => (
        <Button
            onMouseEnter={handleCompareButtonHover}
            onMouseLeave={handleCompareButtonHover}
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ab003c',
                color: '#fafafa',
                border: '2px solid transparent',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                fontStyle: 'bold',
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: compareButtonHover ? '16rem' : '10rem',
                transition: 'all 0.3s ease, width 0.3s ease',
                '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#fafafa',
                    borderColor: '#ab003c',
                    boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                },
                '&:hover .compare-icon': {
                    transform: 'rotate(180deg)',
                    color: '#fafafa'
                }
            }}
        >
            <Box
                className="default-text"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1)',
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                    whiteSpace: 'nowrap',
                }}
            >
                <FaCodeCompare
                    fontSize="1.5rem"
                    className='compare-icon'
                    style={{
                        marginRight: '.5rem',
                        transition: 'transform 0.3s ease, color 0.1s ease'
                    }}
                />
                {compareButtonHover ? 'Add to Comparison List' : 'Compare'}
            </Box>
        </Button>
    );


    // Render Purchase Button
    const renderPurchaseButton = () => (
        <Button
            // onClick={handleTogglePurchaseOpen}
            sx={{
                width: '12rem',
                height: '2.8rem',
                backgroundColor: '#ab003c',
                color: '#fafafa',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                border: '2px solid transparent',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                overflow: 'hidden',
                padding: 0,
                position: 'relative',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                '&:hover': {
                    width: '20rem',
                    backgroundColor: 'transparent',
                    borderColor: '#ab003c',
                    boxShadow: '0 0 12px rgba(171, 0, 60, 0.6)',
                },
            }}
        >
            <Box
                className="default-text"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1)',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                    opacity: 1,
                    pointerEvents: 'none',
                    '&:hover': {
                        opacity: 0,
                    },
                }}
            >
                <GrMoney
                    fontSize="1.3rem"
                    style={{
                        marginRight: '0.4rem'
                    }}
                />
                Purchase
            </Box>
            <Box
                className="hover-text"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    whiteSpace: 'nowrap',
                    transition: 'opacity 0.2s ease 0.1s',
                    pointerEvents: 'none',
                    '&:hover': {
                        opacity: 1,
                    },
                }}
            >
                <GrMoney
                    fontSize="1.3rem"
                    style={{
                        marginRight: '0.4rem'
                    }}
                />
                Purchase for <span style={{ marginLeft: '0.3rem' }}>{fixNumber(tank.price)} Credits</span>
            </Box>
        </Button>
    );


    // Render Toggle Button 
    const ToggleButton = ({ IconComponent, labelOn, labelOff, onClick, reference }) => {

        return (
            <Button
                onClick={onClick}
                variant='filled'
                sx={{
                    alignItems: 'flex-start',
                    backgroundColor: '#ab003c',
                    color: '#fafafa',
                    border: '2px solid transparent',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    fontStyle: 'bold',
                    fontSize: '1rem',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease, width 0.3s ease',
                    width: reference ? '16rem' : '12rem',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#fafafa',
                        borderColor: '#ab003c',
                        boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                    },
                }}
            >
                {IconComponent && (
                    <IconComponent
                        fontSize="1.5rem"
                        style={{
                            marginRight: '.5rem',
                            marginTop: '.2rem',
                            transition: 'transform 0.3s ease, color 0.3s ease',
                        }}
                    />
                )}
                {reference ? labelOn : labelOff}
            </Button>
        )
    }


    // Tank Image / Purchase Render 
    const renderTankImageContainer = () => {
        return (
            <Paper
                elevation={4}
                style={{
                    backgroundColor: '#0d0d0d',
                    borderRadius: '1rem',
                    color: '#fafafa',
                    height: '43rem',
                    marginTop: '8rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    width: '60rem'
                }}
            >
                {tank && (
                    <>
                        <Tooltip
                            arrow
                            title='Vehicle'
                            placement='top'
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
                                    marginBottom: '.5rem',
                                }}
                            >
                                {tank.name}
                            </Typography>
                        </Tooltip>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    top: 0,
                                    zIndex: 0
                                }}
                            >
                                <TorchImageWithSparks
                                    src={tank.nation_flag_hd}
                                />
                                <CardMedia
                                    component="img"
                                    image={tank.image}
                                    alt={`${tank.name}`}
                                    sx={{
                                        position: 'absolute',
                                        bottom: '36rem',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '30rem',
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '3rem',
                                justifyContent: 'center',
                                marginTop: '2rem',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    transformOrigin: 'center',
                                    willChange: 'transform'
                                }}
                            >
                                {renderToggleAllButton()}
                            </Box>
                            <Box
                                sx={{
                                    transformOrigin: 'center',
                                    willChange: 'transform'
                                }}
                            >
                                {renderCompareButton()}
                            </Box>
                            <Box
                                sx={{
                                    transformOrigin: 'center',
                                    willChange: 'transform'
                                }}
                            >
                                {renderPurchaseButton()}
                            </Box>
                        </Box>
                    </>
                )}
            </Paper>
        )
    }

    // Tank Specification Render 
    const renderTankSpecification = () => {

        return (
            <>
                <Paper
                    elevation={4}
                    sx={{
                        backgroundColor: '#0d0d0d',
                        borderRadius: '1rem',
                        color: '#fafafa',
                        marginBottom: '8rem',
                        marginTop: '2rem',
                        textAlign: 'center',
                        width: '60rem'
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: '2rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <ToggleButton
                            IconComponent={LiaCrosshairsSolid}
                            labelOn="Hide Firepower"
                            labelOff="Show Firepower"
                            onClick={() => handleToggleExpand('firepower')}
                            reference={expand.firepower}
                        />
                        {tank && (
                            <Collapse
                                in={expand.firepower}
                                timeout='auto'
                                unmountOnExit
                            >
                                <Grow
                                    in={expand.firepower}
                                    key={isColumn ? 'row-layout' : 'column-layout'}
                                    style={{

                                    }}
                                    timeout={800}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: isColumn ? 'column' : 'row',
                                            flexWrap: 'wrap',
                                            gap: '1rem',
                                            marginTop: '1rem',
                                            marginLeft: '2rem',
                                            marginRight: '2rem',
                                            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
                                        }}
                                    >
                                        <InformationLine
                                            label='Firepower'
                                            value={tank.default_profile?.gun?.['aim_time']}
                                            tooltip='Aim time in seconds'
                                            unit='s'
                                        />
                                    </Box>
                                </Grow>
                            </Collapse>
                        )}
                    </Box>
                </Paper>
            </>
        )
    }

    // Tank Component Render 
    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    marginTop: '8rem'
                }}
            >
                {renderTankImageContainer()}
                {renderTankSpecification()}
            </Box>

        </>
    )

}

export default Tank;