// Profile Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Backdrop, Box, Button, Typography, TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import EditUser from './Edituser';
import PaymentForm from './PaymentForm';
import cardImage from '../Static/card.png';


// Context Providers 
import { useUser } from '../ContextDirectory/UserContext';
import { useAlert } from '../ContextDirectory/AlertContext';
import { formControlClasses } from '@mui/material';


// Profile Component 
function Profile() {

    const showAlert = useAlert();
    const { user } = useUser();
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [cardAddOpen, setCardAddOpen] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [ removingMethods, setRemovingMethods ] = useState( false );
    
    const fetchPaymentMethods = async (userId) => {
        try {
            const response = await apiClient.get(`/payments/${userId}/all`);
            console.log(response.data);
            setPaymentMethods(response.data.data);
        }
        catch (error) {
            console.error('Error fetching user payment methods', error);
        }
    }

    const removePaymentMethod = async ( card_id ) => {
        try{
            const response = await apiClient.delete( `/payments/${ card_id}` );
            if ( response.status === 200 ){
                showAlert( response.data.message, 'success' )
                await fetchPaymentMethods( user.id ); 
            }
            else {
                showAlert( response.data.message, 'error' );
            }
        }
        catch( error ){
            console.error( 'Error removing payment method', error )
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchPaymentMethods(user.id);
        }
    }, [user?.id]);

    const onEditOpen = () => {
        setOpen(true);
        setEditOpen(true);
    }

    const onEditClose = () => {
        setOpen(false);
        setEditOpen(false);
    }

    const onCardOpen = () => {
        setOpen(true);
        setCardAddOpen(true);
    }

    const onCardClose = () => {
        setOpen(false);
        setCardAddOpen(false);
    }

    const handleRemovingMethods = () => {
        setRemovingMethods(( previous ) => !previous );
    }

    return (
        <>
            <div
                className='profile-container'
                style={{
                    backgroundColor: '#161616',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '10rem',
                    maxWidth: '45rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    border: '.1rem solid #0f0e0e',
                    borderRadius: '.3rem',
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
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{ color: '#ab003c' }}
                    >
                        Email:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant='h4'
                            sx={{ color: '#fafafa', marginRight: '0.5rem' }}
                        >
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{ color: '#ab003c' }}
                    >
                        Balance:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant='h4'
                            sx={{ color: '#fafafa', marginRight: '0.5rem' }}
                        >
                            ${user.balance}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{ color: '#ab003c' }}
                    >
                        Account Created:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant='h4'
                            sx={{ color: '#fafafa', marginRight: '0.5rem' }}
                        >
                            {new Date(user.created_at).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    onClick={onEditOpen}
                    size='large'
                    variant='filled'
                    startIcon={<EditIcon sx={{ transition: 'color 0.3s ease' }} />}
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
                    Edit
                </Button>
            </div>
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#161616',
                    border: '.1rem solid #0f0e0e',
                    borderRadius: '.3rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '2rem',
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
                            width: '30rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                        }}
                    >
                        {paymentMethods.length > 0 ? (
                            paymentMethods.map((method, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'relative', 
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#161616',
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
                                                color: '#fafafa',
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

                                        <Button
                                            onClick = {() => removingMethods ? removePaymentMethod( method.id ) : onEditOpen() }
                                            variant="filled"
                                            sx={{
                                                position: 'absolute',
                                                bottom: '0.5rem',
                                                right: '0.5rem',
                                                color: '#ab003c',
                                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                                padding: '0.5rem 1rem',
                                                '&:hover': {
                                                    backgroundColor: '#ab003c',
                                                    color: '#fafafa',
                                                },
                                            }}
                                        >
                                        { removingMethods ? 'Remove' : 'Edit' }
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
                                color: '#ab003c',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                marginRight: '1rem',
                                width: '8rem',
                                '&:hover': {
                                    backgroundColor: '#ab003c',
                                    color: '#fafafa'
                                }
                            }}
                        >
                        Add
                        </Button>
                        <Button
                            onClick = { handleRemovingMethods }
                            variant='filled'
                            sx={{
                                color: '#ab003c',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
                                width: '9rem',
                                '&:hover': {
                                    backgroundColor: '#ab003c',
                                    color: '#fafafa'
                                }
                            }}
                        >
                        { removingMethods ? 'Done' : 'Remove' }
                        </Button>
                    </Box>
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
                        onEditClose();
                        onCardClose();
                    }}
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {editOpen && (
                        <EditUser user={user} onClose={onEditClose} />
                    )}
                    {cardAddOpen && (
                        <PaymentForm onClose={onCardClose} refreshPaymentMethods={() => fetchPaymentMethods(user.id)} />
                    )}
                </Backdrop>
            </Box>
        </>
    );
}

export default Profile;