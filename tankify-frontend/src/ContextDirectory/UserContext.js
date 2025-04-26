// User Context Implementation 


// Dependencies 
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Create the User Context 
const UserContext = createContext();


// User Context 
export const UserProvider = ({ children }) => {
    
    // Initialize user state
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    console.log( user ); 

    // Restore user from localStorage if available
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    
    }, [] );

    // Login function that sets user and stores it in localStorage
    const login = async (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        await fetchDefaultCurrency( userData?.id );
        const redirectPath = localStorage.getItem( 'redirectAfterLogin' ) || '/';
        localStorage.removeItem( 'redirectAfterLogin' );
        navigate( redirectPath, { replace: true });
    };

    // Logout function that clears user state and removes it from localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate( '/' );
    };

    // Get Users default payment method
    const getDefaultPaymentMethod = async ( userId ) => {
        try{
            const response = await apiClient( `/payments/${ userId }/all` );
            console.log( response.data );
        }
        catch( error ){
            console.error( 'Error fetching getDefaultPaymentMethod' );
        }
    }

    // Get Users default currency 
    const fetchDefaultCurrency = async ( userId, alertMessage ) => {
        try {
            const response = await apiClient.get( `/users/${userId}/default-currency` );
            if (response.status === 200) {
                const userCurrency = response.data.data;
                setUser((prevUser) => ({
                    ...prevUser,
                    default_currency: userCurrency
                }));
    
                const updatedLocalUser = {
                    ...user,
                    default_currency: userCurrency
                };
                localStorage.setItem('user', JSON.stringify(updatedLocalUser));
            }
           
        }
        catch (error) {
            if( error.response && error.response === 404 ){ 

            }
        }
    }

    const refreshUserData = useCallback( async () => {
        if (!user) return;
        try {
            console.log( 'refreshUserData is running...'); 
            const response = await apiClient.get(`/get/${user.id}`);
            const updatedUser = response.data.user;
            setUser(( previousUser ) => ({ ...previousUser, ...updatedUser })); 
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Error refreshing user data:', error);
        }
    }, [] );

    return (
        <UserContext.Provider value={{ fetchDefaultCurrency, getDefaultPaymentMethod, login, logout, refreshUserData, user }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook to use the UserContext 
export const useUser = () => useContext(UserContext);
