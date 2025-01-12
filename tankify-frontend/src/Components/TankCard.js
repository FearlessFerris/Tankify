// TankCard Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Collapse, Box, Button, Typography } from '@mui/material';


// Components & Necessary Files 
import TorchImageWithSparks from './TorchImageWithSparks';


// TankCard Component 
function TankCard({ tank, navigate }) {

  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleShowMore = (event) => {
    event.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <Card
      onClick={() => navigate(`/tank/${tank.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        width: '20rem',
        borderRadius: '1rem',
        backgroundColor: '#161616',
        transition: 'height 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)'
        }
      }}
    >
      {tank.nation_flag_hd && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            opacity: 0.2
          }}
        >
          <TorchImageWithSparks
            src={tank.nation_flag_hd}
            width="20rem"
            height="10rem"
          />
        </Box>
      )}
      <Box 
        sx = {{ 
            position: 'relative', 
            zIndex: 1,
            paddingBottom: isHovered ? '3rem' : '1rem',
            transition: 'padding-bottom 0.3s ease' 
        }}
      >
        <CardMedia
          component="img"
          image={tank.image}
          alt={tank.name}
          sx={{
            display: 'block',
            margin: '1rem auto', 
            marginTop: '2rem', 
            objectFit: 'cover',
            height: '8rem',
            width: '9rem'
          }}
        />

        <CardContent>
          <Typography 
            variant="h5" 
            sx = {{ 
                color: '#fafafa', 
                marginTop: '-1rem', 
            }}
          >
          {tank.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx = {{ 
                color: '#fafafa', 
                marginRight: '0.4rem' 
            }}
            >
              Price:
            </Typography>
            <Typography
              variant="body1"
              sx = {{ 
                color: '#ab003c', 
                fontWeight: 'bold' 
            }}
            >
              {tank.price ? tank.price.toLocaleString() : 'N/A'}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx = {{ 
                color: '#fafafa', 
                marginRight: '0.4rem' 
            }}
            >
              Tier:
            </Typography>
            <Typography
              variant="body1"
              sx = {{ 
                color: '#ab003c', 
                fontWeight: 'bold' 
            }}
            >
              {tank.tier}
            </Typography>
          </Box>
          <Box 
            sx = {{ 
                display: 'flex', 
                alignItems: 'center' 
                }}
            >
            <Typography
              variant = "body1"
              sx = {{ 
                color: '#fafafa', 
                marginRight: '0.4rem' 
            }}
            >
              Nation:
            </Typography>
            <Typography
              variant = "body1"
              sx = {{ 
                color: '#ab003c', 
                fontWeight: 'bold' 
            }}
            >
              {tank.nation}
            </Typography>
          </Box>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>

            <Box 
                sx = {{ 
                    display: 'flex',
                    alignItems: 'flex-start'
                }}
                >
                <Typography 
                    variant = 'body1'
                    sx = {{
                        color: '#fafafa',
                        marginRight: '0.4rem',
                        width: '6rem'
                    }}
                    >
                Description: 
                </Typography>
                <Typography 
                    variant = 'body1'
                    sx = {{
                        color: '#ab003c',
                        fontWeight: 'bold'
                    }}
                    >
                { tank.description }
                </Typography>
            </Box>
            </Collapse>
        </CardContent>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: isHovered ? 'flex' : 'none',
          zIndex: 2
        }}
      >
        <Button
          onClick={handleShowMore}
          variant="filled"
          sx={{
            color: '#ab003c',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '8rem',
            '&:hover': {
                backgroundColor: '#ab003c',
                color: '#fafafa'
            }
        }}
        >
          {isExpanded ? 'Hide' : 'Show More'}
        </Button>
      </Box>
    </Card>
  );
}

export default TankCard;
