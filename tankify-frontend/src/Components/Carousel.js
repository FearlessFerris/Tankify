// Carousel Component Implementation 


// Dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardMedia, CardContent, IconButton, Menu, MenuItem, Tooltip, Typography, TextField, CircularProgress } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import FlagIcon from '@mui/icons-material/Flag';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Carousel Component 
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
  const [page, setPage] = useState(1);
  const [ hoveredCard, setHoveredCard ] = useState( null );
  const [isLoading, setIsLoading] = useState(false);
  const [moreTanks, setMoreTanks] = useState(true);
  const [tanks, setTanks] = useState([]);
  const tiers = ['1','2','3','4','5','6','7','8','9','10'];
  const types = ['Heavy Tank','Medium Tank','Light Tank','AT-SPG','SPG'];
  const nations = ['USSR','Germany','USA','China','France','UK','Japan','Czech','Sweden','Poland','Italy'];
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    tier: '',
    nation: ''
  });
  const [anchorEl, setAnchorEl] = useState({
    tier: null,
    type: null,
    nation: null
  });

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

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    setPage(1);
    setMoreTanks(true);
    if (filterType === 'search') {
      fetchTanks(1, updatedFilters);
    }
    handleMenuClose(filterType);
  };

  const handleMenuOpen = (event, type) => {
    setAnchorEl((prev) => ({ ...prev, [type]: event.currentTarget }));
  };

  const handleMenuClose = (type) => {
    setAnchorEl((prev) => ({ ...prev, [type]: null }));
  };

  const handleHovering = ( index ) => {
    setHoveredCard( index );
  }

  const fixCurrency = (price) => Number(price).toLocaleString();
  
  const filteredTanks = tanks.filter((tank) =>
    tank.name.toLowerCase().includes(filters.search.toLowerCase())
  );


  return (
    <div
      className="carousel-container"
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
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
          value = { filters.search } 
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginLeft: '1rem'
          }}
        >
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
      <Box>
        {filteredTanks.length > 0 ? (
          filteredTanks.map((tank, index) => (
            <Card
              key={ tank.id }
              onClick={() => navigate(`/tank/${tank.id}`)}
              onMouseEnter = { () => handleHovering( index ) }
              onMouseLeave = { () => handleHovering( null) }
              sx={{
                alignItems: 'center',
                backgroundColor: '#161616',
                borderRadius: '1rem',
                display: 'flex',
                margin: '2rem',
                width: '38rem',
                height: hoveredCard === index ? '14rem' : '13rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'height 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
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
              <Box
    sx={{
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: hoveredCard === index ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Button 
    variant="contained" 
    color="primary"
    sx = {{
      backgroundColor: '#ab003d',
      color: '#fafafa'
    }}
    >
      Show More
    </Button>
  </Box>
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
