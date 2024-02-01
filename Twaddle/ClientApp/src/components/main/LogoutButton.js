import React from 'react';

const LogoutButton = () => {
    
    const handleLogout = () => {

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
    };

    return (
        <button className={"btn btn-danger  mt-2 mb-2"} onClick={handleLogout}>
            Выйти
        </button>
    );
};

export default LogoutButton;
