// TankGrid Component Implementation 


// Dependencies 
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Grid2, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ClassIcon from '@mui/icons-material/Class';
import FlagIcon from '@mui/icons-material/Flag';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import TankCardV2 from './TankCardV2';


// Context Providers 


// TankGrid Component 
function TankGridV2() {

    const navigate = useNavigate();

    // State Variables 
    const [ tanks, setTanks ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( false );
    const tiers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const types = ['Heavy Tank', 'Medium Tank', 'Light Tank', 'AT-SPG', 'SPG'];
    const nations = ['USSR', 'Germany', 'USA', 'China', 'France', 'UK', 'Japan', 'Czech', 'Sweden', 'Poland', 'Italy'];
    const [filters, setFilters] = useState({
        search: '',
        tier: '',
        type: '',
        nation: ''
    });

    // API Helper Functions 
    const fetchTanks = async ( currentPage = 1, currentFilters = filters, append = false ) => { 
        setIsLoading( true );
        try{ 
            const { search, tier, type, nation } = currentFilters;
            const params = new URLSearchParams(); 
            if ( search ) params.append( 'search', search );
            if ( tier ) params.append( 'tier', tier );
            if ( type ) params.append( 'type', type );
            if ( nation ) params.append( 'nation', nation );
            params.append( 'page', currentPage );
            params.append( 'per_page', 20 );
            const response = await apiClient.get( `/tanks/all?${ params.toString() }` );
            const apiTanks = response.data.data; 
            setTotalPages( response.data.total_pages );
            // await new Promise( r => setTimeout( r, 300 ) );
            setTanks(prev => append ? [...prev, ...apiTanks] : apiTanks);
        }
        catch( error ){ 
            console.error( `Error fetching tanks`, error );
        }
        finally { 
            setIsLoading( false );
        }
    }

    const handleTextFilterChange = (event) => {
        const { name, value } = event.target;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9 -]/g, '');
        const updatedFilters = { 
            ...filters, 
            [ name ]: sanitizedValue
        }
        setFilters( updatedFilters );
        setPage( 1 );
    }

    const handleMenuFilterChange = (filterType, value) => {
        const isAlreadySelected = filters[filterType] === value;
        const updatedFilters = {
            ...filters,
            [filterType]: isAlreadySelected ? '' : value,
        };
        setFilters(updatedFilters);
    };

    useEffect( () => { 
        const handleScroll = () => { 
            const scrollPosition = window.innerHeight + window.scrollY; 
            const nearBottom = document.body.offsetHeight - 500; 
            if ( scrollPosition >= nearBottom && page < totalPages ){ 
                const nextPage = page + 1; 
                setPage( nextPage );
                fetchTanks( nextPage, filters, true );
            }
        }
        window.addEventListener( 'scroll', handleScroll );
        return () => window.removeEventListener( 'scroll', handleScroll );
    }, [ page, totalPages, filters ] )

    // Initial Data Fetching 
    useEffect(() => {
        setPage(1);
        setTanks( [] );
        fetchTanks(1, filters );
    }, [ filters ] );

    // Menu Filter Selector Render 
    const MenuFilterSelector = ({ filterType, filterValues, IconComponent, tooltipTitle }) => {

        const [anchorEl, setAnchorEl] = React.useState(null);

        return (
            <>
                <Tooltip
                    title={tooltipTitle}
                >
                    <IconButton
                        onClick = { ( event ) => { setAnchorEl( event.currentTarget ) } }
                        sx={{ 
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                            transition: 'box-shadow 0.3s ease',
                            borderRadius: '0.5rem',
                            color: filters[filterType] ? '#ab003c' : '#fafafa',
                            marginLeft: '0.5rem'
                        }}
                    >
                        {IconComponent && (
                            <IconComponent
                                sx={{
                                    fontSize: '2rem'
                                }}
                            />
                        )}
                    </IconButton>
                </Tooltip>
                    <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    >
                    {filterValues.map((value) => (
                        <MenuItem
                        onClick={() => { 
                            handleMenuFilterChange(filterType, value)
                            setAnchorEl( null )
                        }}
                        key={value}
                        sx={{
                            color: '#fafafa',
                            backgroundColor: filters[filterType] === value ? '#ab003c' : '#0d0d0d',
                            '&:hover': {
                                backgroundColor: '#ab003c',
                                color: '#fafafa'
                            }
                        }}
                        >
                            {value}
                        </MenuItem>
                    ))}
                </Menu>
            </>
        )
    }


    // Menu Component Render 
    const renderMenuComponent = () => {

        return (
            <>
                <TextField
                    name='search'
                    onChange={handleTextFilterChange}
                    placeholder='Search Tank by Name'
                    value={filters.search}
                    variant='outlined'
                    sx={{
                        input: { color: '#ab003c' },
                        '& .MuiOutlinedInput-root fieldset': { border: 'none' },
                        '& .MuiInputBase-input': { color: '#ab003c', fontSize: '1.2rem' },
                        flexGrow: 1,
                        marginLeft: '0.5rem'
                    }}
                />
                <MenuFilterSelector
                    filterType='tier'
                    filterValues={tiers}
                    IconComponent={FormatListNumberedIcon}
                    tooltipTitle='Tier Filter'
                />
                <MenuFilterSelector
                    filterType='type'
                    filterValues={types}
                    IconComponent={ClassIcon}
                    tooltipTitle='Type Filter'
                />
                <MenuFilterSelector
                    filterType='nation'
                    filterValues={nations}
                    IconComponent={FlagIcon}
                    tooltipTitle='Nation Filter'
                />
            </>
        )
    }


    // Tank Grid Component Render 
    const renderTankGrid = () => {
        return (
            <>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '2rem',
                    }}
                >
                    { tanks.length > 0 ? (
                        tanks.map((tank) => (
                            <Box
                                key={tank.id}
                                sx={{
                                    width: '20rem',
                                    flexShrink: 0
                                }}
                            >
                                <TankCardV2
                                    tank={tank}
                                    navigate={navigate}
                                />
                            </Box>
                        ))
                    ) : (
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                marginTop: '2rem',
                                textAlign: 'center',
                                width: '100%'
                            }}
                        >
                            { isLoading ? ( 
                                <>
                            <CircularProgress 
                                color = 'inherit'
                                size = '4rem'
                            />    
                                Loading Tanks...
                            <Typography 
                                variant = "h5"
                            >
                            </Typography>
                                </>
                            ):(
                                <Typography 
                                    variant = 'h5'
                                > 
                                No Results 
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
            </>
        );
    };


    // TankGridV2 Component Render 
    return (
        <Box
            sx={{
                margin: '0 auto',
                maxWidth: '100rem',
                marginBottom: '6rem',
                width: '100%'
            }}
        >
            <Typography
                variant='h4'
                sx={{
                    color: '#ab003c',
                    marginBottom: '2rem',
                    marginTop: '2rem',
                    textAlign: 'center'
                }}
            >
                Search Tank Inventory
            </Typography>

            <Box
                sx={{
                    backgroundColor: '#0d0d0d',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '.75rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                    marginBottom: '4rem',
                    maxWidth: '35rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                {renderMenuComponent()}
            </Box>

            {renderTankGrid()}
        </Box>
    )
}

export default TankGridV2; 