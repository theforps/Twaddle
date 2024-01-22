import {Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Tabs from "./Tabs";
import InfiniteUserCard from "./InfinityUserCard";
import LogoutButton from "./LogoutButton";
import Messenger from "./Messenger";
import UserCard from "./UserCard";
import ProfileTab from "./ProfileTab";

const MainPage = () => {

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
        setShowProfile(true);
        setShowCards(false);
        setShowMessages(true);
    };

    const handleProfileShow = () => {
        setShowProfile(true);
        setShowCards(false);
        setShowMessages(false);
    };
    
    return (
        <div className="m-5 w-100 d-flex">
            <div className={"me-3 border border-3 card border-light-subtle"}>
                <div className={"d-flex justify-content-center mb-4"}>
                    <div>
                        {!showCards && (
                            <button className={"btn btn-secondary m-2"} onClick={handleCardsShow}>
                                {'Меню'}
                            </button>
                        )}
                        {!showProfile  && (
                            <button className={"btn btn-secondary m-2"} onClick={handleProfileShow}>
                                {'Профиль'}
                            </button>
                        )}
                    </div>
                </div>
                {(showCards || showMessages) && <Tabs openMes={handleMessagesShow}/>}
                {showProfile && !showMessages && <ProfileTab/>}
            </div>
            {showProfile && !showMessages && (
                <UserCard />
            )}
            {showCards && !showMessages && (
                <InfiniteUserCard/>
            )}
            {showMessages && userMatchId != null && (
                <Messenger matchId={userMatchId}/>
            )}
        </div>
    )
}

export default MainPage;