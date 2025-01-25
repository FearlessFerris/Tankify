// User Context Implementation 


// Dependencies 
import React, { createContext, useContext, useState, useEffect } from 'react';
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

    // Restore user from localStorage if available
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    
    }, []);

    // Login function that sets user and stores it in localStorage
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
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

    return (
        <UserContext.Provider value={{ getDefaultPaymentMethod, login, logout, user }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook to use the UserContext 
export const useUser = () => useContext(UserContext);
