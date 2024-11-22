// Dependencies
import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, IconButton, Menu, MenuItem, Tooltip, Typography, TextField } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import FlagIcon from '@mui/icons-material/Flag';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

// Components & Necessary Files
import apiClient from '../api/apiClient';

// Carousel Component
function Carousel() {
    const [tanks, setTanks] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ class: '', tier: '', nation: '' });
    const [anchorEl, setAnchorEl] = useState({ tier: null, class: null, nation: null });

    const tiers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const classes = ['Heavy Tank', 'Medium Tank', 'Light Tank', 'Tank Destroyer', 'SPG'];
    const nations = ['ussr', 'germany', 'usa', 'china', 'france', 'uk', 'japan', 'czech', 'sweden', 'poland', 'italy'];

    useEffect(() => {
        const fetchTanks = async () => {
            try {
                const response = await apiClient.get('/tanks/all');
                const apiTanks = Object.values(response.data.data || {});
                setTanks(apiTanks);
            } catch {
                console.error('Error retrieving tanks!');
            }
        };
        fetchTanks();
    }, []);

    // Handle real-time search
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Handle opening the filter menu
    const handleMenuOpen = (event, type) => {
        setAnchorEl((prev) => ({ ...prev, [type]: event.currentTarget }));
    };

    // Handle closing the filter menu
    const handleMenuClose = (type) => {
        setAnchorEl((prev) => ({ ...prev, [type]: null }));
    };

    // Handle filter selection from menu
    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType] === value ? '' : value, // Toggle filter value on click (deselect if already selected)
        }));
        handleMenuClose(filterType);
    };

    // Filter tanks based on search term and selected filters
    const filteredTanks = tanks.filter((tank) => {
        const matchesSearch = tank.name.toLowerCase().includes(search.toLowerCase());
        const matchesClass = !filters.class || tank.type === filters.class.toLowerCase().replace(' ', '');
        const matchesTier = !filters.tier || tank.tier === tiers.indexOf(filters.tier) + 1;
        const matchesNation = !filters.nation || tank.nation === filters.nation;

        return matchesSearch && matchesClass && matchesTier && matchesNation;
    });

    return (
        <div
            className='carousel-container'
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant='h3'
                sx={{
                    marginBottom: '2rem',
                }}
            >
                Tank Inventory
            </Typography>

            {/* Unified Search and Filter Component */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '1rem',
                    border: '.2rem solid #fafafa',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                    marginBottom: '4rem',
                    width: '30rem',
                    padding: '0.5rem',
                    backgroundColor: '#2b2a2e',
                }}
            >
                {/* Search Bar (Left) */}
                <TextField
                    variant='outlined'
                    placeholder='Search Tank by Name'
                    value={search}
                    onChange={handleSearchChange}
                    sx={{
                        input: { color: '#fafafa' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: '#fafafa',
                        },
                        flexGrow: 1,
                    }}
                />

                {/* Filter Icons (Right) */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginLeft: '1rem',
                    }}
                >
                    {/* Tier Filter Icon */}
                    <Tooltip title='Tier Filter'>
                        <IconButton
                            onClick={(e) => handleMenuOpen(e, 'tier')}
                            sx={{
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                transition: 'box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
                                },
                                borderRadius: '0.5rem',
                                color: filters.tier ? '#ab003c' : '#fafafa',
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
                            >
                                {tier}
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* Class Filter Icon */}
                    <Tooltip title='Class Filter'>
                        <IconButton
                            onClick={(e) => handleMenuOpen(e, 'class')}
                            sx={{
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                transition: 'box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
                                },
                                borderRadius: '0.5rem',
                                color: filters.class ? '#ab003c' : '#fafafa',
                            }}
                        >
                            <ClassIcon sx={{ fontSize: '2.5rem' }} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl.class}
                        open={Boolean(anchorEl.class)}
                        onClose={() => handleMenuClose('class')}
                    >
                        {classes.map((cls) => (
                            <MenuItem
                                key={cls}
                                onClick={() => handleFilterChange('class', cls)}
                            >
                                {cls}
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* Nation Filter Icon */}
                    <Tooltip title='Nation Filter'>
                        <IconButton
                            onClick={(e) => handleMenuOpen(e, 'nation')}
                            sx={{
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                transition: 'box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
                                },
                                borderRadius: '0.5rem',
                                color: filters.nation ? '#ab003c' : '#fafafa',
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
                            >
                                {nation.charAt(0).toUpperCase() + nation.slice(1)}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>

            {/* Tank Cards */}
            <Box>
                {filteredTanks && filteredTanks.length > 0 ? (
                    filteredTanks.map((tank, index) => (
                        <Card
                            key={index}
                            sx={{
                                alignItems: 'center',
                                backgroundColor: '#2b2a2e',
                                border: '.2rem solid #fafafa',
                                borderRadius: '1rem',
                                display: 'flex',
                                margin: '2rem',
                                maxWidth: '30rem',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                overflow: 'visible',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.08)',
                                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)',
                                },
                            }}
                        >
                            <CardMedia
                                component='img'
                                image={tank.images?.big_icon}
                                alt={tank.name}
                                sx={{
                                    flexShrink: 0,
                                    marginRight: '0.5rem',
                                    objectFit: 'cover',
                                    maxWidth: '10rem',
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#ab003c',
                                    }}
                                >
                                    {tank.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant='h4'> No Tanks Available </Typography>
                )}
            </Box>
        </div>
    );
}

export default Carousel;