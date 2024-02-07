import {Navigate} from "react-router-dom";
import React, {useState} from "react";
import InfiniteUserCard from "../parts/InfinityUserCard";
import LogoutButton from "../additionally/LogoutButton";
import Messenger from "../parts/Messenger";
import UserCard from "../parts/UserCard";

const GeneralPage = () => {

    const [showProfile, setShowProfile] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showCards, setShowCards] = useState(true);
    const [userMatchId, setMatchId] = useState(null);
    
    
    if(sessionStorage.getItem('token') == null)
    {
        return <Navigate to={'/join'}/>
    }
    
    const handleCardsShow = () => {
        setShowProfile(false);
        setShowCards(true);
        setShowMessages(false);
    };

    const handleMessagesShow = (id) => {
        setMatchId(id)
        setShowProfile(false);
        setShowCards(false);
        setShowMessages(true);
    };

    const handleProfileShow = () => {
        setShowProfile(true);
        setShowCards(false);
        setShowMessages(false);
    };
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ps-3 pe-3 mt-2 mb-2">
                <a className="navbar-brand" href="/">twaddle</a>
                
                <ul className="navbar-nav w-100">
                    <li className="nav-item m-1">
                        <button className={"btn btn-secondary"} onClick={handleProfileShow}>
                            Профиль
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button className={"btn btn-secondary"} onClick={handleCardsShow}>
                            Анкеты
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button className={"btn btn-secondary"} onClick={handleMessagesShow}>
                            Сообщения
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <a className="btn btn-secondary" href="#">Вакансии</a>
                    </li>
                    <li className="nav-item m-1">
                        <a className="btn btn-secondary" href="#">Лента</a>
                    </li>
                    <li className="nav-item ms-auto m-1">
                        <LogoutButton />
                    </li>
                </ul>
            </nav>
            <div className={"d-flex bg-white justify-content-between"} style={{minHeight: '800px' ,height: 'calc(70vw * (9/16))'}}>
                {showProfile && (
                    <UserCard />
                )}
                {showCards && (
                    <InfiniteUserCard openMes={handleMessagesShow}/>
                )}
                {showMessages && (
                    <Messenger id={userMatchId}/>
                )}
            </div>
        </div>
    )
}

export default GeneralPage;