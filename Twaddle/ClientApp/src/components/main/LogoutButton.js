import React from 'react';
import {Navigate} from "react-router-dom";

const LogoutButton = () => {
    
    const handleLogout = () => {

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    };

    return (
        <button className={"btn btn-danger d-block m-5 pe-5 ps-5"} onClick={handleLogout}>
            Выйти
        </button>
    );
};

export default LogoutButton;
