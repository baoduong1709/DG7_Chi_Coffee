import React from 'react';

// @function  UserContext
const UserContext = React.createContext({ username: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ username: '', auth: false });

    const loginContext = (name, data) => {
        localStorage.setItem('token', JSON.stringify(data));
        localStorage.setItem('user', JSON.stringify(name));
        setUser((user) => ({
            username: name,
            auth: true,
        }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser((user) => ({
            username: '',
            auth: false,
        }));
    };

    return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
};
export { UserContext, UserProvider };
