import React, {useEffect, useState} from 'react';
import {GetUserMatches} from "../requests/MatchQueries";

const Tabs = ({openMes}) => {
    const [activeTab, setActiveTab] = useState('matches');

    const [matches, setMatches] = useState(null);
    const [matchId, setMatchId] = useState(null);
    const [messages, setMessages] = useState(null);
    
    const getMatches = async () => {
        
        const jwt = sessionStorage.getItem('token');
        
        const result = await GetUserMatches(jwt);
        
        console.log(result.data)
        
        setMatches(result.data.data);
        setMessages(result.data.messages)
    }
    
    const handleOpenMatch = (id) => {
        setMatchId(id);
        openMes(matchId);
    }
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        getMatches();
    }, []);
    
    return (
        <div className="d-inline-block justify-content-center">
            <div className="tab-header ">
                <button className={"btn btn-outline-primary m-2"}  onClick={() => handleTabClick('matches')}>
                    Совпадения
                </button>
                <button className={"btn btn-outline-info m-2"}  onClick={() => handleTabClick('messages')}>
                    Сообщения
                </button>
            </div>
            <div className="tab-content mt-4">
                {activeTab === 'matches' && (
                    <ul>
                        {matches != null ? (matches.map((match) => (
                            <li key={match.id} className={"mt-2"}>
                                <button className={"btn btn-primary"} onClick={() => handleOpenMatch(match?.id)}>
                                    {match.pair.id + " " + match.pair.name}
                                </button>
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
                                <button className={"btn btn-info"}>{message.content}</button>
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
