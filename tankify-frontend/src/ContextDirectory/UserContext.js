// User Context Implementation 


// Dependencies 
import React, { createContext, useContext, useState } from 'react';


// Components & Necessary Files 


// Create the User Context 
const UserContext = createContext();


// User Context 
export const UserProvider = ({ children }) => {
    
    const [ user, setUser ] = useState( null );
    console.log( user );
    const login = ( userData ) => setUser( userData );
    const logout = () => setUser( null );

    return(
        <UserContext.Provider value = {{ user, login, logout }}>
            { children }
        </UserContext.Provider>
    );
};


// Custom Hook to use the UserContext 
export const useUser = () => useContext( UserContext );


