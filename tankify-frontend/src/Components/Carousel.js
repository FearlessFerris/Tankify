// Carousel Component Implementation 


// Dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, IconButton, Menu, MenuItem, Tooltip, Typography, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ClassIcon from '@mui/icons-material/Class';
import FlagIcon from '@mui/icons-material/Flag';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';


// Components & Necessary Files
import apiClient from '../api/apiClient';


// Carousel Component
function Carousel() {

    const navigate = useNavigate();
    const [tanks, setTanks] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ type: '', tier: '', nation: '' });
    const [anchorEl, setAnchorEl] = useState({ tier: null, type: null, nation: null });
    const tiers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const types = [ 'Heavy Tank', 'Medium Tank', 'Light Tank', 'AT-SPG', 'SPG' ];
    const nations = [ 'USSR', 'Germany', 'USA', 'China', 'France', 'UK', 'Japan', 'Czech', 'Sweden', 'Poland', 'Italy' ];

    useEffect(() => {
        const fetchTanks = async () => {
            try {
                const response = await apiClient.get('/tanks/all');
                const apiTanks = response.data.data;
                setTanks( apiTanks );
            } catch {
                console.error('Error retrieving tanks!');
            }
        };
        fetchTanks();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleMenuOpen = (event, type) => {
        setAnchorEl((prev) => ({ ...prev, [type]: event.currentTarget }));
    };

    const handleMenuClose = (type) => {
        setAnchorEl((prev) => ({ ...prev, [type]: null }));
    };

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType] === value ? '' : value, 
        }));
        handleMenuClose(filterType);
    };

    const fixCurrency = ( price ) => {
        return Number( price ).toLocaleString();
    }

    const filteredTanks = tanks.filter((tank) => {
        const matchesSearch = tank.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = !filters.type || tank.type.toLowerCase() === filters.type.toLowerCase().replace(' ', '');
        const matchesTier = !filters.tier || tank.tier === filters.tier;
        const matchesNation = !filters.nation || tank.nation === filters.nation.toLowerCase();
        return matchesSearch && matchesType && matchesTier && matchesNation;
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
            <Box
                sx={{
                    backgroundColor: '#2b2a2e',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '1rem',
                    border: '.2rem solid #fafafa',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                    marginBottom: '4rem',
                    width: '40rem',
                    padding: '0.5rem'
                }}
            >
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
                            fontSize: '1.3rem'
                        },
                        flexGrow: 1,
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginLeft: '1rem',
                    }}
                >
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
                                sx = {{
                                    backgroundColor: filters.tier === tier ? '#ab003c' : 'inherit',
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
                    <Tooltip title='Type Filter'>
                        <IconButton
                            onClick={(e) => handleMenuOpen(e, 'type')}
                            sx={{
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                transition: 'box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
                                },
                                borderRadius: '0.5rem',
                                color: filters.type ? '#ab003c' : '#fafafa',
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
                        {types.map(( type ) => (
                            <MenuItem
                                key={ type }
                                onClick={() => handleFilterChange('type', type)}
                                sx = {{
                                    backgroundColor: filters.type === type ? '#ab003c' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: '#ab003c',
                                        color: '#fafafa'
                                    }
                                }}
                            >
                                { type }
                            </MenuItem>
                        ))}
                    </Menu>
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
                                sx = {{
                                    backgroundColor: filters.nation === nation ? '#ab003c' : 'inherit',
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
            <Box>
                {filteredTanks && filteredTanks.length > 0 ? (
                    filteredTanks.map((tank, index) => (
                        <Card
                            key={index}
                            onClick = { () => navigate( `/tank/${ tank.id }`)}
                            sx={{
                                alignItems: 'center',
                                backgroundColor: '#2b2a2e',
                                border: '.2rem solid #fafafa',
                                borderRadius: '1rem',
                                display: 'flex',
                                margin: '2rem',
                                width: '40rem',
                                height: '10rem',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                overflow: 'visible',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.08)',
                                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)',
                                },
                            }}
                        >
                            <CardMedia
                                component='img'
                                image={ tank.image }
                                alt={ tank.name }
                                sx={{
                                    flexShrink: 0,
                                    marginRight: '0.5rem',
                                    marginLeft: '0.5rem',
                                    objectFit: 'cover',
                                    maxWidth: '10rem'
                                }}
                            />
                                <CardMedia
                                    component = 'img'
                                    image={tank.nation_flag}
                                    alt={`${tank.nation} flag`}
                                    sx={{
                                        flexShrink: 0,
                                        marginRight: '0.5rem',
                                        objectFit: 'cover',
                                        maxWidth: '8rem',
                                    }}
                                />
                            <CardContent>
                                <Typography
                                    variant='h5'
                                    noWrap
                                    sx={{
                                        color: '#fafafa',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '18rem'
                                    }}
                                >
                                Name:  <span style = {{ color: '#ab003c', fontWeight: 'bold' }}> { tank.name } </span>
                                </Typography>
                                <Typography
                                    variant = 'h5'
                                    sx = {{
                                        color: '#fafafa'
                                    }}
                                >
                                Tier: <span style = {{ color: '#ab003c', fontWeight: 'bold' }}> { tank.tier } </span> 
                                </Typography>
                                <Typography
                                    variant = 'h5'
                                    sx = {{
                                        color: '#fafafa'
                                    }}
                                >
                                Price: <span style = {{ color: '#ab003c', fontWeight: 'bold' }}> { fixCurrency( tank.price ) } </span> 
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <>
                    <Box 
                        sx = {{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                    <Typography 
                        variant='h4'
                        sx = {{
                            marginBottom: '3rem'
                        }}
                    > 
                    Loading 874 Vehicles...
                    </Typography>
                    <CircularProgress 
                        color = '#fafafa'
                        size = '5rem'
                    />  
                    </Box>
                    </>
                )}
            </Box>
        </div>
    );
}

export default Carousel;
