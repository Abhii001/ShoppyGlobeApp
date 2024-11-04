import React, { createContext, useContext, useState } from 'react';

// Create User Context
const UserContext = createContext();

// Create a UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize user state

    const login = (userData) => {
        setUser(userData); // Update user state with the user data
    };

    const logout = () => {
        setUser(null); // Clear user data
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children} {/* Render children components here */}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
