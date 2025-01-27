// TankPurchase Component Implementation

// Dependencies
import React, { useState, useEffect } from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { GrMoney } from 'react-icons/gr';

// Context Providers
import { useUser } from '../ContextDirectory/UserContext';

// TankPurchase Component
function TankPurchase({ tank, onClose }) {
    
    const { user } = useUser();
    const [ dateTime, setDateTime ] = useState( new Date() );
    const [purchaseInformation] = useState({
        userId: '',
        tankPrice: '',
    });


    const fixNumber = (number) => Number(number).toLocaleString();

    const creditDifference = user?.credit_balance - tank.price;

    useEffect( () => {
      const intervalId = setInterval( () => {
        setDateTime( new Date() );
      }, 1000 );

      return () => clearInterval( intervalId );
    }, [] );

    return (
        <Box
            sx={{
                alignItems: 'center',
                backgroundColor: '#161616',
                borderRadius: '1rem',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '10rem',
                padding: '2rem',
                width: '50rem',
            }}
        >
            <Typography
                variant="h3"
                noWrap
                sx={{
                    color: '#fafafa',
                    overflow: 'hidden',
                    marginBottom: '4rem',
                    textAlign: 'center',
                    textOverflow: 'ellipsis',
                    width: '100%',
                }}
            >
                Purchase&nbsp;
                <span style={{ color: '#ab003c' }}>{tank.name}</span>
            </Typography>
            
            <Box 
              sx = {{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Typography
                variant = 'h5'
                sx = {{
                  color: '#4b4848'
                }}
              >
                Reciept
              </Typography>
            </Box>
            <Box>
                <Tooltip
                    arrow
                    title="Username"
                    placement="left"
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -4],
                                    },
                                },
                            ],
                        },
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'end',
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#fafafa',
                            }}
                        >
                            Username:
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#4b4848',
                                }}
                            >
                                { user.username }
                            </Typography>
                        </Box>
                    </Box>
                </Tooltip>
                <Tooltip
                    arrow
                    title="Date"
                    placement="left"
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -4],
                                    },
                                },
                            ],
                        },
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'end',
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#fafafa',
                            }}
                        >
                            Date:
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#4b4848',
                                }}
                            >
                                { dateTime.toLocaleDateString() }
                            </Typography>
                        </Box>
                    </Box>
                </Tooltip>

                <Tooltip
                    arrow
                    title="User Credit Balance"
                    placement="left"
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -4],
                                    },
                                },
                            ],
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'space-between',
                            width: '35rem',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#fafafa',
                            }}
                        >
                            User Credit Balance:
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <GrMoney
                                fontSize="1.5rem"
                                style={{
                                    color: '#4b4848',
                                }}
                            />
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#4b4848',
                                }}
                            >
                                {user?.credit_balance ? fixNumber(user.credit_balance) : 'NA'} Credits
                            </Typography>
                        </Box>
                    </Box>
                </Tooltip>
                <Tooltip
                    arrow
                    title="Vehicle Price"
                    placement="left"
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -4],
                                    },
                                },
                            ],
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '35rem',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#fafafa',
                            }}
                        >
                            Price:
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                gap: '0.5rem',
                            }}
                        >
                            <GrMoney
                                fontSize="1.5rem"
                                style={{
                                    color: '#4b4848',
                                }}
                            />
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#4b4848',
                                }}
                            >
                                {tank.price ? fixNumber(tank.price) : 'NA'} Credits
                            </Typography>
                        </Box>
                    </Box>
                </Tooltip>

                <Box
                    sx={{
                        height: '1px',
                        backgroundColor: '#4b4848',
                        marginY: '1rem',
                    }}
                ></Box>

                <Tooltip
                    arrow
                    title="Difference"
                    placement="left"
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -4],
                                    },
                                },
                            ],
                        },
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'end',
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '2rem',
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#fafafa',
                            }}
                        >
                            Difference:
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <GrMoney
                                fontSize="1.5rem"
                                style={{
                                    color: '#4b4848',
                                }}
                            />
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#4b4848',
                                }}
                            >
                                {user?.credit_balance ? fixNumber(creditDifference) : 'NA'} Credits
                            </Typography>
                        </Box>
                    </Box>
                </Tooltip>
                <Box
                    sx={{
                        alignItems: 'end',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '2rem',
                        width: '100%',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: creditDifference >= 0 ? '#fafafa' : '#ab003c',
                            display: 'block',
                            textAlign: 'center',
                            marginBottom: '2rem',
                            width: '100%',
                            lineHeight: '1.5rem',
                        }}
                    >
                        {creditDifference >= 0 ? (
                            <>
                                You have enough credits. Remaining:&nbsp;
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                    }}
                                >
                                    <GrMoney
                                        fontSize="1.2rem"
                                        style={{
                                            color: '#fafafa',
                                        }}
                                    />
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: '#fafafa',
                                            fontSize: '1.4rem',
                                        }}
                                    >
                                        {fixNumber(creditDifference)} Credits
                                    </Typography>
                                </Box>
                            </>
                        ) : (
                            <>
                                Insufficient credits. Short by:&nbsp;
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                    }}
                                >
                                    <GrMoney
                                        fontSize="1.2rem"
                                        style={{
                                            color: '#ab003c',
                                        }}
                                    />
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: '#ab003c',
                                            fontSize: '1.4rem',
                                        }}
                                    >
                                        {fixNumber(Math.abs(creditDifference))} Credits
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '2rem',
                                    }}
                                >
                                    <Button
                                        sx={{
                                            color: '#ab003c',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                            marginRight: '1rem',
                                            width: '9rem',
                                            '&:hover': {
                                                backgroundColor: '#ab003c',
                                                color: '#fafafa',
                                            },
                                        }}
                                    >
                                        Add Credits
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: '4rem',
                        gap: '2rem',
                    }}
                >
                    <Button
                        variant="filled"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#900C3F',
                            backgroundColor: '#161616',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                            fontStyle: 'bold',
                            fontSize: '1rem',
                            marginRight: '1rem',
                            transition: 'width 0.3s ease, background-color 0.3s ease, color 0.3s ease',
                            width: '10rem',
                            overflow: 'hidden',
                            position: 'relative',
                            '&:hover': {
                                backgroundColor: '#ab003c',
                                color: '#2b2a2e',
                                width: '18rem',
                            },
                            '& .default-text': {
                                opacity: 1,
                                transition: 'opacity 0.2s ease',
                                transitionDelay: '0.1s',
                            },
                            '& .hover-text': {
                                position: 'absolute',
                                opacity: 0,
                                whiteSpace: 'nowrap',
                                transition: 'opacity 0.2s ease',
                                transitionDelay: '0.2s',
                            },
                            '&:hover .default-text': {
                                opacity: 0,
                                transitionDelay: '0s',
                            },
                            '&:hover .hover-text': {
                                opacity: 1,
                                transitionDelay: '0.2s',
                            },
                            '&:not(:hover) .default-text': {
                                opacity: 1,
                                transitionDelay: '0.2s',
                            },
                            '&:not(:hover) .hover-text': {
                                opacity: 0,
                                transitionDelay: '0s',
                            },
                        }}
                    >
                        <Box className="default-text">
                            <GrMoney
                                fontSize="1.4rem"
                                style={{
                                    marginRight: '0.5rem',
                                    position: 'relative',
                                    top: '0.2rem',
                                }}
                            />
                            Purchase
                        </Box>
                        <Box className="hover-text">
                            <GrMoney
                                fontSize="1.4rem"
                                style={{
                                    color: '#fafafa',
                                    marginRight: '0.5rem',
                                    position: 'relative',
                                    top: '0.3rem',
                                }}
                            />
                            Purchase for{' '}
                            <span style={{ color: '#fafafa' }}>
                                {fixNumber(tank.price)} Credits
                            </span>
                        </Box>
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="filled"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#900C3F',
                            backgroundColor: '#161616',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                            fontStyle: 'bold',
                            fontSize: '1.1rem',
                            marginRight: '1rem',
                            width: '8rem',
                            '&:hover': {
                                backgroundColor: '#ab003c',
                                color: '#2b2a2e',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default TankPurchase;