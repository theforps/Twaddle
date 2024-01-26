import React, { useState, useEffect, useRef } from 'react';
import {GetUserMatchMessages, SendMessage} from "../requests/MessageQueries";
import ModalButton from "../start/ModelBtn";
import {SendReport} from "../requests/CardsQueries";

const Messenger = ({matchId}) => {
    const [messageList, setMessageList] = useState([]);
    const [buddy, setBuddy] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [photos, setPhotos] = useState([])
    const messagesEndRef = useRef(null);
    const getMatch = async () =>
    {
        
        const jwt = sessionStorage.getItem('token');
        
        const result = await GetUserMatchMessages(jwt, matchId);
                
        setBuddy(result.data.data.senderInfo)
        setMessageList(result.data.data.messages)

        if(buddy != null && buddy.images.length > 0) {
            const yourArray = buddy.images;

            const resultImages = [];

            for (let i = 0; i < yourArray.length; i++) {
                const dataUrl = yourArray[i];
                const img = "data:image/png;base64," + dataUrl;
                resultImages.push(img);
            }

            setPhotos(resultImages);
        }
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

    const handleNextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const handlePrevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    const handleSendReport = async() => {
        const jwt = sessionStorage.getItem('token');
        
        
        report.Culprit = buddy.login;
        report.Content = document.getElementById("report").value;
        
        const result = await SendReport(jwt, report);

        console.log(result.data.data);
    };
    
    
    const report = {
        Culprit: '',
        Content: ''
    }
    
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);
    
    useEffect(() => {
        getMatch()
    });

    return (
        <div className={"d-flex"}>
            <div
                className={"card border border-3 border-light-subtle p-3"}>
                <div
                    style={{
                        minWidth:"600px",
                        height: "700px",
                        overflowY: "scroll",
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
                    <div ref={messagesEndRef}/>
                </div>
                <div className={"mt-auto input-group d-flex mt-5 w-100"}>
                    <input type={"text"} id={"message"} className={"w-75"}/>
                    <button onClick={PostMes} className={"btn btn-success w-25"}>Отправить</button>
                </div>
            </div>
            { buddy != null && 
            <div className="border border-3 border-light-subtle p-3 ms-3 float-end">
                <div className="photo-container m-2">
                    {photos != null && photos.length > 0 && (
                        <div>
                            <button onClick={handlePrevPhoto}>&lt;</button>
                            <img style={{width:"200px", height: "200px"}} src={photos[currentPhotoIndex]} alt={`User ${buddy.name}`}/>
                            <button onClick={handleNextPhoto}>&gt;</button>
                        </div>
                    )}
                    {photos.length == 0 &&
                        <img 
                            style={{maxWidth:"300px"}}
                            src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg" 
                            alt={`User ${buddy.name}`}/>
                    }
                </div>
                <div className="user-info">
                    <h2>{buddy.name}</h2>
                    <p>{`Возраст: ${buddy.age}`}</p>
                    <p>{`Пол: ${buddy.sex}`}</p>
                    <p>{`Страна: ${buddy.country}`}</p>
                    <p>{`Образование: ${buddy.education}`}</p>
                    <p>{`Цель: ${buddy.goal}`}</p>
                    <p>{`Описание: ${buddy.description}`}</p>
                </div>
                <ModalButton
                    btnName={'Пожаловаться'}
                    title={'Подать жалобу'}
                    modalContent= {
                        <div>
                            <div className="m-3">
                                <textarea
                                    id="report"
                                    className="w-100 p-2"
                                    style={{
                                        height: "300px", 
                                        resize:"none",
                                        textWrap:"inherit",
                                    }}
                                    placeholder="Введите жалобу"
                                />
                            </div>
                            <button className="btn btn-success" type={"submit"} onClick={handleSendReport}>Отправить жалобу</button>
                        </div>
                        }
                />
            </div>
            }
        </div>
    );
};

export default Messenger;
