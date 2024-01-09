import React, { useState, useEffect, useRef } from 'react';
import {GetUserMatch} from "../requests/CardsQueries";

const Messenger = ({matchId}) => {
    const [messageList, setMessageList] = useState([]);
    const [buddy, setBuddy] = useState(null);
    const messagesEndRef = useRef(null);
    const getMatch = async () =>
    {
        
        const jwt = sessionStorage.getItem('token');
        
        const result = await GetUserMatch(jwt, matchId);
        
        setBuddy(result.data.data.pair)
        setMessageList(result.data.data.messages)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);
    
    useEffect(() => {
        getMatch();
    }, []);

    return (
        <div className={"h-auto w-50 card border border-3 border-light-subtle"} style={{ height: '80vh', border: '1px solid #ccc', padding: '20px', overflowY: 'scroll' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                {buddy != null &&
                    <h2>Имя: {buddy.name} User id: {buddy.id}</h2>
                }
            </div>
            <div>
                {messageList != null && messageList.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: message.sender === 'friend' ? 'flex-start' : 'flex-end',
                            marginBottom: '10px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: message.sender === 'friend' ? '#eee' : '#007bff',
                                color: message.sender === 'friend' ? '#000' : '#fff',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                maxWidth: '70%',
                            }}
                        >
                            {message.text}
                        </div>
                    </div>
                    
                ))}
                {messageList == null || messageList.length <= 0 && (
                    <h3>Сообщений пока нет</h3>
                )}
                <div ref={messagesEndRef} />
                <div className={"input-group d-flex mt-5 w-100"}>
                    <input className={"w-75"}/>
                    <button className={"btn btn-success w-25"}>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
