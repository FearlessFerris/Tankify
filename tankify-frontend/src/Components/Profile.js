// Profile Component Implementation 


// Dependencies 
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Backdrop, Box, Button, FormControlLabel, IconButton, Menu, MenuItem, Switch, Tooltip, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import cardImage from '../Static/card.png';
import EditUser from './Edituser';
import PaymentForm from './PaymentForm';
import PurchaseForm from './PurchaseForm';


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext';
import { useAlert } from '../ContextDirectory/AlertContext';


// Profile Component 
function Profile() {

    const showAlert = useAlert();
    const { user, refreshUserData, fetchDefaultCurrency } = useUser();
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);
    const [isDefault, setIsDefault] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [editPaymentOpen, setEditPaymentOpen] = useState(null);
    const [cardAddOpen, setCardAddOpen] = useState(false);
    const [addCurrencyOpen, setAddCurrencyOpen] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [removingMethods, setRemovingMethods] = useState(false);



    const fetchPaymentMethods = async (userId) => {
        try {
            const response = await apiClient.get(`/payments/${userId}/all`);
            setPaymentMethods(response.data.data);
        }
        catch (error) {
            console.error('Error fetching user payment methods', error);
        }
    }

    const fetchCurrencies = useCallback(async () => {
        try {
            const response = await apiClient.get('/currencies/all');
            setCurrencies(response.data.data || []);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    }, [])

    // const fetchDefaultCurrency = async (userId) => {
    //     try {
    //         const response = await apiClient.get(`/users/${userId}/default-currency`);
    //         if (response.status === 200) {
    //             const defaultCurrency = response.data.data;
    //             setSelectedCurrency(defaultCurrency.iso);
    //         }
    //     }
    //     catch (error) {
    //         console.error('Error fetching default currency');
    //         showAlert(`Failed to retrieve default currency`, 'error');
    //     }
    // }

    const handleCurrencyChange = async (currencyId) => {
        if (!user?.id) {
            showAlert('User not logged in', 'error');
            return;
        }
        try {
            const response = await apiClient.patch(`/users/${user.id}/default-currency`, {
                currency_id: currencyId,
            });
            if (response.status === 200) {
                setSelectedCurrency(response.data.data.iso);
                showAlert(response.data.message, 'success');
            } else {
                showAlert('Failed to update default currency.', 'error');
            }
        } catch (error) {
            console.error('Error updating default currency:', error);
            showAlert('Failed to update default currency.', 'error');
        } finally {
            setAnchorEl(null);
        }
    };

    const removePaymentMethod = async (cardId) => {
        try {
            const response = await apiClient.delete(`/payments/${cardId}`);
            if (response.status === 200) {
                showAlert(response.data.message, 'success')
                await fetchPaymentMethods(user.id);
            }
            else {
                showAlert(response.data.message, 'error');
            }
        }
        catch (error) {
            console.error('Error removing payment method', error)
        }
    }

    const setDefaultPaymentMethod = async (paymentId) => {
        try {
            const response = await apiClient.patch(`/payments/${user.id}/card/${paymentId}`);
            if (response.status === 200) {
                await fetchPaymentMethods(user.id);
                showAlert(response.data.message, 'success');
            }
            else {
                showAlert(response.data.message, 'error');
            }
        }
        catch (error) {
            console.error('Error setting the default payment method', error);
            showAlert('Failed to update the default payment method', 'error')
        }
    }

    const updatePaymentMethod = (updatedCard) => {
        setPaymentMethods((prevMethods) =>
            prevMethods.map((method) =>
                method.id === updatedCard.id ? updatedCard : method
            )
        );
    };

    useEffect(() => {
        if (user?.id) {
            fetchPaymentMethods(user.id);
            if (!user.default_currency) {
                fetchDefaultCurrency(user.id);
            }
            fetchCurrencies();
            refreshUserData();
        }
    }, [user?.id, fetchCurrencies]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const oneditUserOpen = () => {
        setOpen(true);
        setEditUserOpen(true);
    }

    const onEditUserClose = () => {
        setOpen(false);
        setEditUserOpen(false);
    }

    const onEditPaymentOpen = (cardId) => {
        setOpen(true);
        setOpenCount((previous) => previous + 1);
        setEditPaymentOpen(cardId);
    }

    const onEditPaymentClose = () => {
        setOpen(false);
        setEditPaymentOpen(null);
    }

    const onCardOpen = () => {
        setOpen(true);
        setOpenCount((previous) => previous + 1);
        setCardAddOpen(true);
    }

    const onAddCurrencyOpen = () => {
        setOpen(true);
        setAddCurrencyOpen(true);
    }

    const onCardClose = () => {
        setOpen(false);
        setCardAddOpen(false);
    }

    const onAddCurrencyClose = () => {
        setOpen(false);
        setAddCurrencyOpen(false);
    }

    const handleRemovingMethods = () => {
        setRemovingMethods((previous) => !previous);
    }

    return (
        <>
            <div
                className='profile-container'
                style={{
                    backgroundColor: '#0d0d0d',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '10rem',
                    maxWidth: '45rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    border: '.1rem solid #0f0e0e',
                    borderRadius: '1rem',
                    padding: '2rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '12rem',
                        height: '12rem',
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <img
                        src={user.image}
                        alt="User profile"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '.2rem solid #ab003c',
                        }}
                    />
                    {hover && (
                        <PhotoCamera
                            sx={{
                                position: 'absolute',
                                bottom: '0.5rem',
                                right: '0.5rem',
                                color: '#ab003c',
                                fontSize: '2.5rem',
                                backgroundColor: '#fafafa',
                                borderRadius: '50%',
                                padding: '0.3rem',
                                cursor: 'pointer',
                            }}
                        />
                    )}
                </Box>
                <Typography
                    variant='h2'
                    sx={{
                        color: '#fafafa',
                        marginBottom: '1rem',
                    }}
                >
                    Welcome, <span style={{ color: '#ab003c' }}>{user.username}</span>
                </Typography>

                <Box
                    sx={{
                        backgroundColor: '#0d0d0d',
                        border: '2px solid transparent',
                        borderRadius: '1rem',
                        padding: '1rem',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                        transition: 'all 0.3s ease',
                        marginBottom: '2rem',
                        marginTop: '2rem',
                        width: '40rem',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            borderColor: '#ab003c',
                            boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#ab003c',
                            }}
                        >
                            Email:
                        </Typography>
                        <Tooltip
                            arrow
                            title='User Email'
                            placement='left-start'
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [2, -2],
                                            },
                                        },
                                    ],
                                }
                            }
                            }
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#fafafa',
                                }}
                            >
                                {user.email}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#ab003c',
                            }}
                        >
                            Account Created:
                        </Typography>
                        <Tooltip
                            arrow
                            title='Date Account Created'
                            placement='left-start'
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [2, -2],
                                            },
                                        },
                                    ],
                                },
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#fafafa',
                                }}
                            >
                                {new Date(user.created_at).toLocaleDateString()}
                            </Typography>
                        </Tooltip>
                    </Box>
                </Box>

                <Button
                    onClick={oneditUserOpen}
                    size='large'
                    variant='filled'
                    startIcon={<EditIcon sx={{ transition: 'color 0.3s ease' }} />}
                    sx={{
                        color: '#fafafa',
                        backgroundColor: '#ab003c',
                        border: '2px solid transparent',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                        transition: 'all 0.3s ease',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        width: '8rem',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: '#fafafa',
                            borderColor: '#ab003c',
                            boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                        },
                    }}
                >
                    Edit
                </Button>
            </div>
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#0d0d0d',
                    border: '.1rem solid #0f0e0e',
                    borderRadius: '1rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '2rem',
                    maxWidth: '45rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '2rem',
                    overflow: 'hidden',
                    padding: '2rem',
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '45rem',
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            color: '#fafafa',
                        }}
                    >
                        User <span style={{ color: '#ab003c' }}>Balances</span>
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: '#0d0d0d',
                            border: '2px solid transparent',
                            borderRadius: '1rem',
                            padding: '1rem',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                            transition: 'all 0.3s ease',
                            marginBottom: '2rem',
                            marginTop: '2rem',
                            width: '40rem',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                borderColor: '#ab003c',
                                boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#ab003c',
                                }}
                            >
                                Gold Balance:
                            </Typography>
                            <Tooltip
                                arrow
                                title="Gold Balance"
                                placement="left-start"
                                slotProps={{
                                    popper: {
                                        modifiers: [
                                            {
                                                name: 'offset',
                                                options: {
                                                    offset: [2, -2],
                                                },
                                            },
                                        ],
                                    },
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: '#fafafa',
                                    }}
                                >
                                    ${user.gold_balance}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#ab003c',
                                }}
                            >
                                Credit Balance:
                            </Typography>
                            <Tooltip
                                arrow
                                title="Credit Balance"
                                placement="left-start"
                                slotProps={{
                                    popper: {
                                        modifiers: [
                                            {
                                                name: 'offset',
                                                options: {
                                                    offset: [2, -2],
                                                },
                                            },
                                        ],
                                    },
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: '#fafafa',
                                    }}
                                >
                                    ${user.credit_balance}
                                </Typography>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Button
                        onClick={onAddCurrencyOpen}
                        variant='filled'
                        sx={{
                            color: '#fafafa',
                            backgroundColor: '#ab003c',
                            border: '2px solid transparent',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                            transition: 'all 0.3s ease',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            width: '8rem',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: '#fafafa',
                                borderColor: '#ab003c',
                                boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                            },
                        }}
                    >
                        Add
                    </Button>
                </Box>
            </div>

            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#0d0d0d',
                    border: '.1rem solid #0f0e0e',
                    borderRadius: '1rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '2rem',
                    maxWidth: '45rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '2rem',
                    overflow: 'hidden',
                    padding: '2rem'
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '45rem'
                    }}
                >
                    <Typography
                        variant='h3'
                        sx={{
                            color: '#fafafa'
                        }}
                    >
                        Payment <span style={{ color: '#ab003c' }}> Methods </span>
                    </Typography>
                    <Box
                        sx={{
                            marginTop: '2rem',
                            width: '40rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                        }}
                    >
                        {paymentMethods.length > 0 ? (
                            paymentMethods.map((method, index) => (
                                <Box
                                    key={method.id}
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#0d0d0d',
                                        borderRadius: '1rem',
                                        padding: '1rem',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '8rem',
                                            height: '5rem',
                                            backgroundImage: `url(${cardImage})`,
                                            backgroundSize: 'cover',
                                            borderRadius: '0.5rem',
                                            marginRight: '1rem',
                                        }}
                                    />
                                    <Box sx={{ flex: 1, position: 'relative' }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: '#fafafa',
                                                marginBottom: '0.5rem',
                                            }}
                                        >
                                            {method.cardholder_name}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#ab003c',
                                            }}
                                        >
                                            {method.type} - **** {method.card_number.slice(-4)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#fafafa',
                                                opacity: 0.7,
                                            }}
                                        >
                                            Expires: {method.expiry}
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={method.default_method}
                                                    onChange={() => setDefaultPaymentMethod(method.id)}
                                                    sx={{
                                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                                            color: '#ab003c',
                                                        },
                                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                            backgroundColor: '#ab003c',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Default"
                                            sx={{
                                                position: 'absolute',
                                                top: '0rem',
                                                right: '0.1rem',
                                                color: '#fafafa'
                                            }}
                                        />
                                        <Button
                                            onClick={() => removingMethods ? removePaymentMethod(method.id) : onEditPaymentOpen(method.id)}
                                            variant="filled"
                                            sx={{
                                                color: '#fafafa',
                                                backgroundColor: '#0d0d0d',
                                                border: '2px solid transparent',
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                                transition: 'all 0.3s ease',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                width: '8rem',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                    color: '#fafafa',
                                                    borderColor: '#ab003c',
                                                    boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                                                },
                                            }}
                                        >
                                            {removingMethods ? 'Remove' : 'Edit'}
                                        </Button>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#fafafa',
                                    marginTop: '2rem',
                                    textAlign: 'center'
                                }}
                            >
                                No payment methods added yet.
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            marginTop: '2rem'
                        }}
                    >
                        <Button
                            onClick={onCardOpen}
                            variant='filled'
                            sx={{
                                color: '#fafafa',
                                backgroundColor: '#ab003c',
                                border: '2px solid transparent',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                transition: 'all 0.3s ease',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                marginRight: '1rem',
                                width: '8rem',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#fafafa',
                                    borderColor: '#ab003c',
                                    boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                                },
                            }}
                        >
                            Add
                        </Button>
                        <Button
                            onClick={handleRemovingMethods}
                            variant='filled'
                            sx={{
                                color: '#fafafa',
                                backgroundColor: '#ab003c',
                                border: '2px solid transparent',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                transition: 'all 0.3s ease',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                width: '8rem',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#fafafa',
                                    borderColor: '#ab003c',
                                    boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                                },
                            }}
                        >
                            {removingMethods ? 'Done' : 'Remove'}
                        </Button>
                    </Box>
                </Box>
            </div>
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#0d0d0d',
                    border: '.1rem solid #0f0e0e',
                    borderRadius: '1rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '45rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '6rem',
                    overflow: 'hidden',
                    padding: '2rem'
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        width: '45rem'
                    }}
                >
                    <Typography
                        variant='h3'
                        sx={{
                            color: '#fafafa'
                        }}
                    >
                        General <span style={{ color: '#ab003c' }}> Settings </span>
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: '#0d0d0d',
                            border: '2px solid transparent',
                            borderRadius: '1rem',
                            padding: '1rem',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                            transition: 'all 0.3s ease',
                            marginBottom: '2rem',
                            marginTop: '2rem',
                            width: '40rem',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                borderColor: '#ab003c',
                                boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#ab003c',
                                }}
                            >
                                Default Currency:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h5" sx={{ color: '#fafafa', marginRight: '0.5rem' }}>
                                    {selectedCurrency}
                                </Typography>
                                <Tooltip title="Change Currency">
                                    <IconButton
                                        onClick={handleMenuOpen}
                                        sx={{
                                            color: '#fafafa',
                                            '&:hover': {
                                                color: '#ab003c',
                                            },
                                        }}
                                    >
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    sx={{
                                        '& .MuiPaper-root': {
                                            backgroundColor: '#0d0d0d',
                                            color: '#fafafa',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                                        },
                                    }}
                                >
                                    {currencies
                                        .filter((currency) => currency.iso !== 'GOLD' && currency.iso !== 'CRED')
                                        .map((currency) => (
                                            <MenuItem
                                                key={currency.id}
                                                onClick={() => handleCurrencyChange(currency.id)}
                                                sx={{
                                                    backgroundColor: selectedCurrency === currency.id ? '#ab003c' : 'inherit',
                                                    '&:hover': {
                                                        backgroundColor: '#ab003c',
                                                        color: '#fafafa',
                                                    },
                                                }}
                                            >
                                                {currency.name} ({currency.symbol})
                                            </MenuItem>
                                        ))}
                                </Menu>
                            </Box>
                        </Box>
                    </Box>
                    <Button
                        size='large'
                        variant='filled'
                        startIcon={<EditIcon sx={{ transition: 'color 0.3s ease' }} />}
                        sx={{
                            color: '#fafafa',
                            backgroundColor: '#ab003c',
                            border: '2px solid transparent',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                            transition: 'all 0.3s ease',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            marginRight: '1rem',
                            width: '8rem',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: '#fafafa',
                                borderColor: '#ab003c',
                                boxShadow: '0 0 10px rgba(171, 0, 60, 0.5)',
                            },
                        }}
                    >
                        Edit
                    </Button>

                </Box>
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <Backdrop
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setEditUserOpen(false);
                        setEditPaymentOpen(null);
                        setCardAddOpen(false);
                        setAddCurrencyOpen(false);
                    }}
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {editUserOpen && (
                        <EditUser
                            user={user}
                            onClose={onEditUserClose}
                        />
                    )}
                    {editPaymentOpen ? (
                        <PaymentForm
                            onClose={onEditPaymentClose}
                            refreshPaymentMethods={() => fetchPaymentMethods(user.id)}
                            cardId={editPaymentOpen}
                            updatePaymentMethod={updatePaymentMethod}
                            userId={user.id}
                            openCount={openCount}
                        />
                    ) : cardAddOpen ? (
                        <PaymentForm
                            onClose={onCardClose}
                            refreshPaymentMethods={() => fetchPaymentMethods(user.id)}
                            userId={user.id}
                        />
                    ) : null}
                    {addCurrencyOpen && (
                        <PurchaseForm
                            information={user}
                            onClose={onAddCurrencyClose}
                        />
                    )}
                </Backdrop>
            </Box>
        </>
    );
}

export default Profile;