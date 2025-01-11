// // Carousel Component Implementation 


// // Dependencies
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Card, CardMedia, CardContent, IconButton, Menu, MenuItem, Tooltip, Typography, TextField } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';
// import ClassIcon from '@mui/icons-material/Class';
// import FlagIcon from '@mui/icons-material/Flag';
// import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
// import { keyframes } from '@mui/system';


// // Components & Necessary Files
// import apiClient from '../api/apiClient';


// // Carousel Component
// function Carousel() {

//     const fadeIn = keyframes`
//     0% {
//       opacity: 0;
//       transform: translateY(10px); /* Slight upward motion */
//     }
//     100% {
//       opacity: 1;
//       transform: translateY(0); /* Settle into position */
//     }
//   `;

//     const navigate = useNavigate();
//     const [page, setPage] = useState(1);
//     const [isLoading, setIsLoading] = useState(false);
//     const [moreTanks, setMoreTanks] = useState(true);
//     const [tanks, setTanks] = useState([]);
//     const [filters, setFilters] = useState({ search: '', type: '', tier: '', nation: '' });
//     const [anchorEl, setAnchorEl] = useState({ tier: null, type: null, nation: null });
//     const tiers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
//     const types = ['Heavy Tank', 'Medium Tank', 'Light Tank', 'AT-SPG', 'SPG'];
//     const nations = ['USSR', 'Germany', 'USA', 'China', 'France', 'UK', 'Japan', 'Czech', 'Sweden', 'Poland', 'Italy'];
//     const tankNames = ['T-62A', 'E 100', 'T-10', 'IS-7', 'Obj 140'];
//     const [autoTypeText, setAutoTypeText] = useState('');
//     const [autoTypeIndex, setAutoTypeIndex] = useState(0);
//     const [currentCharIndex, setCurrentCharIndex] = useState(0);
//     const isAutotyping = useRef(false);

//     const fetchTanks = async (currentPage = 1, currentFilters = filters) => {
//         setIsLoading(true);
//         try {
//             const { search, type, tier, nation } = currentFilters;
//             const response = await apiClient.get(
//                 `/tanks/all?search=${ search || '' }&page=${ currentPage }&per_page=20&type=${ type || '' }&tier=${ tier || '' }&nation=${ nation || '' }`
//             );
//             console.log( response.data.data );
//             const apiTanks = response.data.data.flat();
//             if (currentPage === 1) {
//                 setTanks(apiTanks);
//             } else {
//                 setTanks((previous) => [...previous, ...apiTanks]);
//             }
//             if (response.data.data.length === 0 || response.data.total_pages <= currentPage) {
//                 setMoreTanks(false);
//             } else {
//                 setPage(currentPage + 1);
//             }
//         } catch (error) {
//             console.error('Error retrieving tanks:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTanks(1, filters);
//     }, [ filters ]);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (
//                 window.innerHeight + document.documentElement.scrollTop + 1 >=
//                 document.documentElement.scrollHeight
//             ) {
//                 if (moreTanks && !isLoading) {
//                     fetchTanks(page, filters);
//                 }
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [page, isLoading, moreTanks, filters]);

//     useEffect(() => {
//         /**
//          * Stop autotyping if the user typed something.
//          * (filters.search is not empty and we are still autotyping).
//          */
//         if (filters.search !== '' && isAutotyping.current) {
//           isAutotyping.current = false;
//           setAutoTypeText('');
//           setCurrentCharIndex(0);
//           return;
//         }
    
//         /**
//          * If search is empty and we are NOT autotyping, let's start.
//          */
//         if (filters.search === '' && !isAutotyping.current) {
//           isAutotyping.current = true;
//           setAutoTypeText('');
//           setCurrentCharIndex(0);
//           return; // Let the effect re-run
//         }
    
//         /**
//          * If we *are* autotyping, type next character
//          */
//         if (isAutotyping.current && filters.search === '') {
//           const tankName = tankNames[autoTypeIndex];
    
//           if (currentCharIndex < tankName.length) {
//             // Type the next character after a delay
//             const timer = setTimeout(() => {
//               setAutoTypeText((prev) => prev + tankName[currentCharIndex]);
//               setCurrentCharIndex((prev) => prev + 1);
//             }, 200);
    
//             return () => clearTimeout(timer);
//           } else {
//             // Finished typing the entire name
//             setFilters((prev) => ({ ...prev, search: tankName }));
//             setAutoTypeIndex((prev) => (prev + 1) % tankNames.length);
//             setCurrentCharIndex(0);
//             setAutoTypeText('');
//             isAutotyping.current = false;
//           }
//         }
//       }, [filters.search, autoTypeIndex, currentCharIndex, tankNames]);
    
//       // ----------------------------------
//       // Handle Search Focus
//       // ----------------------------------
//       const handleSearchFocus = () => {
//         if (isAutotyping.current) {
//           isAutotyping.current = false;
//           setAutoTypeText('');
//           setCurrentCharIndex(0);
//         }
//       };
    
//     const handleFilterChange = (filterType, value) => {
//         const updatedFilters = {
//             ...filters,
//             [filterType]: filters[filterType] === value ? '' : value,
//         };

//         setFilters(updatedFilters);
//         setPage(1); 
//         setMoreTanks(true); 
//         if ( filterType === 'search' ){
//             fetchTanks( 1, updatedFilters )
//         }
//         handleMenuClose( filterType );
//     };

//     const handleMenuOpen = (event, type) => {
//         setAnchorEl((prev) => ({ ...prev, [type]: event.currentTarget }));
//     };

//     const handleMenuClose = (type) => {
//         setAnchorEl((prev) => ({ ...prev, [type]: null }));
//     };

//     const fixCurrency = (price) => {
//         return Number(price).toLocaleString();
//     };

//     const filteredTanks = tanks.filter((tank) => {
//         const matchesSearch = tank.name.toLowerCase().includes(filters.search.toLowerCase());
//         return matchesSearch;
//     });
    
//     return (
//         <div
//             className='carousel-container'
//             style={{
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'column',
//             }}
//         >
//             <Typography
//                 variant='h3'
//                 sx={{
//                     marginBottom: '2rem',
//                 }}
//             >
//                 Tank Inventory
//             </Typography>
//             <Box
//                 sx={{
//                     backgroundColor: '#161616',
//                     display: 'flex',
//                     alignItems: 'center',
//                     borderRadius: '1rem',
//                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
//                     marginBottom: '4rem',
//                     width: '35rem',
//                     padding: '0.2rem'
//                 }}
//             >
//                 <TextField
//                     variant='outlined'
//                     placeholder='Search Tank by Name'
//                     value={ autoTypeText || filters.search }
//                     onFocus = { handleSearchFocus }
//                     onChange={ ( e ) => handleFilterChange( 'search', e.target.value ) }
//                     sx={{
//                         input: { color: '#fafafa' },
//                         '& .MuiOutlinedInput-root': {
//                             '& fieldset': {
//                                 border: 'none',
//                             },
//                         },
//                         '& .MuiInputBase-input': {
//                             color: '#fafafa',
//                             fontSize: '1.1rem'
//                         },
//                         flexGrow: 1,
//                     }}
//                 />
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-around',
//                         marginLeft: '1rem',
//                     }}
//                 >
//                     <Tooltip title='Tier Filter'>
//                         <IconButton
//                             onClick={(e) => handleMenuOpen(e, 'tier')}
//                             sx={{
//                                 boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
//                                 transition: 'box-shadow 0.3s ease',
//                                 '&:hover': {
//                                     boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
//                                 },
//                                 borderRadius: '0.5rem',
//                                 color: filters.tier ? '#ab003c' : '#fafafa',
//                             }}
//                         >
//                             <FormatListNumberedIcon sx={{ fontSize: '2.5rem' }} />
//                         </IconButton>
//                     </Tooltip>
//                     <Menu
//                         anchorEl={anchorEl.tier}
//                         open={Boolean(anchorEl.tier)}
//                         onClose={() => handleMenuClose('tier')}
//                     >
//                         {tiers.map((tier) => (
//                             <MenuItem
//                                 key={tier}
//                                 onClick={() => handleFilterChange('tier', tier)}
//                                 sx={{
//                                     color: '#fafafa',
//                                     backgroundColor: filters.tier === tier ? '#ab003c' : '#161616',
//                                     '&:hover': {
//                                         backgroundColor: '#ab003c',
//                                         color: '#fafafa'
//                                     }
//                                 }}
//                             >
//                                 {tier}
//                             </MenuItem>
//                         ))}
//                     </Menu>
//                     <Tooltip title='Type Filter'>
//                         <IconButton
//                             onClick={(e) => handleMenuOpen(e, 'type')}
//                             sx={{
//                                 boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
//                                 transition: 'box-shadow 0.3s ease',
//                                 '&:hover': {
//                                     boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
//                                 },
//                                 borderRadius: '0.5rem',
//                                 color: filters.type ? '#ab003c' : '#fafafa',
//                             }}
//                         >
//                             <ClassIcon sx={{ fontSize: '2.5rem' }} />
//                         </IconButton>
//                     </Tooltip>
//                     <Menu
//                         anchorEl={anchorEl.type}
//                         open={Boolean(anchorEl.type)}
//                         onClose={() => handleMenuClose('type')}
//                     >
//                         {types.map((type) => (
//                             <MenuItem
//                                 key={type}
//                                 onClick={() => handleFilterChange('type', type)}
//                                 sx={{
//                                     color: '#fafafa',
//                                     backgroundColor: filters.type === type ? '#ab003c' : '#161616',
//                                     '&:hover': {
//                                         backgroundColor: '#ab003c',
//                                         color: '#fafafa'
//                                     }
//                                 }}
//                             >
//                                 {type}
//                             </MenuItem>
//                         ))}
//                     </Menu>
//                     <Tooltip title='Nation Filter'>
//                         <IconButton
//                             onClick={(e) => handleMenuOpen(e, 'nation')}
//                             sx={{
//                                 boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
//                                 transition: 'box-shadow 0.3s ease',
//                                 '&:hover': {
//                                     boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
//                                 },
//                                 borderRadius: '0.5rem',
//                                 color: filters.nation ? '#ab003c' : '#fafafa',
//                             }}
//                         >
//                             <FlagIcon sx={{ fontSize: '2.5rem' }} />
//                         </IconButton>
//                     </Tooltip>
//                     <Menu
//                         anchorEl={anchorEl.nation}
//                         open={Boolean(anchorEl.nation)}
//                         onClose={() => handleMenuClose('nation')}
//                     >
//                         {nations.map((nation) => (
//                             <MenuItem
//                                 key={nation}
//                                 onClick={() => handleFilterChange('nation', nation)}
//                                 sx={{
//                                     color: '#fafafa',
//                                     backgroundColor: filters.nation === nation ? '#ab003c' : '#161616',
//                                     '&:hover': {
//                                         backgroundColor: '#ab003c',
//                                         color: '#fafafa'
//                                     }
//                                 }}
//                             >
//                                 {nation.charAt(0).toUpperCase() + nation.slice(1)}
//                             </MenuItem>
//                         ))}
//                     </Menu>
//                 </Box>
//             </Box>
//             <Box>
//                 {filteredTanks && filteredTanks.length > 0 ? (
//                     filteredTanks.map((tank, index) => (
//                         <Card
//                             key={index}
//                             onClick={() => navigate(`/tank/${tank.id}`)}
//                             sx={{
//                                 alignItems: 'center',
//                                 backgroundColor: '#161616',
//                                 borderRadius: '1rem',
//                                 display: 'flex',
//                                 margin: '2rem',
//                                 width: '38rem',
//                                 height: '8rem',
//                                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
//                                 overflow: 'visible',
//                                 position: 'relative',
//                                 animation: `${fadeIn} 1.5s ease-in-out`,
//                                 animationFillMode: 'both',
//                                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                                 cursor: 'pointer',
//                                 '&:hover': {
//                                     transform: 'scale(1.08)',
//                                     boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)',
//                                 },
//                             }}
//                         >
//                             <CardMedia
//                                 component='img'
//                                 image={tank.image}
//                                 alt={tank.name}
//                                 sx={{
//                                     flexShrink: 0,
//                                     marginLeft: '2rem',
//                                     marginTop: '1rem',
//                                     objectFit: 'cover',
//                                     height: '8rem',
//                                     width: '9rem'
//                                 }}
//                             />
//                             <CardMedia
//                                 component='img'
//                                 image={tank.nation_flag}
//                                 alt={`${tank.nation} flag`}
//                                 sx={{
//                                     flexShrink: 0,
//                                     marginLeft: '2rem',
//                                     marginRight: '1rem',
//                                     objectFit: 'cover',
//                                     maxWidth: '8rem',
//                                 }}
//                             />
//                             <CardContent>
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'space-between',
//                                         marginLeft: '-1rem',
//                                         marginBottom: '-0.5rem',
//                                     }}
//                                 >
//                                     <Typography
//                                         variant='h6'
//                                         sx={{
//                                             color: '#fafafa',
//                                             minWidth: '5rem',
//                                             marginRight: '.5rem',
//                                             overflow: 'hidden',
//                                             textAlign: 'right',
//                                             textOverflow: 'ellipsis',
//                                             whiteSpace: 'nowrap',
//                                         }}
//                                     >
//                                         Name:
//                                     </Typography>
//                                     <Typography
//                                         variant='h6'
//                                         sx={{
//                                             color: '#ab003c',
//                                             fontWeight: 'bold',
//                                             textAlign: 'left',
//                                             flexGrow: 1,
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                             maxWidth: '9rem',
//                                             marginRight: '1rem',
//                                         }}
//                                     >
//                                         {tank.name}
//                                     </Typography>
//                                 </Box>
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'space-between',
//                                         marginLeft: '-1rem',
//                                         marginBottom: '-0.5rem',
//                                     }}
//                                 >
//                                     <Typography
//                                         variant='h6'
//                                         sx={{
//                                             color: '#fafafa',
//                                             lineHeight: 0.8,
//                                             textAlign: 'right',
//                                             minWidth: '5rem',
//                                             marginRight: '.5rem',
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                         }}
//                                     >
//                                         Price:
//                                     </Typography>
//                                     <Typography
//                                         variant='h6'
//                                         sx={{
//                                             color: '#ab003c',
//                                             fontWeight: 'bold',
//                                             textAlign: 'left',
//                                             flexGrow: 1,
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                             maxWidth: '12rem',
//                                         }}
//                                     >
//                                         {fixCurrency(tank.price)}
//                                     </Typography>
//                                 </Box>
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'space-between',
//                                         marginLeft: '-1rem',
//                                         marginBottom: '-0.5rem',
//                                     }}
//                                 >
//                                     <Typography
//                                         variant='h6'
//                                         sx={{
//                                             color: '#fafafa',
//                                             textAlign: 'right',
//                                             minWidth: '5rem',
//                                             marginRight: '.5rem',
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                         }}
//                                     >
//                                         Tier:
//                                     </Typography>
//                                     <Typography
//                                         variant='h6'
//                                         sx={{
//                                             color: '#ab003c',
//                                             fontWeight: 'bold',
//                                             textAlign: 'left',
//                                             flexGrow: 1,
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                             maxWidth: '12rem',
//                                         }}
//                                     >
//                                         {tank.tier}
//                                     </Typography>
//                                 </Box>
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'space-between',
//                                         marginLeft: '-1rem',
//                                     }}
//                                 >
//                                     <Typography
//                                         variant='h6'
//                                         sx={{
//                                             color: '#fafafa',
//                                             textAlign: 'right',
//                                             minWidth: '5rem',
//                                             marginRight: '.5rem',
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                         }}
//                                     >
//                                         Nation:
//                                     </Typography>
//                                     <Typography
//                                         variant='h6'
//                                         sx={{
//                                             color: '#ab003c',
//                                             fontWeight: 'bold',
//                                             textAlign: 'left',
//                                             flexGrow: 1,
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                             maxWidth: '12rem',
//                                         }}
//                                     >
//                                         {tank.nation.length === 3 || tank.nation.length === 4
//                                             ? tank.nation.toUpperCase()
//                                             : tank.nation.charAt(0).toUpperCase() + tank.nation.slice(1)}
//                                     </Typography>
//                                 </Box>
//                             </CardContent>
//                         </Card>
//                     ))
//                 ) : (
//                     <>
//                         <Box
//                             sx={{
//                                 alignItems: 'center',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <Typography
//                                 variant='h4'
//                                 sx={{
//                                     marginBottom: '3rem',
//                                 }}
//                             >
//                                 Loading Vehicles...
//                             </Typography>
//                             <CircularProgress color='#fafafa' size='5rem' />
//                         </Box>
//                     </>
//                 )}
//             </Box>
//         </div>
//     );
// }

// export default Carousel;

// Dependencies
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  TextField,
  CircularProgress
} from '@mui/material';

import ClassIcon from '@mui/icons-material/Class';
import FlagIcon from '@mui/icons-material/Flag';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { keyframes } from '@mui/system';

import apiClient from '../api/apiClient';

function Carousel() {

  const fadeIn = keyframes`
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const navigate = useNavigate();

  // -----------------------------------------
  // 2) Tanks and Pagination
  // -----------------------------------------
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [moreTanks, setMoreTanks] = useState(true);
  const [tanks, setTanks] = useState([]);

  // -----------------------------------------
  // 3) Filters
  // -----------------------------------------
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    tier: '',
    nation: ''
  });

  // Menus
  const [anchorEl, setAnchorEl] = useState({
    tier: null,
    type: null,
    nation: null
  });
  const tiers = ['1','2','3','4','5','6','7','8','9','10'];
  const types = ['Heavy Tank','Medium Tank','Light Tank','AT-SPG','SPG'];
  const nations = ['USSR','Germany','USA','China','France','UK','Japan','Czech','Sweden','Poland','Italy'];

  // -----------------------------------------
  // 4) Autotyping State + Timer
  // -----------------------------------------
  const tankNames = ['T-62A', 'E 100', 'T-10', 'IS-7', 'Obj 140'];

  // These must match exactly what you use in `useEffect`:
  const [autoTypeText, setAutoTypeText] = useState(''); 
  const [autoTypeIndex, setAutoTypeIndex] = useState(0); 
  const [currentCharIndex, setCurrentCharIndex] = useState(0); 
  const isAutotyping = useRef(false);

  const inactivityTimerRef = useRef(null);

  // -------------------------------
  // Fetch Tanks
  // -------------------------------
  const fetchTanks = async (currentPage = 1, currentFilters = filters) => {
    setIsLoading(true);
    try {
      const { search, type, tier, nation } = currentFilters;
      const response = await apiClient.get(
        `/tanks/all?search=${search || ''}&page=${currentPage}&per_page=20&type=${type||''}&tier=${tier||''}&nation=${nation||''}`
      );
      const apiTanks = response.data.data.flat();

      if (currentPage === 1) {
        setTanks(apiTanks);
      } else {
        setTanks((prev) => [...prev, ...apiTanks]);
      }

      if (response.data.data.length === 0 || response.data.total_pages <= currentPage) {
        setMoreTanks(false);
      } else {
        setPage(currentPage + 1);
      }
    } catch (error) {
      console.error('Error retrieving tanks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTanks(1, filters);
  }, [filters]);

  // -------------------------------
  // Infinite Scroll
  // -------------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (moreTanks && !isLoading) {
          fetchTanks(page, filters);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, isLoading, moreTanks, filters]);

  // -------------------------------
  // Inactivity Timer (5s)
  // -------------------------------
  function resetInactivityTimer() {
    console.log('[Inactivity] Timer reset to 5s...');
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      console.log('[Inactivity] 5s passed, checking if we can autotype...');
      if (!isAutotyping.current && filters.search === '') {
        console.log('[Inactivity] Starting autotype now...');
        startAutotyping();
      }
    }, 5000);
  }

  function startAutotyping() {
    console.log('[Autotype] STARTING...');
    isAutotyping.current = true;
    setAutoTypeText('');
    setCurrentCharIndex(0);
  }

  function stopAutotyping() {
    if (isAutotyping.current) {
      console.log('[Autotype] STOPPED due to user interaction...');
      isAutotyping.current = false;
      setAutoTypeText('');
      setCurrentCharIndex(0);
    }
  }

  // On mount
  useEffect(() => {
    console.log('[Mount] Setting up inactivity timer...');
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  // -------------------------------
  // Type Characters
  // -------------------------------
  useEffect(() => {
    // If we are currently autotyping
    if (isAutotyping.current && filters.search === '') {
      const currentName = tankNames[autoTypeIndex];
      // If we haven't typed all characters yet
      if (currentCharIndex < currentName.length) {
        const timer = setTimeout(() => {
          const nextChar = currentName[currentCharIndex];
          console.log(`[Autotype] TYPING char: "${nextChar}"`);
          setAutoTypeText((prev) => prev + nextChar);
          setCurrentCharIndex((prev) => prev + 1);
        }, 200);
        return () => clearTimeout(timer);
      } else {
        // Done typing entire name
        console.log(`[Autotype] Finished entire name: "${currentName}"`);
        setFilters((prev) => ({ ...prev, search: currentName }));
        setAutoTypeIndex((prev) => (prev + 1) % tankNames.length);
        stopAutotyping();
      }
    }
  }, [isAutotyping.current, filters.search, autoTypeIndex, currentCharIndex, tankNames]);

  // -------------------------------
  // Stop + Reset Timer if user does ANYTHING
  // -------------------------------
  function handleUserInteraction() {
    console.log('[UserInteraction] Something was clicked/typed, resetting 5s timer...');
    resetInactivityTimer();
  }

  const handleSearchFocus = () => {
    console.log('[Focus] Search box focused...');
    stopAutotyping();
    handleUserInteraction();
  };

  const handleFilterChange = (filterType, value) => {
    console.log(`[FilterChange] ${filterType} changed to: "${value}"`);
    stopAutotyping();
    handleUserInteraction();

    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    setPage(1);
    setMoreTanks(true);

    if (filterType === 'search') {
      fetchTanks(1, { ...filters, [filterType]: value });
    }
    handleMenuClose(filterType);
  };

  // -------------------------------
  // Menu Helpers
  // -------------------------------
  const handleMenuOpen = (event, type) => {
    handleUserInteraction();
    setAnchorEl((prev) => ({ ...prev, [type]: event.currentTarget }));
  };

  const handleMenuClose = (type) => {
    setAnchorEl((prev) => ({ ...prev, [type]: null }));
  };

  // Format Price
  const fixCurrency = (price) => Number(price).toLocaleString();

  // Filter Tanks
  const filteredTanks = tanks.filter((tank) =>
    tank.name.toLowerCase().includes(filters.search.toLowerCase())
  );

  // -----------------------------------------
  // 10) Render
  // -----------------------------------------
  return (
    <div
      className="carousel-container"
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
      // Optionally handle mouseMove or click events globally:
      // onMouseMove={handleUserInteraction}
      // onClick={handleUserInteraction}
    >
      <Typography variant="h3" sx={{ marginBottom: '2rem' }}>
        Tank Inventory
      </Typography>

      <Box
        sx={{
          backgroundColor: '#161616',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '1rem',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          marginBottom: '4rem',
          width: '35rem',
          padding: '0.2rem'
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search Tank by Name"
          value={autoTypeText || filters.search}
          onFocus={handleSearchFocus}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          sx={{
            input: { color: '#fafafa' },
            '& .MuiOutlinedInput-root fieldset': {
              border: 'none'
            },
            '& .MuiInputBase-input': {
              color: '#fafafa',
              fontSize: '1.1rem'
            },
            flexGrow: 1
          }}
        />

        {/* Filter Icons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginLeft: '1rem'
          }}
        >
          {/* Tier Filter */}
          <Tooltip title="Tier Filter">
            <IconButton
              onClick={(e) => handleMenuOpen(e, 'tier')}
              sx={{
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)'
                },
                borderRadius: '0.5rem',
                color: filters.tier ? '#ab003c' : '#fafafa'
              }}
            >
              <FormatListNumberedIcon sx={{ fontSize: '2.5rem' }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl.tier}
            open={Boolean(anchorEl.tier)}
            onClose={() => handleMenuClose('tier')}
          >
            {tiers.map((tier) => (
              <MenuItem
                key={tier}
                onClick={() => handleFilterChange('tier', tier)}
                sx={{
                  color: '#fafafa',
                  backgroundColor: filters.tier === tier ? '#ab003c' : '#161616',
                  '&:hover': {
                    backgroundColor: '#ab003c',
                    color: '#fafafa'
                  }
                }}
              >
                {tier}
              </MenuItem>
            ))}
          </Menu>

          {/* Type Filter */}
          <Tooltip title="Type Filter">
            <IconButton
              onClick={(e) => handleMenuOpen(e, 'type')}
              sx={{
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)'
                },
                borderRadius: '0.5rem',
                color: filters.type ? '#ab003c' : '#fafafa'
              }}
            >
              <ClassIcon sx={{ fontSize: '2.5rem' }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl.type}
            open={Boolean(anchorEl.type)}
            onClose={() => handleMenuClose('type')}
          >
            {types.map((type) => (
              <MenuItem
                key={type}
                onClick={() => handleFilterChange('type', type)}
                sx={{
                  color: '#fafafa',
                  backgroundColor: filters.type === type ? '#ab003c' : '#161616',
                  '&:hover': {
                    backgroundColor: '#ab003c',
                    color: '#fafafa'
                  }
                }}
              >
                {type}
              </MenuItem>
            ))}
          </Menu>

          {/* Nation Filter */}
          <Tooltip title="Nation Filter">
            <IconButton
              onClick={(e) => handleMenuOpen(e, 'nation')}
              sx={{
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)'
                },
                borderRadius: '0.5rem',
                color: filters.nation ? '#ab003c' : '#fafafa'
              }}
            >
              <FlagIcon sx={{ fontSize: '2.5rem' }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl.nation}
            open={Boolean(anchorEl.nation)}
            onClose={() => handleMenuClose('nation')}
          >
            {nations.map((nation) => (
              <MenuItem
                key={nation}
                onClick={() => handleFilterChange('nation', nation)}
                sx={{
                  color: '#fafafa',
                  backgroundColor: filters.nation === nation ? '#ab003c' : '#161616',
                  '&:hover': {
                    backgroundColor: '#ab003c',
                    color: '#fafafa'
                  }
                }}
              >
                {nation.charAt(0).toUpperCase() + nation.slice(1)}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* Tanks List */}
      <Box>
        {tanks.length > 0 ? (
          tanks.map((tank, index) => (
            <Card
              key={index}
              onClick={() => navigate(`/tank/${tank.id}`)}
              sx={{
                alignItems: 'center',
                backgroundColor: '#161616',
                borderRadius: '1rem',
                display: 'flex',
                margin: '2rem',
                width: '38rem',
                height: '8rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                overflow: 'visible',
                position: 'relative',
                animation: `${fadeIn} 1.5s ease-in-out`,
                animationFillMode: 'both',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.08)',
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)'
                }
              }}
            >
              <CardMedia
                component="img"
                image={tank.image}
                alt={tank.name}
                sx={{
                  flexShrink: 0,
                  marginLeft: '2rem',
                  marginTop: '1rem',
                  objectFit: 'cover',
                  height: '8rem',
                  width: '9rem'
                }}
              />
              <CardMedia
                component="img"
                image={tank.nation_flag}
                alt={`${tank.nation} flag`}
                sx={{
                  flexShrink: 0,
                  marginLeft: '2rem',
                  marginRight: '1rem',
                  objectFit: 'cover',
                  maxWidth: '8rem'
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginLeft: '-1rem',
                    marginBottom: '-0.5rem'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fafafa',
                      minWidth: '5rem',
                      marginRight: '.5rem',
                      overflow: 'hidden',
                      textAlign: 'right',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Name:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ab003c',
                      fontWeight: 'bold',
                      textAlign: 'left',
                      flexGrow: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '9rem',
                      marginRight: '1rem'
                    }}
                  >
                    {tank.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginLeft: '-1rem',
                    marginBottom: '-0.5rem'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fafafa',
                      lineHeight: 0.8,
                      textAlign: 'right',
                      minWidth: '5rem',
                      marginRight: '.5rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    Price:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ab003c',
                      fontWeight: 'bold',
                      textAlign: 'left',
                      flexGrow: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '12rem'
                    }}
                  >
                    {tank.price ? tank.price.toLocaleString() : 'N/A'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginLeft: '-1rem',
                    marginBottom: '-0.5rem'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fafafa',
                      textAlign: 'right',
                      minWidth: '5rem',
                      marginRight: '.5rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    Tier:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ab003c',
                      fontWeight: 'bold',
                      textAlign: 'left',
                      flexGrow: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '12rem'
                    }}
                  >
                    {tank.tier}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginLeft: '-1rem'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fafafa',
                      textAlign: 'right',
                      minWidth: '5rem',
                      marginRight: '.5rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    Nation:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ab003c',
                      fontWeight: 'bold',
                      textAlign: 'left',
                      flexGrow: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '12rem'
                    }}
                  >
                    {tank.nation
                      ? tank.nation.length <= 4
                        ? tank.nation.toUpperCase()
                        : tank.nation.charAt(0).toUpperCase() + tank.nation.slice(1)
                      : 'N/A'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {isLoading ? (
              <>
                <Typography variant="h4" sx={{ marginBottom: '3rem' }}>
                  Loading Vehicles...
                </Typography>
                <CircularProgress color="inherit" size="5rem" />
              </>
            ) : (
              <Typography variant="h4" sx={{ marginBottom: '3rem' }}>
                No results
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Carousel;
