import React from 'react';

const LogoutButton = () => {
    
    const handleLogout = () => {

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
    };

    return (
        <button className={"btn btn-danger"} onClick={handleLogout}>
            Выйти
        </button>
    );
};

export default LogoutButton;
