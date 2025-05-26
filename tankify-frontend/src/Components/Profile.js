// Profile Component Implementation 


// Dependencies 
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Backdrop, Box, Button, FormControlLabel, IconButton, Menu, MenuItem, Switch, Tooltip, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import cardImage from '../Static/card.png';
import EditUser from './Edituser';
import PaymentForm from './PaymentForm';
import ProfileInformationContainer from './ProfileInformationContainer';
import PurchaseForm from './PurchaseForm';


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext';
import { useAlert } from '../ContextDirectory/AlertContext';
import { PaymentOutlined } from '@mui/icons-material';


// Profile Component 
function Profile() {

    // Call Custom Hooks 
    const showAlert = useAlert();
    const { user, refreshUserData, fetchDefaultCurrency } = useUser();

    // State Variables 
    const [anchorEl, setAnchorEl] = useState(null);
    const [addCurrencyOpen, setAddCurrencyOpen] = useState(false);
    const [cardAddOpen, setCardAddOpen] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [editPaymentOpen, setEditPaymentOpen] = useState(null);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [isDefault, setIsDefault] = useState(false);
    const [open, setOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [removingPaymentMethods, setRemovingPaymentMethods] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('');

    // Helper Functions -------------------------------------------------------------

    // API Helper Functions 
    const fetchPaymentMethods = async (userId) => {
        try {
            const response = await apiClient.get(`/payments/${userId}/all`);
            setPaymentMethods(response.data.data);
        }
        catch (error) {
            console.error('Error fetching payment methods', error);
        }
    };

    const fetchCurrencies = useCallback(async () => {
        try {
            const response = await apiClient.get(`/currencies/all`);
            setCurrencies(response.data.data || []);
        }
        catch (error) {
            console.error(`Error fetching currencies`, error);
        }
    }, []);

    const handleCurrencyChange = async (currencyId, userId) => {
        try {
            const response = await apiClient.patch(`/users/${userId}/default-currency`, {
                currency_id: currencyId,
            });
            if (response.status === 200) {
                setSelectedCurrency(response.data.data.iso);
                showAlert(response.data.message, 'success');
            }
            else {
                showAlert('Failed to update default currency', 'error');
            }
        }
        catch (error) {
            console.error('Error updating default currency', error);
            showAlert('Failed to update default currency', 'error');
        }
        finally {
            setAnchorEl(null);
        }
    };

    const removePaymentMethod = async (cardId, userId) => {
        try {
            const response = await apiClient.delete(`/payments/${cardId}`);
            if (response.status === 200) {
                await fetchPaymentMethods(userId);
                showAlert(response.data.message, 'success');
            }
        }
        catch (error) {
            console.error('Error removing payment method', error);
            showAlert('Failed to remove payment method', 'error');
        }
    };

    const setDefaultPaymentMethod = async (paymentId, userId) => {
        try {
            const response = await apiClient.patch(`/payments/${userId}/card/${paymentId}`);
            if (response.status === 200) {
                await fetchPaymentMethods(userId);
                showAlert(response.data.message, 'success');
            }
        }
        catch (error) {
            console.error('Error setting the default payment method', error);
            showAlert('Failed to update the defailt payment method', 'error');
        }
    };

    // Initial Data Fetching ------------------------------------------------------------

    // Fetch Payment Methods
    useEffect(() => {
        const userId = user?.id;
        if (!userId) return;
        fetchPaymentMethods(userId);
    }, [user?.id]);

    // Fetch Currencies 
    useEffect(() => {
        fetchCurrencies();
    }, [fetchCurrencies]);

    // Fetch Default Currency 
    useEffect(() => {
        const userId = user?.id;
        if (userId && !user.default_currency) {
            fetchDefaultCurrency(userId)
        }
    }, [user?.id]);

    // Refresh User Data 
    useEffect(() => {
        const userId = user?.id;
        if (!userId) return;
        refreshUserData()
    }, [refreshUserData]);

    // State Handler Functions --------------------------------------------------------------- 

    // Handle Default Currency Menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    // Handle Edit User 
    const handleEditUserOpen = () => {
        setOpen(true);
        setEditUserOpen(true);
    }

    const handleEditUserClose = () => {
        setOpen(false);
        setEditUserOpen(false);
    }

    // Handle Edit Payment 
    const handleEditPaymentOpen = (cardId) => {
        setOpen(true);
        setOpenCount((previous) => previous + 1);
        setEditPaymentOpen(cardId);
    }

    const handleEditPaymentClose = () => {
        setOpen(false);
        setEditPaymentOpen(null);
    }

    // Handle Card Add 
    const handleCardAddOpen = () => {
        setOpen(true);
        setOpenCount((previous) => previous + 1);
        setCardAddOpen(true);
    }

    const handleCardAddClose = () => {
        setOpen(false);
        setCardAddOpen(false);
    }

    // Handle Add Currency 
    const handleAddCurrencyOpen = () => {
        setOpen(true);
        setAddCurrencyOpen(true);
    }

    const handleAddCurrencyClose = () => {
        setOpen(false);
        setAddCurrencyOpen(false);
    }

    // Handle Update Payment Method 
    const handleUpdatePaymentMethod = ( updatedCard ) => { 
        setPaymentMethods(( previousMethods ) => 
            previousMethods.map(( method ) => 
                method.id === updatedCard.id ? updatedCard : method
            )
        )
    }

    // Handle Remove Payment Method 
    const handleRemovePaymentMethod = () => {
        setRemovingPaymentMethods((previous) => !previous);
    }

    // Modular Input Renders -------------------------------------------------------------------

    // Username Container Render 
    const renderUsernameContainer = () => {

        return (
            <>
                <Box
                    sx={{
                        position: 'relative',
                        height: '12rem',
                        width: '12rem',
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
                    sx={sxStyles}
                >
                    <ProfileInformationContainer
                        label='Email'
                        value={user.email}
                        tooltip='User Email'
                    />
                    <ProfileInformationContainer
                        label='Account Created'
                        value={new Date(user.created_at).toLocaleDateString()}
                        tooltip='Date Account Created'
                    />
                </Box>
                <Button
                    onClick={handleEditUserOpen}
                    size='large'
                    variant='filled'
                    startIcon={<EditIcon sx={{ transition: 'color 0.3s ease' }} />}
                    sx={buttonSxStyle}
                >
                    Edit
                </Button>
            </>
        )
    }

    // User Balances Render 
    const renderUserBalancesContainer = () => {
        return (
            <>
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
                        sx={sxStyles}
                    >
                        <ProfileInformationContainer
                            label='Gold Balance'
                            value={`$${user.gold_balance}`}
                            tooltip='Gold Balance'
                        />
                        <ProfileInformationContainer
                            label='Credit Balance'
                            value={`$${user.credit_balance}`}
                            tooltip='Credit Balance'
                        />
                    </Box>
                </Box>
                <Button
                    onClick={handleAddCurrencyOpen}
                    size='large'
                    variant='filled'
                    startIcon={<EditIcon sx={{ transition: 'color 0.3s ease' }} />}
                    sx={buttonSxStyle}
                >
                    Add
                </Button>
            </>
        )
    }

    // Payment Methods Render 
    const renderPaymentMethods = () => {
        return (
            <>
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
                            marginTop: '1rem',
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
                                    sx = {{ 
                                        ...sxStyles,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        position: 'relative',
                                        marginTop: '1rem',
                                        marginBottom: '1rem'
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
                                                    onChange={() => setDefaultPaymentMethod(method.id, user.id ) }
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
                                            onClick={() => removingPaymentMethods ? removePaymentMethod(method.id) : handleEditPaymentOpen(method.id)}
                                            variant="filled"
                                            sx = {{
                                                ...buttonSxStyle,
                                                height: '1.8rem',
                                                marginTop: '.5rem',
                                                width: '6rem'
                                            }}
                                        >
                                            {removingPaymentMethods ? 'Remove' : 'Edit'}
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
                            onClick={handleCardAddOpen}
                            startIcon = { <MdOutlineAdd sx = {{ color: '#fafafa', transition: 'color 0.3s ease' }} /> }
                            variant='filled'
                            sx = {{ 
                                ...buttonSxStyle, 
                                marginRight: '1rem'
                            }}
                        >
                            Add
                        </Button>
                        <Button
                            onClick={handleRemovePaymentMethod}
                            startIcon = { <MdOutlineRemove sx = {{ color: '#fafafa', transition: 'color 0.3s ease' }} /> }
                            variant='filled'
                            sx = { buttonSxStyle }
                        >
                            {removingPaymentMethods ? 'Done' : 'Remove'}
                        </Button>
                    </Box>
                </Box>
            </>
        )
    }

    // General Settings Render 
    const renderGeneralSettings = () => { 
        return( 
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
                        sx = { sxStyles }
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
                                                onClick={ () => handleCurrencyChange(currency.id, user.id ) }
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
                        sx = { buttonSxStyle }
                    >
                        Edit
                    </Button>

                </Box>
        )
    }

    // Backdrop / Form Render 
    const renderBackdrop = () => { 
        return( 
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
                        user = {user}
                        onClose={ handleEditUserClose }
                    />
                )}
                {editPaymentOpen ? (
                    <PaymentForm
                        onClose={ handleEditPaymentClose }
                        refreshPaymentMethods={() => fetchPaymentMethods(user.id)}
                        cardId={editPaymentOpen}
                        updatePaymentMethod={ handleUpdatePaymentMethod }
                        userId={user.id}
                        openCount={openCount}
                    />
                ) : cardAddOpen ? (
                    <PaymentForm
                        onClose={ handleCardAddClose }
                        refreshPaymentMethods={() => fetchPaymentMethods(user.id)}
                        userId={user.id}
                    />
                ) : null}
                {addCurrencyOpen && (
                    <PurchaseForm
                        information={user}
                        onClose={ handleAddCurrencyClose }
                    />
                )}
            </Backdrop>
        </Box>
        )
    }

    // SX Styles 
    const sxStyles = {
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
    }

    // Button SX Style 
    const buttonSxStyle = {
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
    }

    // Profile Component SX Styles 
    const profileComponentSxStyles = {
        backgroundColor: '#0d0d0d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '5rem',
        maxWidth: '45rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '.1rem solid #0f0e0e',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden'
    }

    // Profile Component Render 
    return (
        <>
            <Box
                sx={{
                    marginBottom: '5rem',
                    marginTop: '10rem'
                }}
            >
                <Box
                    sx={profileComponentSxStyles}
                >
                    {renderUsernameContainer()}
                </Box>
                <Box
                    sx={profileComponentSxStyles}
                >
                    {renderUserBalancesContainer()}
                </Box>
                <Box
                    sx={profileComponentSxStyles}
                >
                    {renderPaymentMethods()}
                </Box>
                <Box 
                    sx = { profileComponentSxStyles }
                > 
                    { renderGeneralSettings() }
                </Box>
                { renderBackdrop() }
            </Box>
        </>
    )
}

export default Profile; 