// TankGrid Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
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
    const [tanks, setTanks] = useState([]);
    const tiers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const types = ['Heavy Tank', 'Medium Tank', 'Light Tank', 'AT-SPG', 'SPG'];
    const nations = ['USSR', 'Germany', 'USA', 'China', 'France', 'UK', 'Japan', 'Czech', 'Sweden', 'Poland', 'Italy'];
    const [filters, setFilters] = useState({
        search: '',
        tier: '',
        type: '',
        nation: ''
    });
    const [anchorEl, setAnchorEl] = useState({
        tier: null,
        type: null,
        nation: null
    });


    // API Helper Functions 
    const fetchTanks = async (currentPage = 1, currentFilters = filters) => {
        try {
            const { search, tier, type, nation } = currentFilters;
            console.log('Fetching Tanks...');
            const response = await apiClient.get(`/tanks/all?search=${search || ''}&page=${currentPage}&per_page=20&type=${type || ''}&tier=${tier || ''}&nation=${nation || ''}`);
            const apiTanks = response.data.data;
            console.log(apiTanks);
            if (currentPage === 1) {
                setTanks(apiTanks);
            }
        }
        catch (error) {
            console.error('Error fetching tanks', error)
        }
    }

    const handleMenuOpen = (event, type) => {
        setAnchorEl((previous) => ({
            ...previous,
            [type]: event.currentTarget
        }));
    }

    const handleMenuClose = (type) => {
        setAnchorEl((previous) => ({
            ...previous,
            [type]: null
        }));
    }


    // Initial Data Fetching 
    useEffect(() => {
        fetchTanks(1, filters);
    }, []);


    // Menu Filter Selector Render 
    const MenuFilterSelector = ({ anchorElReference, filterType, filterValues, IconComponent, tooltipTitle }) => {

        return (
            <>
                <Tooltip
                    title={tooltipTitle}
                >
                    <IconButton
                        onClick={(event) => handleMenuOpen({ event, filterType })}
                        sx={{
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                            transition: 'box-shadow 0.3s ease',
                            borderRadius: '0.5rem',
                            color: filters.tier ? '#ab003c' : '#fafafa',
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
                    anchorEl={anchorElReference}
                    open={Boolean(anchorElReference)}
                    onClose={() => handleMenuClose({ filterType })}
                >
                    {filterValues.map((filterType) => (
                        <MenuItem
                            key={filterType}
                            sx={{
                                color: '#fafafa',
                                backgroundColor: filters.filterType === filterType ? '#ab003c' : '#0d0d0d',
                                '&:hover': {
                                    backgroundColor: '#ab003c',
                                    color: '#fafafa'
                                }
                            }}
                        >
                            {filterType}
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
                    variant='outlined'
                    placeholder='Search Tank by Name'
                    value={filters.search}
                    sx={{
                        input: { color: '#ab003c' },
                        '& .MuiOutlinedInput-root fieldset': { border: 'none' },
                        '& .MuiInputBase-input': { color: '#ab003c', fontSize: '1.2rem' },
                        flexGrow: 1,
                        marginLeft: '0.5rem'
                    }}
                />
                <MenuFilterSelector
                    anchorElReference={anchorEl.tier}
                    filterType='tier'
                    filterValues={tiers}
                    IconComponent={FormatListNumberedIcon}
                    tooltipTitle='Tier Filter'
                />
                <MenuFilterSelector
                    anchorElReference={anchorEl.type}
                    filterType='type'
                    filterValues={types}
                    IconComponent={ClassIcon}
                    tooltipTitle='Type Filter'
                />
                <MenuFilterSelector
                    anchorElReference={anchorEl.nation}
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
                    {tanks.length > 0 ? (
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
                                width: '100%',
                                marginTop: '2rem',
                                textAlign: 'center'
                            }}
                        >
                            <Typography variant="h5">
                                No results
                            </Typography>
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
                variant='h3'
                sx={{
                    color: '#ab003c',
                    marginBottom: '2rem',
                    marginTop: '2rem',
                    textAlign: 'center'
                }}
            >
                Tank Inventory
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