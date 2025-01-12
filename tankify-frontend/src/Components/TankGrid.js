// TankGrid Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid2, Box, TextField, IconButton, Tooltip, Menu, MenuItem, CircularProgress } from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ClassIcon from '@mui/icons-material/Class';
import FlagIcon from '@mui/icons-material/Flag';


// Components & Necessary Files 
import apiClient from '../api/apiClient'; 
import TankCard from './TankCard';


// TankGrid Component 
function TankGrid() {

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
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
      console.log( apiTanks );

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
    setPage(1);
    setMoreTanks(true);
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

    let newValue = value;
    if (filters[filterType] === value) {
      newValue = '';
    }
  
    const updatedFilters = {
      ...filters,
      [filterType]: newValue,
    };
  
    setFilters(updatedFilters);
    handleMenuClose(filterType);
  };
  

  const handleMenuOpen = (event, type) => {
    setAnchorEl((prev) => ({ ...prev, [type]: event.currentTarget }));
  };
  const handleMenuClose = (type) => {
    setAnchorEl((prev) => ({ ...prev, [type]: null }));
  };

  const filteredTanks = tanks.filter((tank) =>
    tank.name.toLowerCase().includes(filters.search.toLowerCase())
  );

  return (
    <div style={{ width: '100%', maxWidth: '80rem', margin: '0 auto', marginBottom: '6rem' }}>
      <Typography variant="h3" sx={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
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
          maxWidth: '35rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search Tank by Name"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          sx={{
            input: { color: '#fafafa' },
            '& .MuiOutlinedInput-root fieldset': { border: 'none' },
            '& .MuiInputBase-input': { color: '#fafafa', fontSize: '1.1rem' },
            flexGrow: 1,
            marginLeft: '0.5rem'
          }}
        />
        
        <Tooltip title="Tier Filter">
          <IconButton
            onClick={(e) => handleMenuOpen(e, 'tier')}
            sx={{
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'box-shadow 0.3s ease',
              borderRadius: '0.5rem',
              color: filters.tier ? '#ab003c' : '#fafafa',
              marginLeft: '0.5rem'
            }}
          >
            <FormatListNumberedIcon sx={{ fontSize: '2rem' }} />
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
              borderRadius: '0.5rem',
              color: filters.type ? '#ab003c' : '#fafafa',
              marginLeft: '0.5rem'
            }}
          >
            <ClassIcon sx={{ fontSize: '2rem' }} />
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
              borderRadius: '0.5rem',
              color: filters.nation ? '#ab003c' : '#fafafa',
              marginLeft: '0.5rem'
            }}
          >
            <FlagIcon sx={{ fontSize: '2rem' }} />
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

      {/* Grid of Tank Cards */}
      <Grid2 container spacing={3} justifyContent="center">
        {filteredTanks.length > 0 ? (
          filteredTanks.map((tank) => (
            <Grid2 item key={tank.id} xs={12} sm={6} md={4} lg={3}>
              <TankCard tank={tank} navigate={navigate} />
            </Grid2>
          ))
        ) : (
          <Box
            sx={{
              width: '100%',
              marginTop: '2rem',
              textAlign: 'center'
            }}
          >
            {isLoading ? (
              <>
                <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                  Loading Tanks...
                </Typography>
                <CircularProgress color="inherit" size="4rem" />
              </>
            ) : (
              <Typography variant="h5">
                No results
              </Typography>
            )}
          </Box>
        )}
      </Grid2>
    </div>
  );
}

export default TankGrid;
