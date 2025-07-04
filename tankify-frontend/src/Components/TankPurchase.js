// TankPurchase Component Implementation


// Dependencies
import React, { useState, useEffect } from 'react';
import { Box, Button, CardMedia, Divider, Tooltip, Typography } from '@mui/material';
import { GrMoney } from 'react-icons/gr';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import Confirmation from './Confirmation';


// Context Providers
import { useAlert } from '../ContextDirectory/AlertContext';
import { useUser } from '../ContextDirectory/UserContext';


// TankPurchase Component
function TankPurchase({ tank, onClose }) {

    const { user, refreshUserData } = useUser();
    const showAlert = useAlert();
    const [ dateTime, setDateTime ] = useState(new Date());
    const [ open, setOpen ] = useState( false );
    const [ purchaseInformation ] = useState({
        userId: '',
        tankPrice: '',
    });
    const fixNumber = (number) => Number(number).toLocaleString();
    const creditDifference = user?.credit_balance - tank.price;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    
    const handlePurchase = async () => {
        const payload = {
            userId: user.id,
            paymentSource: 'in_app_credit',
            amount: parseInt( tank.price, 10 )
        }
        try {
            const response = await apiClient.post(`/transaction/purchase`, payload );
            showAlert( `${ response.data.message } ${ fixNumber( tank.price )} credits`, 'success' );
            await refreshUserData();
            onClose();
        }
        catch (error) {
            console.error( 'Error handling purchase request' );
        }
    }

    const handleOpen = () => setOpen( true );
    const handleClose = () => setOpen( false );
    const handleConfirm = () => {
        console.log( 'Purchase Confirmed' );
        handlePurchase();
        handleClose();
    }

    return (
        <Box
            sx={{
                alignItems: 'center',
                backgroundColor: '#0d0d0d',
                borderRadius: '1rem',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '10rem',
                padding: '2rem',
                width: '42rem',
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
                sx={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '6rem',
                        marginBottom: '4rem'
                    }}
                >
                    <CardMedia
                        component='img'
                        image={tank.image}
                        alt={`${tank.name}`}
                        sx={{
                            position: 'absolute',
                            zIndex: 1,
                            width: '23rem',
                        }}
                    />
                </Box>
                <Typography
                    variant='h5'
                    sx={{
                        color: '#4b4848',
                        marginTop: '8rem',
                        marginBottom: '2rem'
                    }}
                >
                    Receipt
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
                                {user.username}
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
                                {dateTime.toLocaleDateString()}
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
                            width: '36rem',
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
                            width: '36rem',
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

                <Divider 
                    aria-hidden = 'true'
                    sx = {{ 
                        backgroundColor: '#fafafa',
                        marginTop: '1rem',
                        marginBottom: '1rem'
                    }}
                /> 

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
                        marginTop: '3rem',
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
                                        marginLeft: '1rem'
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
                                            fontSize: '1.4rem'
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
                                        marginLeft: '1rem'
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
                    { creditDifference >= 0 ? (
                        <>
                        <Button
                        onClick = { handleOpen }
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
                                color: '#fafafa',
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
                                    top: '0.3rem',
                                }}
                                />
                            Purchase
                        </Box>
                        <Box 
                            className = "hover-text"
                        >
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
                </>
                    ):(
                        <>
                        <Button
                        onClick = { () => { console.log( 'Purchasing Credits' ) } }
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
                            width: '12rem',
                            overflow: 'hidden',
                            position: 'relative',
                            '&:hover': {
                                backgroundColor: '#ab003c',
                                color: '#fafafa',
                                width: '20rem',
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
                            Purchase Credits 
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
                            Purchase credits to buy this vehicle
                        </Box>
                    </Button>
                </>
                )}
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
                                color: '#fafafa',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
            { open && (
                <Confirmation 
                    open = { open }
                    onClose = { onClose }
                    onConfirm = { handleConfirm }
                />
            )}
        </Box>
    );
}

export default TankPurchase;