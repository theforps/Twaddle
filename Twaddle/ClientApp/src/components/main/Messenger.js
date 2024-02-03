import React, { useState, useEffect, useRef } from 'react';
import {GetUserMatchMessages, SendMessage} from "../requests/MessageQueries";
import ModalButton from "../start/ModelBtn";
import {SendReport} from "../requests/CardsQueries";
import {GetUserMatches} from "../requests/MatchQueries";

const Messenger = ({id}) => {
    const [messageList, setMessageList] = useState([]);
    const [buddy, setBuddy] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [photos, setPhotos] = useState([])
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [matchId, setMatchId] = useState(id);
    
    const getMatch = async () =>
    {
        const jwt = sessionStorage.getItem('token');
        
        if(matchId != null)
        {
            const result = await GetUserMatchMessages(jwt, matchId);
            
            setBuddy(result.data.data.senderInfo);
            setMessageList(result.data.data.messages);
            setMatchId(id);
            
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
    }
    
    const getMatches = async () => {

        const jwt = sessionStorage.getItem('token');

        const result = await GetUserMatches(jwt);

        const tempArrayMatches = result.data.data;

        if(tempArrayMatches != null) {
            let result = []
            
            for (let i = 0; i < tempArrayMatches.length; i++)
            {
                if (tempArrayMatches[i].messages.length != 0) {
                    result.push(tempArrayMatches[i]);
                }
            }
            setMessages(result);
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

    const handleOpenMatch = (id) => {
        setMatchId(id);
    }
    
    useEffect(() => {
        getMatch()
        getMatches()
    });

    return (
        <div className={"d-flex w-100"}>
            <div className="p-2 card w-25 text-center">
                <div className="card-header">
                    <h4>
                        Сообщения
                    </h4>
                </div>
                <div className="mt-2 text-start">
                    {messages.length > 0 ? (messages.map((match) => (
                        <div key={match.id} className={"mt-1"}>
                            <button className={"btn btn-info"} onClick={() => handleOpenMatch(match?.id)}>
                                {match.pair.id + " " + match.pair.name}
                            </button>
                        </div>
                    ))) : (
                        <p>Собщений нет.</p>
                    )}
                </div>
            </div>
            {messageList == null || messageList.length === 0 && (
                <div className={"card w-75 d-flex justify-content-center"}>
                    <h3 className={"text-center"}>Нужно выбрать собеседника</h3>
                </div>
            )}
            {messageList != null && messageList.length !== 0 && (
            <div className={"card w-50"}>
                <div
                    className="p-3"
                    style={{
                        overflowY: "scroll",
                    }}>
                    {messageList.map(message => (
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
                                    maxWidth: '40%',
                                }}
                            >
                                {message.content}
                                <p>{message.createdTime.slice(0, 19)}</p>
                            </div>
                        </div>
                    ))}
                    {(messageList.length <= 0) && (
                        <h3>Сообщений пока нет</h3>
                    )}
                    <div ref={messagesEndRef}/>
                </div>
                <div className={"mt-auto input-group w-100"}>
                    <input placeholder={"Введите сообщение"} type={"text"} id={"message"} className={"form-control w-75"}/>
                    <button onClick={PostMes} className={"btn btn-success w-25"}>Отправить</button>
                </div>
            </div>
            )}
            { buddy != null && 
            <div className="card w-25">
                <div className="card-img-top text-center p-2">
                    {photos != null && photos.length > 0 && (
                        <div>
                            <button className="btn btn-primary" onClick={handlePrevPhoto}>&lt;</button>
                            <img
                                style={{maxWidth:"300px"}}
                                src={photos[currentPhotoIndex]}
                                 alt={`User ${buddy.name}`}/>
                            <button className="btn btn-primary" onClick={handleNextPhoto}>&gt;</button>
                        </div>
                    )}
                    {photos.length == 0 &&
                        <img 
                            style={{maxWidth:"300px"}}
                            src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg" 
                            alt={`User ${buddy.name}`}/>
                    }
                </div>
                <div className="card-body">
                    <h2 className="card-header text-center">{buddy.name}</h2>
                    <p className="card-text m-2">{`Возраст: ${buddy.age}`}</p>
                    <p className="card-text m-2">{`Пол: ${buddy.sex}`}</p>
                    <p className="card-text m-2">{`Страна: ${buddy.country}`}</p>
                    <p className="card-text m-2">{`Образование: ${buddy.education}`}</p>
                    <p className="card-text m-2">{`Цель: ${buddy.goal}`}</p>
                    <p className="card-text m-2">{`Описание: ${buddy.description}`}</p>
                    <div className={"card-footer text-center"}>
                        <ModalButton
                            btnName={'Пожаловаться'}
                            title={'Подать жалобу'}
                            modalContent= {
                                <div>
                                    <div className="m-3">
                                <textarea
                                    id="report"
                                    className="w-100 p-2 form-control"
                                    style={{
                                        height: "300px",
                                        resize:"none",
                                        textWrap:"inherit",
                                    }}
                                    placeholder="Введите жалобу"
                                />
                                    </div>
                                    <div className="justify-content-center d-flex">
                                        <button className="btn btn-success" type={"submit"}
                                                onClick={handleSendReport}>Отправить жалобу
                                        </button>
                                    </div>

                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Messenger;
