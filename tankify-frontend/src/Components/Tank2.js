// Tank Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Backdrop, Box, Button, CardMedia, Collapse, FormControlLabel, Grid2, Grow, Icon, Paper, Switch, Tooltip, Typography } from '@mui/material';
import { GrMoney } from "react-icons/gr";
import { LiaCrosshairsSolid } from "react-icons/lia";
import { GiChemicalTank, GiGreatWarTank } from 'react-icons/gi';
import { MdOutlineExpandCircleDown, MdRemoveRedEye } from 'react-icons/md';
import { SlPeople } from 'react-icons/sl';
import { FaCodeCompare, FaRegKeyboard } from 'react-icons/fa6';
import { PiStackFill } from 'react-icons/pi';
import { FaNewspaper } from 'react-icons/fa';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import TorchImageWithSparks from './TorchImageWithSparks';
import InformationLine from './InformationLine';
import PurchaseForm from './PurchaseForm.js';


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext.js';


// Tank Component 
function Tank2() {

    const { user } = useUser();
    const { tank_id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isColumn, setIsColumn] = useState(false);
    const [ compareButtonHover, setCompareButtonHover ] = useState( false );
    const [purchaseOpen, setPurchaseOpen] = useState(false);
    const IconComponent = isColumn ? FaNewspaper : PiStackFill;
    const buttonText = isColumn ? 'Inline Information' : 'Stack Information';
    const [tank, setTank] = useState([]);
    const [expand, setExpand] = useState({
        firepower: false,
        survivability: false,
        mobility: false,
        spotting: false,
        crew: false,
        description: true
    });

    useEffect(() => {
        const fetchTankData = async () => {
            try {
                const response = await apiClient.get(`/tanks/${tank_id}`)
                setTank(response.data.data);
            }
            catch (error) {
                console.error('Error fetching tank information');
            }
        }
        fetchTankData();
    }, [tank_id]);
    
    const handleTogglePurchaseOpen = () => {
        if (user) {
            setPurchaseOpen(true);
        }
        else {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            console.log(localStorage.getItem('redirectAfterLogin'));
            navigate('/user/login');
        }
    }
    
    const handleCompareButtonHover = () => { 
        setCompareButtonHover(( previous ) => !previous );
    }
    
    const handleTogglePurchaseClose = () => {
        setPurchaseOpen(false);
    }

    const handleToggleIsColumn = () => {
        setIsColumn((previous) => !previous);
    }

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

    const fixNumber = (number) => Number(number).toLocaleString();
    const areAllExpanded = Object.values(expand).every(Boolean);


    // Tank Image / Purchase Render 
    const renderTankImageContainer = () => { 
        return( 
            
        )
    }


    // Tank Component Render 
    return( 
        <Box 
        sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
        > 
        
        </Box>
    )



    // return (
    //     <Box
    //         sx={{
    //             alignItems: 'center',
    //             display: 'flex',
    //             flexDirection: 'column',
    //             justifyContent: 'center'
    //         }}
    //     >
    //         <Paper
    //             elevation={4}
    //             style={{
    //                 backgroundColor: '#0d0d0d',
    //                 borderRadius: '1rem',
    //                 color: '#fafafa',
    //                 marginTop: '8rem',
    //                 marginBottom: '2rem',
    //                 textAlign: 'center',
    //                 width: '60rem'
    //             }}
    //         >
    //             {tank && (
    //                 <>
    //                     <Box
    //                         sx={{
    //                             alignItems: 'center',
    //                             display: 'flex',
    //                             flexDirection: 'column',
    //                             justifyContent: 'center'
    //                         }}
    //                     >
    //                         <Tooltip
    //                             arrow
    //                             title="Vehicle"
    //                             placement="left-start"
    //                             slotProps={{
    //                                 popper: {
    //                                     modifiers: [
    //                                         {
    //                                             name: 'offset',
    //                                             options: {
    //                                                 offset: [20, -2],
    //                                             },
    //                                         },
    //                                     ],
    //                                 },
    //                             }}
    //                         >

    //                             <Typography
    //                                 variant='h2'
    //                                 sx={{
    //                                     color: '#ab003c',
    //                                     display: 'inline-block',
    //                                     marginTop: '1rem',
    //                                     marginBottom: '.5rem',
    //                                     position: 'relative'
    //                                 }}
    //                             >
    //                                 {tank.name}
    //                             </Typography>
    //                         </Tooltip>
    //                     </Box>
    //                     <Box
    //                         sx={{
    //                             position: 'relative',
    //                             display: 'inline-block',
    //                             width: '50rem',
    //                             height: '23rem',
    //                             marginTop: '.5rem',
    //                             marginBottom: '9rem',
    //                         }}
    //                     >
    //                         <Box
    //                             sx={{
    //                                 position: 'absolute',
    //                                 top: 0,
    //                                 left: -46,
    //                                 zIndex: 0
    //                             }}
    //                         >
    //                             <TorchImageWithSparks src={tank.nation_flag_hd} />
    //                         </Box>

    //                         <CardMedia
    //                             component='img'
    //                             image={tank.image}
    //                             alt={`${tank.name}`}
    //                             sx={{
    //                                 position: 'absolute',
    //                                 top: '70%',
    //                                 left: '50%',
    //                                 transform: 'translate(-50%, -50%)',
    //                                 zIndex: 1,
    //                                 width: '23rem',
    //                             }}
    //                         />
    //                     </Box>
    //                     <Box
    //                         sx={{
    //                             display: 'flex',
    //                             flexDirection: 'row',
    //                             justifyContent: 'space-between',
    //                             alignItems: 'center',
    //                             marginBottom: '1rem',
    //                             width: '57rem',
    //                         }}
    //                     >
    //                         <Box
    //                             sx={{
    //                                 display: 'flex',
    //                                 justifyContent: 'flex-start',
    //                                 flex: 1,
    //                                 marginLeft: '2rem'
    //                             }}
    //                         >
    //                             <Button
    //                                 onClick={handleToggleAll}
    //                                 variant="filled"
    //                                 sx={{
    //                                     display: 'flex',
    //                                     alignItems: 'center',
    //                                     color: '#900C3F',
    //                                     backgroundColor: '#161616',
    //                                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                                     fontStyle: 'bold',
    //                                     fontSize: '1rem',
    //                                     '&:hover': {
    //                                         backgroundColor: '#ab003c',
    //                                         color: '#fafafa',
    //                                     },
    //                                 }}
    //                             >
    //                                 <MdOutlineExpandCircleDown
    //                                     fontSize="1.5rem"
    //                                     style={{
    //                                         marginLeft: '.2rem',
    //                                         marginRight: '.5rem',
    //                                         position: 'relative',
    //                                         transition: 'color 0.3s ease',
    //                                         transform: areAllExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    //                                     }}
    //                                 />
    //                                 {areAllExpanded ? 'Hide All' : 'Show All'}
    //                             </Button>
    //                         </Box>

    //                         <Box
    //                             sx={{
    //                                 display: 'flex',
    //                                 justifyContent: 'center',
    //                                 gap: '1rem',
    //                                 flex: 1
    //                             }}
    //                         >
    //                             <Button
    //                                 onMouseEnter = { handleCompareButtonHover }
    //                                 onMouseLeave = { handleCompareButtonHover }
    //                                 variant="filled"
    //                                 sx={{
    //                                     display: 'flex',
    //                                     alignItems: 'center',
    //                                     color: '#900C3F',
    //                                     backgroundColor: '#161616',
    //                                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                                     fontStyle: 'bold',
    //                                     fontSize: '1rem',
    //                                     width: compareButtonHover ? '16rem' : '10rem',
    //                                     transition: 'background-color 0.3s ease, color 0.3s ease',
    //                                     '&:hover': {
    //                                         backgroundColor: '#ab003c',
    //                                         color: '#fafafa',
    //                                     },
    //                                     '&:hover .compare-icon': {
    //                                         transform: 'rotate( 180deg )',
    //                                         color: '#fafafa'
    //                                     }
    //                                 }}
    //                             >
    //                                 <FaCodeCompare
    //                                     fontSize="1.5rem"
    //                                     className='compare-icon'
    //                                     style={{
    //                                         marginRight: '.5rem',
    //                                         transition: 'transform 0.3s ease, color 0.1s ease'
    //                                     }}
    //                                 />
    //                                 { compareButtonHover ? 'Add to Comparison List' : 'Compare' }
    //                             </Button>
    //                             <Button
    //                                 onClick={handleTogglePurchaseOpen}
    //                                 variant="filled"
    //                                 sx={{
    //                                     display: 'flex',
    //                                     alignItems: 'center',
    //                                     color: '#900C3F',
    //                                     backgroundColor: '#161616',
    //                                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                                     fontStyle: 'bold',
    //                                     fontSize: '1rem',
    //                                     transition: 'width 0.3s ease, background-color 0.3s ease, color 0.3s ease',
    //                                     width: '10rem',
    //                                     position: 'relative',
    //                                     overflow: 'hidden',
    //                                     '&:hover': {
    //                                         backgroundColor: '#ab003c',
    //                                         color: '#fafafa',
    //                                         width: '18rem',
    //                                     },
    //                                     '& .default-text': {
    //                                         opacity: 1,
    //                                         transition: 'opacity 0.2s ease',
    //                                         transitionDelay: '0.1s',
    //                                     },
    //                                     '& .hover-text': {
    //                                         position: 'absolute',
    //                                         opacity: 0,
    //                                         whiteSpace: 'nowrap',
    //                                         transition: 'opacity 0.2s ease',
    //                                         transitionDelay: '0.2s',
    //                                     },
    //                                     '&:hover .default-text': {
    //                                         opacity: 0,
    //                                         transitionDelay: '0s',
    //                                     },
    //                                     '&:hover .hover-text': {
    //                                         opacity: 1,
    //                                         transitionDelay: '0.2s',
    //                                     },
    //                                     '&:not(:hover) .default-text': {
    //                                         opacity: 1,
    //                                         transitionDelay: '0.2s',
    //                                     },
    //                                     '&:not(:hover) .hover-text': {
    //                                         opacity: 0,
    //                                         transitionDelay: '0s',
    //                                     },
    //                                 }}
    //                             >
    //                                 <Box
    //                                     className="default-text"
    //                                     sx={{
    //                                         display: 'flex',
    //                                         alignItems: 'center'
    //                                     }}
    //                                 >
    //                                     <GrMoney
    //                                         fontSize="1.4rem"
    //                                         style={{
    //                                             marginRight: '0.5rem',
    //                                             position: 'relative',
    //                                             top: '0.3rem'
    //                                         }}
    //                                     />
    //                                     Purchase
    //                                 </Box>

    //                                 <Box
    //                                     className="hover-text"
    //                                     sx={{
    //                                         position: 'absolute',
    //                                         opacity: 0,
    //                                         transition: 'opacity 0.2s ease'
    //                                     }}
    //                                 >
    //                                     <GrMoney
    //                                         fontSize="1.4rem"
    //                                         style={{
    //                                             color: '#fafafa',
    //                                             marginRight: '0.5rem',
    //                                             position: 'relative',
    //                                             top: '0.3rem'
    //                                         }}
    //                                     />
    //                                     Purchase for
    //                                     <span style={{ color: '#fafafa' }}> {fixNumber(tank.price)} Credits </span>
    //                                 </Box>
    //                             </Button>
    //                         </Box>
    //                     </Box>

    //                 </>
    //             )}
    //         </Paper>
    //         <Paper
    //             elevation={4}
    //             style={{
    //                 backgroundColor: '#0d0d0d',
    //                 borderRadius: '1rem',
    //                 color: '#fafafa',
    //                 marginTop: '2rem',
    //                 marginBottom: '8rem',
    //                 textAlign: 'center',
    //                 width: '60rem'
    //             }}
    //         >
    //             <Box
    //                 sx={{
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     alignItems: 'flex-start',
    //                     marginLeft: '2rem',
    //                     marginBottom: '1rem',
    //                     marginTop: '1rem'
    //                 }}
    //             >
    //                 <Box
    //                     sx={{
    //                         display: 'flex',
    //                         flexDirection: 'row',
    //                         alignItems: 'stretch',
    //                         justifyContent: 'flex-start',
    //                         gap: '0.5rem',
    //                     }}
    //                 >
    //                     <Button
    //                         onClick={() => handleToggleExpand('description')}
    //                         variant='filled'
    //                         sx={{
    //                             display: 'flex',
    //                             alignItems: 'center',
    //                             color: '#900C3F',
    //                             backgroundColor: '#161616',
    //                             boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                             fontStyle: 'bold',
    //                             fontSize: '1rem',
    //                             '&:hover': {
    //                                 backgroundColor: '#ab003c',
    //                                 color: '#fafafa',
    //                             },
    //                         }}
    //                     >
    //                         <FaRegKeyboard fontSize='1.5rem' style={{ marginRight: '.5rem' }} />
    //                         {expand.description ? 'Hide Description' : 'Show Description'}
    //                     </Button>
    //                     <Button
    //                         onClick={handleToggleIsColumn}
    //                         variant='filled'
    //                         sx={{
    //                             display: 'flex',
    //                             alignItems: 'center',
    //                             color: '#900C3F',
    //                             backgroundColor: '#161616',
    //                             boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                             fontStyle: 'bold',
    //                             fontSize: '1rem',
    //                             '&:hover': {
    //                                 backgroundColor: '#ab003c',
    //                                 color: '#fafafa',
    //                             },
    //                         }}
    //                     >
    //                         <IconComponent
    //                             fontSize='1.5rem'
    //                             style={{
    //                                 marginRight: '.5rem'
    //                             }}
    //                         />
    //                         {buttonText}
    //                     </Button>
    //                 </Box>
    //                 <Collapse
    //                     in={expand.description}
    //                     timeout='auto'
    //                     unmountOnExit
    //                 >
    //                     <Tooltip
    //                         arrow
    //                         title='Vehicle Description'
    //                         placement="left-start"
    //                         slotProps={{
    //                             popper: {
    //                                 modifiers: [
    //                                     {
    //                                         name: 'offset',
    //                                         options: {
    //                                             offset: [4, -2],
    //                                         },
    //                                     },
    //                                 ],
    //                             },
    //                         }}
    //                     >
    //                         <Typography
    //                             variant='h6'
    //                             sx={{
    //                                 marginLeft: '1rem',
    //                                 marginRight: '1rem',
    //                                 marginTop: '.5rem',
    //                                 textAlign: 'start'
    //                             }}
    //                         >
    //                             {tank.description}
    //                         </Typography>
    //                     </Tooltip>
    //                 </Collapse>
    //             </Box>
    //             <Box
    //                 sx={{
    //                     alignItems: 'flex-start',
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     justifyContent: 'start',
    //                     marginLeft: '2rem',
    //                     marginBottom: '1rem',
    //                 }}
    //             >
    //                 <Button
    //                     onClick={() => handleToggleExpand('firepower')}
    //                     variant='filled'
    //                     sx={{
    //                         display: 'flex',
    //                         alignItems: 'center',
    //                         color: '#900C3F',
    //                         backgroundColor: '#161616',
    //                         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                         fontStyle: 'bold',
    //                         fontSize: '1rem',
    //                         '&:hover': {
    //                             backgroundColor: '#ab003c',
    //                             color: '#fafafa',
    //                         },
    //                     }}
    //                 >
    //                     <LiaCrosshairsSolid
    //                         fontSize="1.5rem"
    //                         style={{
    //                             marginLeft: '.2rem',
    //                             marginRight: '.5rem',
    //                             position: 'relative',
    //                             transition: 'color 0.3s ease',
    //                         }}
    //                     />
    //                     {expand.firepower ? 'Hide Firepower' : 'Show Firepower'}
    //                 </Button>
    //                 <Collapse
    //                     in={expand.firepower}
    //                     timeout='auto'
    //                     unmountOnExit
    //                 >
    //                     <Grow
    //                         in={true}
    //                         key={isColumn ? 'row-layout' : 'column-layout'}
    //                         style={{ transformOrigin: isColumn ? 'left center' : 'top center' }}
    //                         timeout={800}
    //                     >
    //                         <Box
    //                             sx={{
    //                                 display: 'flex',
    //                                 flexDirection: isColumn ? 'column' : 'row',
    //                                 flexWrap: 'wrap',
    //                                 gap: '1rem',
    //                                 marginTop: '1rem',
    //                                 marginLeft: '2rem',
    //                                 marginRight: '2rem',
    //                                 transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
    //                             }}
    //                         >
    //                             <InformationLine
    //                                 label='Aim Time:'
    //                                 value={tank.default_profile?.gun?.['aim_time']}
    //                                 tooltip='Aim time in seconds'
    //                                 unit='s'
    //                             />
    //                             <InformationLine
    //                                 label='Caliber:'
    //                                 value={tank.default_profile?.gun?.['caliber']}
    //                                 tooltip='Caliber of gun in millimeters'
    //                                 unit='mm'
    //                             />
    //                             <InformationLine
    //                                 label='Dispersion:'
    //                                 value={tank.default_profile?.gun?.['dispersion']}
    //                                 tooltip='Dispersion of gun up to 100 meters'
    //                                 unit=' /100m'
    //                             />
    //                             <InformationLine
    //                                 label='Fire Rate:'
    //                                 value={tank.default_profile?.gun?.['fire_rate']}
    //                                 tooltip='Rate of fire in rounds per minute'
    //                                 unit='rpm'
    //                             />
    //                             <InformationLine
    //                                 label='Gun Name:'
    //                                 value={tank.default_profile?.gun?.['name']}
    //                                 tooltip='Gun Model Name'
    //                             />
    //                             <InformationLine
    //                                 label='Gun Weight:'
    //                                 value={fixNumber(tank.default_profile?.gun?.['weight'])}
    //                                 tooltip='Gun Model Weight'
    //                                 unit=' kg'
    //                             />
    //                         </Box>
    //                     </Grow>
    //                 </Collapse>
    //             </Box>
    //             <Box
    //                 sx={{
    //                     alignItems: 'flex-start',
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     justifyContent: 'start',
    //                     marginLeft: '2rem',
    //                     marginBottom: '1rem'
    //                 }}
    //             >
    //                 <Button
    //                     onClick={() => handleToggleExpand('survivability')}
    //                     variant='filled'
    //                     sx={{
    //                         display: 'flex',
    //                         alignItems: 'center',
    //                         color: '#900C3F',
    //                         backgroundColor: '#161616',
    //                         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                         fontStyle: 'bold',
    //                         fontSize: '1rem',
    //                         '&:hover': {
    //                             backgroundColor: '#ab003c',
    //                             color: '#fafafa',
    //                         },
    //                     }}
    //                 >
    //                     <GiChemicalTank
    //                         fontSize="2rem"
    //                         style={{
    //                             marginRight: '.5rem',
    //                             transition: 'color 0.3s ease',
    //                         }}
    //                     />
    //                     {expand.survivability ? 'Hide Survivability' : 'Show Survivability'}
    //                 </Button>
    //                 <Collapse in={expand.survivability} timeout='auto' unmountOnExit>
    //                     <Grow
    //                         in={true}
    //                         key={isColumn ? 'row-layout' : 'column-layout'}
    //                         style={{ transformOrigin: isColumn ? 'left center' : 'top center' }}
    //                         timeout={800}
    //                     >
    //                         <Box
    //                             sx={{
    //                                 display: 'flex',
    //                                 flexDirection: isColumn ? 'column' : 'row',
    //                                 flexWrap: 'wrap',
    //                                 gap: '1rem',
    //                                 marginTop: '1rem',
    //                                 marginLeft: '2rem',
    //                                 marginRight: '2rem',
    //                                 transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
    //                             }}
    //                         >
    //                             <InformationLine
    //                                 label='Tier:'
    //                                 value={tank.tier}
    //                                 tooltip='Vehicle Tier'
    //                             />
    //                             <InformationLine
    //                                 label='HP:'
    //                                 value={tank.default_profile?.hp}
    //                                 tooltip='Vehicle HP'
    //                             />
    //                             <InformationLine
    //                                 label='Hull Armor:'
    //                                 value={`${tank.default_profile?.armor?.hull?.['front']}/${tank.default_profile?.armor?.hull?.['sides']}/${tank.default_profile?.armor?.hull?.['rear']}`}
    //                                 tooltip='Vehicle Front / Side / Rear Hull Armor in millimeters'
    //                             />
    //                             {tank.default_profile?.armor?.turret && (
    //                                 <InformationLine
    //                                     label='Turret Armor:'
    //                                     value={`${tank.default_profile?.armor?.turret?.['front']}/${tank.default_profile?.armor?.turret?.['sides']}/${tank.default_profile?.armor?.turret?.['rear']}`}
    //                                     tooltip='Vehicle Front / Side / Rear Turret Armor in millimeters'
    //                                 />
    //                             )}
    //                             <InformationLine
    //                                 label='Max Ammo:'
    //                                 value={tank.default_profile?.max_ammo}
    //                                 tooltip='Vehicle max ammo capacity'
    //                             />
    //                         </Box>
    //                     </Grow>
    //                 </Collapse>
    //             </Box>
    //             <Box
    //                 sx={{
    //                     alignItems: 'flex-start',
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     justifyContent: 'start',
    //                     marginLeft: '2rem',
    //                     marginBottom: '1rem'
    //                 }}
    //             >
    //                 <Button
    //                     onClick={() => handleToggleExpand('mobility')}
    //                     variant='filled'
    //                     sx={{
    //                         display: 'flex',
    //                         alignItems: 'center',
    //                         color: '#900C3F',
    //                         backgroundColor: '#161616',
    //                         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                         fontStyle: 'bold',
    //                         fontSize: '1rem',
    //                         '&:hover': {
    //                             backgroundColor: '#ab003c',
    //                             color: '#fafafa',
    //                         },
    //                     }}
    //                 >
    //                     <GiGreatWarTank
    //                         fontSize="2rem"
    //                         style={{
    //                             marginRight: '.5rem',
    //                             transition: 'color 0.3s ease',
    //                         }}
    //                     />
    //                     {expand.mobility ? 'Hide Mobility' : 'Show Mobility'}
    //                 </Button>
    //                 <Collapse
    //                     in={expand.mobility}
    //                     timeout='auto'
    //                     unmountOnExit
    //                 >
    //                     <Grow
    //                         in={true}
    //                         key={isColumn ? 'row-layout' : 'column-layout'}
    //                         style={{ transformOrigin: isColumn ? 'left center' : 'top center' }}
    //                         timeout={800}
    //                     >
    //                         <Box
    //                             sx={{
    //                                 display: 'flex',
    //                                 flexDirection: isColumn ? 'column' : 'row',
    //                                 flexWrap: 'wrap',
    //                                 gap: '1rem',
    //                                 marginTop: '1rem',
    //                                 marginLeft: '2rem',
    //                                 marginRight: '2rem',
    //                                 transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
    //                             }}
    //                         >
    //                             <InformationLine
    //                                 label='Top Speed Forward:'
    //                                 value={tank.default_profile?.speed_forward}
    //                                 tooltip='Top vehicle speed forward in kilometers per hour'
    //                                 unit=' km/h'
    //                             />
    //                             <InformationLine
    //                                 label='Top Speed Reverse:'
    //                                 value={tank.default_profile?.speed_backward}
    //                                 tooltip='Top vehicle reverse speed in kilometers per hour'
    //                                 unit=' km/h'
    //                             />
    //                             <InformationLine
    //                                 label='Traverse Speed:'
    //                                 value={tank.default_profile?.suspension?.['traverse_speed']}
    //                                 tooltip='Top vehicle traverse speed in degrees per second'
    //                                 unit=' deg/s'
    //                             />
    //                             <InformationLine
    //                                 label='Max Weight:'
    //                                 value={fixNumber(tank.default_profile?.max_weight)}
    //                                 tooltip='Maximum vehicle weight'
    //                                 unit=' tons'
    //                             />
    //                         </Box>
    //                     </Grow>
    //                 </Collapse>
    //             </Box>
    //             <Box
    //                 sx={{
    //                     alignItems: 'flex-start',
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     justifyContent: 'start',
    //                     marginLeft: '2rem',
    //                     marginBottom: '1rem'
    //                 }}
    //             >
    //                 <Button
    //                     onClick={() => handleToggleExpand('spotting')}
    //                     variant='filled'
    //                     sx={{
    //                         display: 'flex',
    //                         alignItems: 'center',
    //                         color: '#900C3F',
    //                         backgroundColor: '#161616',
    //                         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                         fontStyle: 'bold',
    //                         fontSize: '1rem',
    //                         '&:hover': {
    //                             backgroundColor: '#ab003c',
    //                             color: '#fafafa',
    //                         },
    //                     }}
    //                 >
    //                     <MdRemoveRedEye
    //                         fontSize="2rem"
    //                         style={{
    //                             marginRight: '.5rem',
    //                             transition: 'color 0.3s ease',
    //                         }}
    //                     />
    //                     {expand.spotting ? 'Hide Spotting' : 'Show Spotting'}
    //                 </Button>
    //                 <Collapse
    //                     in={expand.spotting}
    //                     timeout='auto'
    //                     unmountOnExit
    //                 >
    //                     <Grow
    //                         in={true}
    //                         key={isColumn ? 'row-layout' : 'column-layout'}
    //                         style={{ transformOrigin: isColumn ? 'left center' : 'top center' }}
    //                         timeout={800}
    //                     >
    //                         <Box
    //                             sx={{
    //                                 display: 'flex',
    //                                 flexDirection: isColumn ? 'column' : 'row',
    //                                 flexWrap: 'wrap',
    //                                 gap: '1rem',
    //                                 marginTop: '1rem',
    //                                 marginLeft: '2rem',
    //                                 marginRight: '2rem',
    //                                 transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
    //                             }}
    //                         >
    //                             <InformationLine
    //                                 label='View Range'
    //                                 value={tank.default_profile?.turret?.view_range}
    //                                 tooltip='Maximum view range in meters'
    //                                 unit=' m'
    //                             />
    //                             <InformationLine
    //                                 label='Signal Range'
    //                                 value={tank.default_profile?.radio?.signal_range}
    //                                 tooltip='Maximum signal range in meters'
    //                                 unit=' m'
    //                             />
    //                         </Box>
    //                     </Grow>
    //                 </Collapse>
    //             </Box>
    //             <Box
    //                 sx={{
    //                     alignItems: 'flex-start',
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     justifyContent: 'start',
    //                     marginLeft: '2rem',
    //                     marginBottom: '2rem'
    //                 }}
    //             >
    //                 <Button
    //                     onClick={() => handleToggleExpand('crew')}
    //                     variant='filled'
    //                     sx={{
    //                         display: 'flex',
    //                         alignItems: 'center',
    //                         color: '#900C3F',
    //                         backgroundColor: '#161616',
    //                         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
    //                         fontStyle: 'bold',
    //                         fontSize: '1rem',
    //                         '&:hover': {
    //                             backgroundColor: '#ab003c',
    //                             color: '#fafafa',
    //                         },
    //                     }}
    //                 >
    //                     <SlPeople
    //                         fontSize="2rem"
    //                         style={{
    //                             marginRight: '.5rem',
    //                             transition: 'color 0.3s ease',
    //                         }}
    //                     />
    //                     {expand.crew ? 'Hide Crew' : 'Show Crew'}
    //                 </Button>
    //                 <Collapse
    //                     in={expand.crew}
    //                     timeout='auto'
    //                     unmountOnExit
    //                 >
    //                     <Box
    //                         sx={{
    //                             display: 'flex',
    //                             flexDirection: 'row',
    //                             flexWrap: 'wrap',
    //                             gap: '1rem',
    //                             marginTop: '1rem',
    //                             marginLeft: '2rem',
    //                             marginRight: '2rem',
    //                             transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-in-out',
    //                         }}
    //                     >
    //                         <InformationLine
    //                             label='Crew Members'
    //                             value={tank.crew?.length}
    //                             tooltip='Total number of crew members'
    //                         />
    //                     </Box>
    //                     <Box
    //                         sx={{
    //                             display: 'flex',
    //                             justifyContent: 'start',
    //                             gap: '1rem',
    //                             marginTop: '1rem',
    //                             marginRight: '6rem',
    //                             marginLeft: '2rem',
    //                             marginBottom: '2rem'
    //                         }}
    //                     >
    //                         {tank.crew?.map((crewMember, index) => (
    //                             <Box
    //                                 key={`crew-member-${index}`}
    //                                 sx={{
    //                                     textAlign: 'start',
    //                                 }}
    //                             >
    //                                 <Tooltip
    //                                     arrow
    //                                     title={`Vehicle ${crewMember.member_id}`}
    //                                     placement="bottom"
    //                                     slotProps={{
    //                                         popper: {
    //                                             modifiers: [
    //                                                 {
    //                                                     name: 'offset',
    //                                                     options: {
    //                                                         offset: [0, 20],
    //                                                     },
    //                                                 },
    //                                             ],
    //                                         },
    //                                     }}
    //                                 >
    //                                     <img
    //                                         src={`https://na-wotp.wgcdn.co/static/6.2.8_cfaf5d/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/${tank.nation.toLowerCase()}-face-${index + 1}.png`}
    //                                         alt={crewMember.member_id}
    //                                         style={{
    //                                             width: '6rem',
    //                                             height: '5rem',
    //                                         }}
    //                                     />
    //                                 </Tooltip>
    //                                 <Typography
    //                                     variant="caption"
    //                                     sx={{
    //                                         marginTop: '0.5rem',
    //                                         color: '#fafafa',
    //                                     }}
    //                                 >
    //                                     {crewMember.member_id.toUpperCase()}
    //                                 </Typography>
    //                             </Box>
    //                         ))}
    //                     </Box>
    //                 </Collapse>
    //             </Box>
    //         </Paper>
    //         <Box
    //             sx={{
    //                 alignItems: 'center',
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 justifyContent: 'center'
    //             }}
    //         >
    //             <Backdrop
    //                 open={purchaseOpen}
    //                 sx={{
    //                     backgroundColor: 'rgba(0, 0, 0, 0.85)',
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     zIndex: 1
    //                 }}
    //             >
    //                 {purchaseOpen && (
    //                     <PurchaseForm
    //                         information={tank}
    //                         onClose={handleTogglePurchaseClose}
    //                     />
    //                 )}
    //             </Backdrop>
    //         </Box>
    //     </Box>
    // )
}

export default Tank2;