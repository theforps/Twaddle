import React from 'react';
import {Link} from "react-router-dom";

const LogoutButton = () => {
    
    const handleLogout = () => {

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
    };

    return (
        <Link to={"/join"} className={"btn btn-danger"} onClick={handleLogout}>
            Выйти
        </Link>
    );
};

export default LogoutButton;
