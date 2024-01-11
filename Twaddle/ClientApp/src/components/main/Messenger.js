import React, { useState, useEffect, useRef } from 'react';
import {GetUserMatchMessages, SendMessage} from "../requests/MessageQueries";

const Messenger = ({matchId}) => {
    const [messageList, setMessageList] = useState([]);
    const [buddy, setBuddy] = useState(null);
    const messagesEndRef = useRef(null);
    const getMatch = async () =>
    {
        
        const jwt = sessionStorage.getItem('token');
        
        const result = await GetUserMatchMessages(jwt, matchId);
        
        setBuddy(result.data.data.senderInfo)
        setMessageList(result.data.data.messages)
    }

    const PostMes = async () => {
        
        const jwt = sessionStorage.getItem('token');
        const login = sessionStorage.getItem('user');
        
        const newMessage = {
            MatchId : matchId,
            MessageContent : document.getElementById("message").value,
            LoginUser : login
        }
        
        const result = await SendMessage(jwt, newMessage);
        
        console.log(result.data.data);
        
        setMessageList(result.data.data.messages.slice());
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);
    
    useEffect(() => {
        getMatch()
    });

    return (
        <div 
            className={"w-75 card border border-3 border-light-subtle"}>
            <div 
                style={{ textAlign: 'center', marginBottom: '20px' }}>
                {buddy != null &&
                    <h2>Имя: {buddy.name} Возраст: {buddy.age}</h2>
                }
            </div>
            <div
                style={{
                maxHeight: '600px',
                overflowY: 'auto', 
                
                }}>
                {messageList != null && messageList.map(message => (
                    <div
                        key={message.createdTime}
                        style={{
                            display: 'flex',
                            justifyContent: message.isSender ? 'flex-start' : 'flex-end',
                            marginLeft: '10px',
                            marginBottom: '10px',
                            marginRight: '10px'
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: message.isSender ? '#eee' : '#007bff',
                                color: message.isSender ? '#000' : '#fff',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                maxWidth: '70%',
                            }}
                        >
                            {message.content}
                            <p>{message.createdTime}</p>
                        </div>
                    </div>
                ))}
                {(messageList == null || messageList.length <= 0) && (
                    <h3>Сообщений пока нет</h3>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className={"input-group d-flex mt-5 w-100"}>
                <input type={"text"} id={"message"} className={"w-75"}/>
                <button onClick={PostMes} className={"btn btn-success w-25"}>Отправить</button>
            </div>
        </div>
    );
};

export default Messenger;
