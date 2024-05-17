import {Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import InfiniteUserCard from "../parts/InfinityUserCard";
import LogoutButton from "../additionally/LogoutButton";
import Messenger from "../parts/Messenger";
import UserCard from "../parts/UserCard";
import NewsMenu from "../parts/NewsMenu";
import {GetNews} from "../requests/NewsQueries";
import {GetSub} from "../requests/SubQueries";
import OrderList from "../parts/OrderList";

const GeneralPage = () => {

    const [showProfile, setShowProfile] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showNews, setShowNews] = useState(false);
    const [showCards, setShowCards] = useState(true);
    const [showOrders, setShowOrders] = useState(false);
    const [userMatchId, setMatchId] = useState(null);
    
    useEffect(() => {
        checkSub();
    }, []);
    
    if(sessionStorage.getItem('token') == null)
    {
        return <Navigate to={'/join'}/>
    }

    const checkSub = async() => {
        await GetSub();
    }
    
    const handleCardsShow = () => {

        setShowOrders(false);
        setShowNews(false)
        setShowProfile(false);
        setShowCards(true);
        setShowMessages(false);
    };

    const handleMessagesShow = (id) => {
        setMatchId(id)
        setShowOrders(false);
        setShowNews(false)
        setShowProfile(false);
        setShowCards(false);
        setShowMessages(true);
    };

    const handleProfileShow = () => {
        setShowOrders(false);
        setShowNews(false)
        setShowProfile(true);
        setShowCards(false);
        setShowMessages(false);
    };

    const handleNewsShow = () => {

        setShowNews(true)
        setShowProfile(false);
        setShowCards(false);
        setShowMessages(false);
        setShowOrders(false);
    };

    const handleOrdersShow = () => {

        setShowNews(false);
        setShowProfile(false);
        setShowCards(false);
        setShowMessages(false);
        setShowOrders(true);
    };
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ps-4 pe-4 mt-2 mb-2" style={{borderRadius:"5px"}}>
                <a className="navbar-brand me-4" style={{fontSize:"30px", fontWeight:"400"}}  href="/">twaddle</a>
                <ul className="navbar-nav w-100 justify-content-center d-flex">

                    <li className="nav-item m-1 ">
                        <button className={"btn btn-secondary ps-4 pe-4"} onClick={handleProfileShow}>
                            Профиль
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button className={"btn btn-secondary ps-4 pe-4"} onClick={handleCardsShow}>
                            Список резюме
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button className={"btn btn-secondary ps-4 pe-4"} onClick={handleMessagesShow}>
                            Сообщения
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button className={"btn btn-secondary ps-4 pe-4"} onClick={handleOrdersShow}>
                            Заказы
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button className={"btn btn-secondary ps-4 pe-4"} onClick={handleNewsShow}>
                            Новости
                        </button>
                    </li>
                    <li className="nav-item m-1 ms-auto" style={{float:"right"}}>
                        <LogoutButton/>
                    </li>
                </ul>
            </nav>
            <div className={"d-flex justify-content-between card w-auto h-auto"} style={{minHeight:"700px", height: 'calc(60vw * (9/16))'}}>
                {showProfile && (
                    <UserCard />
                )}
                {showOrders && (
                    <OrderList openMes={handleMessagesShow}/>
                )}
                {showCards && (
                    <InfiniteUserCard openMes={handleMessagesShow}/>
                )}
                {showMessages && (
                    <Messenger id={userMatchId}/>
                )}
                {showNews && (
                    <NewsMenu />
                )}
            </div>
        </div>
    )
}

export default GeneralPage;