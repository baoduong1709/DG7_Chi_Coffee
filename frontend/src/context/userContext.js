import React from 'react';

// @function  UserContext
const UserContext = React.createContext({ username: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ username: '', auth: false });

    const loginContext = (data) => {
        localStorage.setItem('token', JSON.stringify(data));
        setUser((user) => ({
            username: data.name,
            auth: true,
        }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser((user) => ({
            username: '',
            auth: false,
        }));
    };

    return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
};
export { UserContext, UserProvider };
