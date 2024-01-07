import {Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Tabs from "./Tabs";
import InfiniteUserCard from "./InfinityUserCard";
import LogoutButton from "./LogoutButton";

const MainPage = () => {

    const [showProfileLink, setShowProfileLink] = useState(true);

    if(sessionStorage.getItem('token') == null)
    {
        return <Navigate to={'/join'}/>
    }
    
    const handleButtonClick = () => {
        setShowProfileLink((prevState) => !prevState);
    };
        
    return (
        <div className="m-5 w-100 d-flex">
            <div>
                <div className={"d-flex justify-content-center mb-4"}>
                    <div>
                        <button onClick={handleButtonClick}>
                            {showProfileLink ? 'Профиль' : 'Меню'}
                        </button>
                    </div>
                    
                    <LogoutButton />
                </div>
                <Tabs />
            </div>
            {showProfileLink === true ? <InfiniteUserCard/> : 
                <div>Информация о пользователе</div>
            }
        </div>
    )
}

export default MainPage;