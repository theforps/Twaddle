import React from 'react';
import {Link} from "react-router-dom";
import {Logout} from "../requests/JoinQueries";

const LogoutButton = () => {
    
    const handleLogout = async() => {

        await Logout();
    };

    return (
        <form>
            <button className={"btn btn-danger"} type={"submit"} onClick={() => handleLogout()}>
                Выйти
            </button>
        </form>
    );
};

export default LogoutButton;
