import React from 'react';
import {Navigate} from "react-router-dom";

const LogoutButton = () => {
    
    const handleLogout = () => {

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    };

    return (
        <button type={"submit"} className={"btn btn-danger d-block m-5 pe-5 ps-5"} onSubmit={handleLogout}>
            Выйти
        </button>
    );
};

export default LogoutButton;
