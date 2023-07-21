/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const authContext = React.createContext({
    isLoggedIn: false,
    login: () =>{},
    register: () =>{},
    updateProfile: () =>{}
});


function Auth(props) {
    const [ isLoggedIn, setIsLoggedIn] = useState(false);
    const login = () =>{

    };

    const register = () =>{
        
    };

    const logout = () =>{

    }

    const updateProfile = () =>{
        
    };

  return (
    <authContext.Provider value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        logout,
        login,
        register,
        updateProfile,
    }}
    >
    {props.children}
    </authContext.Provider>
  )
}

export default Auth