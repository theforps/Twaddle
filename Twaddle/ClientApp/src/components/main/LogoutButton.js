import React from 'react';
import {Navigate} from "react-router-dom";

const LogoutButton = () => {

    const handleLogout = () => {

        sessionStorage.removeItem('token');
    };

    return (
        <a className={"btn btn-danger"} onClick={handleLogout}>
            Выйти
        </a>
    );
};

export default LogoutButton;
