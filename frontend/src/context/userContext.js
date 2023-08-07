import React from 'react';
import { useEffect } from 'react';

// @function  UserContext
const UserContext = React.createContext({ username: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ username: '', auth: false });
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const savedToken = JSON.parse(localStorage.getItem('token'));
            loginContext(savedToken);
        }
    }, []);
    const loginContext = (data) => {
        localStorage.setItem('token', JSON.stringify(data));
        setUser((user) => ({
            username: data.name,
            auth: true,
        }));
    };
    const updateUserName = (newName, newToken) => {
        localStorage.setItem('token', JSON.stringify(newToken)); // Lưu token vào localStorage
        setUser((user) => ({
            ...user,
            username: newName,
        }));
        const savedToken = JSON.parse(localStorage.getItem('token'));
        savedToken.name = newName;
        localStorage.setItem('token', JSON.stringify(savedToken));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser((user) => ({
            username: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, updateUserName, logout }}>{children}</UserContext.Provider>
    );
};
export { UserContext, UserProvider };
