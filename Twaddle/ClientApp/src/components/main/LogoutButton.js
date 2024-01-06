import React from 'react';
import {Navigate} from "react-router-dom";

const LogoutButton = () => {

    const handleLogout = () => {

        sessionStorage.removeItem('token');
        
        return (
            <Navigate to={"/join"}/>
        )
    };

    return (
        <button onClick={handleLogout}>
            Выйти
        </button>
    );
};

export default LogoutButton;
