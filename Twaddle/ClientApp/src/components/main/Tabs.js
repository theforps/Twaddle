import React, {useEffect, useState} from 'react';
import {GetUserMatches} from "../requests/MatchQueries";

const Tabs = ({openMes}) => {
    const [activeTab, setActiveTab] = useState('matches');

    const [matches, setMatches] = useState([]);
    const [matchId, setMatchId] = useState(null);
    const [messages, setMessages] = useState([]);
    
    const getMatches = async () => {
        
        const jwt = sessionStorage.getItem('token');
        
        const result = await GetUserMatches(jwt);

        console.log("Все метчи с сообщениями и без:")
        console.log(result.data)
        
        const tempArrayMatches = result.data.data;
        
        if(tempArrayMatches != null) {
            for (let i = 0; i < tempArrayMatches.length; i++)
            {
                if (tempArrayMatches[i].messages.length == 0)
                {
                    matches.push(tempArrayMatches[i]);
                }
                if (tempArrayMatches[i].messages.length != 0) {
                    messages.push(tempArrayMatches[i]);
                }
            }
        }
        setMatches(matches.slice());
        setMessages(messages.slice());
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
            <div className="mt-2">
                {activeTab === 'matches' && (
                    <ul>
                        {matches.length > 0 ? (matches.map((match) => (
                            <div key={match.id} className={"mt-1"}>
                                <button className={"btn btn-primary"} onClick={() => handleOpenMatch(match?.id)}>
                                    {match.pair.id + " " + match.pair.name}
                                </button>
                            </div>
                        ))) : (
                            <p>Совпадений нет.</p>
                        )}
                    </ul>
                )}
                {activeTab === 'messages' && (
                    <ul>
                        {messages.length > 0 ? (messages.map((match) => (
                            <div key={match.id} className={"mt-1"}>
                                <button className={"btn btn-info"} onClick={() => handleOpenMatch(match?.id)}>
                                    {match.pair.id + " " + match.pair.name}
                                </button>
                                <p>{match.messages[match.messages.length-1].content.slice(0, 15)}</p>
                            </div>
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
