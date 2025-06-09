// Tank Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, CardMedia, Collapse, Grow, Modal, Paper, Tooltip, Typography } from '@mui/material';
import { FaNewspaper } from 'react-icons/fa';
import { FaCodeCompare, FaRegKeyboard } from 'react-icons/fa6';
import { GiChemicalTank, GiGreatWarTank } from 'react-icons/gi';
import { GrMoney } from 'react-icons/gr';
import { LiaCrosshairsSolid } from 'react-icons/lia';
import { MdOutlineExpandCircleDown, MdRemoveRedEye } from 'react-icons/md';
import { PiStackFill } from 'react-icons/pi';
import { SlPeople } from 'react-icons/sl';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import InformationLine from './InformationLine';
import TorchImageWithSparks from './TorchImageWithSparks';
import PurchaseForm from './PurchaseForm';


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
    const [purchaseButtonHover, setPurchaseButtonHover] = useState(false);
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

    // Handle Purchase Button Hover 
    const handlePurchaseButtonHover = () => {
        setPurchaseButtonHover((previous) => !previous);
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
            onClick={handleTogglePurchase}
            onMouseEnter={handlePurchaseButtonHover}
            onMouseLeave={handlePurchaseButtonHover}
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
                width: purchaseButtonHover ? '20rem' : '12rem',
                transition: 'all 0.3s ease, width 0.3s ease',
                '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#fafafa',
                    borderColor: '#ab003c',
                    boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                },
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
                <GrMoney
                    fontSize="1.5rem"
                    style={{
                        marginRight: '.5rem',
                        transition: 'transform 0.3s ease, color 0.1s ease'
                    }}
                />
                {purchaseButtonHover ? `Purchase for ${tank.price ? fixNumber(tank.price) : 'NA'} Credits` : 'Purchase'}
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
                    // transition: 'all 0.3s ease, width 0.3s ease',
                    width: labelOn === 'Inline Information' || labelOff === 'Stack Information'
                        ? '16rem'
                        : reference
                            ? '16rem'
                            : '12rem',
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
                        style={{
                            fontSize: '1.5rem',
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
                                    position: 'relative',
                                    width: '60rem',
                                    height: '30rem',
                                }}
                            >
                                <TorchImageWithSparks
                                    src={tank.nation_flag_hd}
                                    width="95%"
                                    height="100%"
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 'inherit',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={tank.image}
                                        alt={`${tank.name}`}
                                        sx={{
                                            width: '28rem',
                                            height: 'auto',
                                            pointerEvents: 'none',
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '5rem',
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
                            gap: '1rem',
                            marginBottom: '1rem',
                            marginLeft: '2rem',
                            marginTop: '1rem',
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem',
                            }}
                        >
                            <ToggleButton
                                IconComponent={FaRegKeyboard}
                                labelOn="Hide Description"
                                labelOff="Show Description"
                                onClick={() => handleToggleExpand('description')}
                                reference={expand.description}
                            />
                            <ToggleButton
                                IconComponent={iconComponent}
                                labelOn="Inline Information"
                                labelOff="Stack Information"
                                onClick={handleToggleIsColumn}
                                reference={isColumn}
                            />
                        </Box>
                        {tank && (
                            <Collapse
                                in={expand.description}
                                timeout={400}
                                unmountOnExit
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexWrap: 'wrap',
                                        gap: '1rem',
                                        marginLeft: '2rem',
                                        marginRight: '2rem',
                                        marginTop: '1rem',
                                        overflow: 'hidden',
                                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
                                        width: '50rem'
                                    }}
                                >
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            textAlign: 'start'
                                        }}
                                    >
                                        {tank.description}
                                    </Typography>
                                </Box>
                            </Collapse>
                        )}
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            marginLeft: '2rem',
                            marginTop: '1rem'
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
                                timeout={400}
                                unmountOnExit
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isColumn ? 'column' : 'row',
                                        flexWrap: 'wrap',
                                        gap: '1rem',
                                        marginLeft: '2rem',
                                        marginTop: '1rem',
                                        overflow: 'hidden',
                                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
                                        width: 'auto',
                                        maxWidth: isColumn ? '100%' : '50rem',
                                    }}
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
                                        unit='/100m'
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
                                        value={fixNumber(tank.default_profile?.gun?.['weight'])}
                                        tooltip='Gun Model Weight'
                                        unit='kg'
                                    />
                                </Box>
                            </Collapse>
                        )}
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            marginLeft: '2rem',
                            marginTop: '1rem'
                        }}
                    >
                        <ToggleButton
                            IconComponent={GiChemicalTank}
                            labelOn='Hide Survivability'
                            labelOff='Show Survivability'
                            onClick={() => handleToggleExpand('survivability')}
                            reference={expand.survivability}
                        />
                        {tank && (
                            <Collapse
                                in={expand.survivability}
                                timeout={400}
                                unmountOnExit
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isColumn ? 'column' : 'row',
                                        flexWrap: 'wrap',
                                        gap: '1rem',
                                        marginLeft: '2rem',
                                        marginTop: '1rem',
                                        overflow: 'hidden',
                                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
                                        width: 'auto',
                                        maxWidth: isColumn ? '100%' : '50rem',
                                    }}
                                >
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
                                </Box>
                            </Collapse>
                        )}
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            marginLeft: '2rem',
                            marginTop: '1rem'
                        }}
                    >
                        <ToggleButton
                            IconComponent={GiGreatWarTank}
                            labelOn='Hide Mobility'
                            labelOff='Show Mobility'
                            onClick={() => handleToggleExpand('mobility')}
                            reference={expand.mobility}
                        />
                        {tank && (
                            <Collapse
                                in={expand.mobility}
                                timeout={400}
                                unmountOnExit
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isColumn ? 'column' : 'row',
                                        flexWrap: 'wrap',
                                        gap: '1rem',
                                        marginLeft: '2rem',
                                        marginTop: '1rem',
                                        overflow: 'hidden',
                                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
                                        width: 'auto',
                                        maxWidth: isColumn ? '100%' : '50rem',
                                    }}
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
                                        tooltip='Top vehicle speed reverse in kilometers per hour'
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
                                        value={fixNumber(tank.default_profile?.max_weight)}
                                        tooltip='Maximum vehicle weight'
                                        unit=' tons'
                                    />
                                </Box>
                            </Collapse>
                        )}
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            marginLeft: '2rem',
                            marginTop: '1rem'
                        }}
                    >
                        <ToggleButton
                            IconComponent={MdRemoveRedEye}
                            labelOn='Hide Spotting'
                            labelOff='Show Spotting'
                            onClick={() => handleToggleExpand('spotting')}
                            reference={expand.spotting}
                        />
                        {tank && (
                            <Collapse
                                in={expand.spotting}
                                timeout={400}
                                unmountOnExit
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isColumn ? 'column' : 'row',
                                        flexWrap: 'wrap',
                                        gap: '1rem',
                                        marginLeft: '2rem',
                                        marginTop: '1rem',
                                        overflow: 'hidden',
                                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
                                        width: 'auto',
                                        maxWidth: isColumn ? '100%' : '50rem',
                                    }}
                                >
                                    <InformationLine
                                        label='View Range:'
                                        value={tank.default_profile?.turret?.view_range}
                                        tooltip='Maximum view range in meters'
                                        unit=' m'
                                    />
                                    <InformationLine
                                        label='Signal Range:'
                                        vehicle={tank.default_profile?.radio?.signal_range}
                                        tooltip='Maximum signal range in meters'
                                        unit=' m'
                                    />
                                </Box>
                            </Collapse>
                        )}
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            marginLeft: '2rem',
                            marginTop: '1rem'
                        }}
                    >
                        <ToggleButton
                            IconComponent={SlPeople}
                            labelOn='Hide Crew'
                            labelOff='Show Crew'
                            onClick={() => handleToggleExpand('crew')}
                            reference={expand.crew}
                        />
                        {tank && (
                            <Collapse
                                in={expand.crew}
                                timeout={400}
                                unmountOnExit
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isColumn ? 'column' : 'row',
                                        flexWrap: 'wrap',
                                        gap: '1rem',
                                        marginLeft: '2rem',
                                        marginTop: '1rem',
                                        overflow: 'hidden',
                                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
                                        width: 'auto',
                                        maxWidth: isColumn ? '100%' : '50rem',
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
                        )}
                    </Box>
                </Paper>
            </>
        )
    }


    // Tank Purchase Form Render / Backdrop Render 
    const renderPurchaseForm = () => {
        return (
            <Modal
                open = { purchaseOpen }
                onClose = { handleTogglePurchaseClose }
                aria-labeledby = 'purchase-modal'
                aria-describedby = 'purchase-form-description' 
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1
                    }}
                >
                    <PurchaseForm
                        information={tank}
                        onClose={handleTogglePurchaseClose}
                    />
                </Box>
            </Modal>
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
                {renderPurchaseForm()}
            </Box>

        </>
    )

}

export default Tank;