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
                        <button className={"btn btn-secondary"} onClick={handleOrdersShow}>
                            Заказы
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button className={"btn btn-secondary"} onClick={handleNewsShow}>
                            Новости
                        </button>
                    </li>
                    <li className="nav-item ms-auto m-1">
                        <LogoutButton/>
                    </li>
                </ul>
            </nav>
            <div className={"d-flex bg-white justify-content-between"} style={{minHeight: '800px' ,height: 'calc(70vw * (9/16))'}}>
                {showProfile && (
                    <UserCard />
                )}
                {showOrders && (
                    <OrderList />
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