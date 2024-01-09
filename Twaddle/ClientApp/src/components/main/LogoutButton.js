import React from 'react';
import {Navigate} from "react-router-dom";

const LogoutButton = () => {

    const handleLogout = () => {

        sessionStorage.removeItem('token');
    };

    return (
        <button className={"btn btn-danger m-2"} onClick={handleLogout}>
            Выйти
        </button>
    );
};

export default LogoutButton;
