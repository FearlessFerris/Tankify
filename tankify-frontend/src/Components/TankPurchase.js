// TankPurchase Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Box, TextField, Tooltip, Typography } from '@mui/material';
import { GrMoney } from 'react-icons/gr';


// Components & Necessary Files 


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext';


// TankPurchase Component 
function TankPurchase({ tank }) {
    const { user } = useUser();
    const [purchaseInformation, setPurchaseInformation] = useState({
        userId: '',
        tankPrice: '',
    });

    const fixNumber = (number) => Number(number).toLocaleString();
    const creditDifference = user?.credit_balance - tank.price;

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
                width: '45rem',
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
                <span
                    style={{
                        color: '#ab003c',
                    }}
                >
                    {tank.name}
                </span>
            </Typography>

            <Box>
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
                            width: '100%',
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
                                {tank.price ? fixNumber(tank.price) : 'NA'} Credits
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
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#fafafa'
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
                                color: '#fafafa'
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
                                {user?.credit_balance ? fixNumber( creditDifference ) : 'NA'} Credits
                            </Typography>
                        </Box>
                    </Box>
                </Tooltip>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        color: creditDifference >= 0 ? '#062310' : '#800000',
                    }}
                >
                    {creditDifference >= 0
                        ? `You have enough credits. Remaining after purchase: ${fixNumber(
                              creditDifference
                          )}`
                        : `Insufficient credits. Short by: ${fixNumber(
                              Math.abs(creditDifference)
                          )} Credits`}
                </Typography>
            </Box>
        </Box>
    );
}

export default TankPurchase;