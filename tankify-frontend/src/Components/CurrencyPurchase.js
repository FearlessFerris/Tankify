// CurrencyPurchase Component Implementation 


// Dependencies 
import React, { useEffect, useState } from 'react';
import { Box, Divider, TextField, Tooltip, Typography } from '@mui/material';
import { FaCoins } from 'react-icons/fa6';
import { GrMoney } from 'react-icons/gr';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import CurrencyPurchaseForm from './CurrencyPurchaseForm';


// Context Providers
import { useAlert } from '../ContextDirectory/AlertContext';
import { useUser } from '../ContextDirectory/UserContext';


// CurrencyPurchase Component 
function CurrencyPurchase({ user, onClose }) {

    const [dateTime, setDateTime] = useState(new Date());

    const fixNumber = (number) => Number(number).toLocaleString();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

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
                <span style={{ color: '#ab003c' }}> Credits </span>
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >

                <Typography
                    variant='h5'
                    sx={{
                        color: '#4b4848',
                        marginTop: '4rem',
                        marginBottom: '2rem'
                    }}
                >
                    Receipt
                </Typography>
            </Box>
            <Box

            >
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
                            width: '35rem',
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
                                {fixNumber(user?.credit_balance)} Credits
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
                {/* <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginTop: '1rem'
                    }}
                >
                    <Typography
                            variant="h5"
                            sx={{
                                color: '#fafafa',
                                marginRight: '4rem',
                                marginTop: '2rem'
                            }}
                        >
                            Credit Purchase Amount: 
                        </Typography>
                 <CurrencyPurchaseForm user = { user } />  
                 </Box> */ } 
            </Box>
        </Box>
    )
}

export default CurrencyPurchase;