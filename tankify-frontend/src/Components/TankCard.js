// TankCard Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Collapse, Box, Button, Typography } from '@mui/material';
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdNumbers } from "react-icons/md";
import { FaRegKeyboard } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { GiAbdominalArmor } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";


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

    const fixCurrency = (price) => Number(price).toLocaleString();

    return (
        <Card
            onClick={() => navigate(`/tank/${tank.id}`)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                position: 'relative',
                width: '20rem',
                borderRadius: '.5rem',
                backgroundColor: '#0d0d0d',
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
                sx={{
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
                        sx={{
                            color: '#ab003c',
                            marginTop: '-1rem',
                            marginBottom: '.5rem',
                            textAlign: 'center'
                        }}
                        >
                        {tank.name}
                    </Typography>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#fafafa',
                                marginLeft: '.5rem',
                                textAlign: 'center'
                            }}
                            >
                            Price:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#ab003c',
                                fontWeight: 'bold',
                                marginRight: '.5rem'
                            }}
                            >
                            <GrMoney
                                fontSize="1rem"
                                style={{
                                    color: '#4b4848',
                                    marginRight: '.2rem',
                                    position: 'relative',
                                    top: '.2rem',
                                    transition: 'color 0.3s ease',
                                }}
                                /> 
                            {tank.price ? fixCurrency(tank.price) : 'N/A'}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#fafafa',
                                marginLeft: '.5rem',
                                textAlign: 'center'
                            }}
                        >
                            Tier:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#ab003c',
                                fontWeight: 'bold',
                                marginRight: '.5rem',
                            }}
                        >
                            <MdNumbers 
                                fontSize="1rem"
                                style={{
                                    color: '#4b4848',
                                    marginLeft: '.2rem',
                                    marginRight: '.2rem',
                                    position: 'relative',
                                    top: '.2rem',
                                    transition: 'color 0.3s ease',
                                }}
                            />
                            {tank.tier}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#fafafa',
                                marginLeft: '.5rem',
                                textAlign: 'center'
                            }}
                        >

                            Nation:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#ab003c',
                                fontWeight: 'bold',
                                marginRight: '.5rem'
                            }}
                        >
                            <FaFlag 
                                fontSize="1rem"
                                style={{
                                    color: '#4b4848',
                                    marginLeft: '.3rem',
                                    marginRight: '.2rem',
                                    position: 'relative',
                                    top: '.2rem',
                                    transition: 'color 0.3s ease',
                                }}
                            />
                            {tank.nation}
                        </Typography>
                    </Box>
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#fafafa',
                                marginLeft: '.5rem',
                                textAlign: 'center'
                            }}
                        >
                            HP:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#ab003c',
                                fontWeight: 'bold',
                                marginRight: '.5rem'
                            }}
                        >
                            <MdOutlineHealthAndSafety 
                                fontSize = '1rem'
                                style = {{
                                    color: '#4b4848',
                                    marginRight: '.2rem',
                                    position: 'relative',
                                    top: '.2rem'
                                }}
                           /> 
                           { tank.default_profile[ 'hp' ] }
                        </Typography>
                    </Box>

                        <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#fafafa',
                                marginLeft: '.5rem',
                                textAlign: 'center'
                            }}
                            >
                            Hull Armor:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#ab003c',
                                fontWeight: 'bold',
                                marginRight: '.5rem'
                            }}
                        >
                            <GiAbdominalArmor 
                                fontSize = '1rem'
                                style = {{
                                    color: '#4b4848',
                                    marginRight: '.2rem',
                                    position: 'relative',
                                    top: '.2rem'
                                }}
                                />   
                        { tank.default_profile.armor.hull['front']}/{tank.default_profile.armor.hull['rear']}/{tank.default_profile.armor.hull['sides'] }
                        </Typography>
                    </Box>
                            { tank.default_profile.armor.turret && (
                                <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                                >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#fafafa',
                                marginLeft: '.5rem',
                                textAlign: 'center'
                            }}
                            >
                            Turret HP:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#ab003c',
                                fontWeight: 'bold',
                                marginRight: '.5rem'
                            }}
                            >
                            <GiAbdominalArmor 
                                fontSize = '1rem'
                                style = {{
                                    color: '#4b4848',
                                    marginRight: '.2rem',
                                    position: 'relative',
                                    top: '.2rem'
                                }}
                                />   
                            { tank.default_profile.armor.turret?.[ 'front' ]}/{tank.default_profile.armor.turret?.[ 'sides' ]}/{ tank.default_profile.armor.turret?.[ 'rear' ] }
                        </Typography>
                    </Box>
                    )}
                        <Box
                        sx={{
                            flexDirection: 'column',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        >
                            <Typography
                                variant='body1'
                                sx={{
                                    alignItems: 'center',
                                    color: '#fafafa',
                                    display: 'flex',
                                }}
                            >
                            Description
                                <FaRegKeyboard 
                                    fontSize = '1rem'
                                    style = {{
                                        color: '#4b4848',
                                        marginLeft: '.4rem',
                                        position: 'relative',
                                        top: '.2rem'
                                    }}
                                />
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{
                                    color: '#ab003c',
                                    fontWeight: 'bold',
                                    marginLeft: '1rem',
                                    marginRight: '1rem',
                                    marginBottom: '1rem',
                                    textAlign: 'center'
                                }}
                            >
                                {tank.description}
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
                        backgroundColor: '#ab003c',
                        color: '#fafafa',
                        border: '2px solid transparent',
                        marginRight: '1rem',
                        width: '8rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: '#fafafa',
                            borderColor: '#ab003c',
                            boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
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

