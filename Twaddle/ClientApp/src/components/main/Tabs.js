// Tabs.js
import React, {useEffect, useState} from 'react';
import {GetUserMatches} from "../requests/CardsQueries";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('matches');

    const [matches, setMatches] = useState(null);
    
    const getMatches = async () => {
        
        const jwt = sessionStorage.getItem('token');
        
        const result = await GetUserMatches(jwt);
        
        setMatches(result.data.data);
    }
    
    const messages = [
        { content: 'Сообщение 1'},
        { content: 'Сообщение 2'},
    ];
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        getMatches();
    }, []);
    
    return (
        <div className="d-inline-block justify-content-center">
            <div className="tab-header">
                <button className={activeTab === 'matches' ? 'active' : ''} onClick={() => handleTabClick('matches')}>
                    Совпадения
                </button>
                <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => handleTabClick('messages')}>
                    Сообщения
                </button>
            </div>
            <div className="tab-content mt-4">
                {activeTab === 'matches' && (
                    <ul>
                        {matches != null ? (matches.map((match) => (
                            <li className={"mt-2"}>
                                <button >{match.name}</button>
                            </li>
                        ))) : (
                            <p>Совпадений нет.</p>
                        )}
                    </ul>
                )}
                {activeTab === 'messages' && (
                    <ul>
                        {messages != null ? (messages.map((message) => (
                            <li className={"mt-2"}>
                                <button >{message.content}</button>
                            </li>
                        ))) : (
                            <p>Собщений нет.</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Tabs;
