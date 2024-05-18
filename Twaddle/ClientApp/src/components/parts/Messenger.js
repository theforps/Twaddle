import React, { useState, useEffect, useRef } from "react";
import { GetUserMatchMessages, SendMessage } from "../requests/MessageQueries";
import ModalWindow from "../additionally/ModalWindow";
import { SendReport } from "../requests/CardsQueries";
import { GetUserMatches } from "../requests/MatchQueries";
import "./style.css";
const Messenger = ({ id }) => {
  const [messageList, setMessageList] = useState([]);
  const [buddy, setBuddy] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [matchId, setMatchId] = useState(id);

  const getMatch = async () => {
    if (matchId != null && Number.isInteger(matchId)) {
      const result = await GetUserMatchMessages(matchId);

      if (result != null) {
        setBuddy(result.data.data.senderInfo);
        setMessageList(result.data.data.messages);

        if (buddy != null && buddy.images != null && buddy.images.length > 0) {
          const yourArray = buddy.images;

          const resultImages = [];
          
          if(yourArray != null) {
            for (let i = 0; i < yourArray.length; i++) {
              const dataUrl = yourArray[i];
              const img = "data:image/png;base64," + dataUrl;
              resultImages.push(img);
            }
          }
          setPhotos(resultImages);
        }
      }
    }
  };

  const getMatches = async () => {
    const result = await GetUserMatches();
    
    const tempArrayMatches = result.data.data;

    if (tempArrayMatches != null) {
      let result = [];
    
      if(tempArrayMatches != null) {
        for (let i = 0; i < tempArrayMatches.length; i++) {
          if (tempArrayMatches[i].messages.length != 0) {
            result.push(tempArrayMatches[i]);
          }
        }
      }
      setMessages(result);
    }
  };

  const PostMes = async () => {
    const newMessage = {
      MatchId: matchId,
      MessageContent: document.getElementById("message").value,
    };

    const result = await SendMessage(newMessage);

    setMessageList(result.data.data.messages.slice());
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  const handleSendReport = async () => {
    report.Culprit = buddy.login;
    report.Content = document.getElementById("report").value;

    await SendReport(report);
  };

  const report = {
    Culprit: "",
    Content: "",
  };

  const handleOpenMatch = (id) => {
    setMatchId(id);
  };

  useEffect(() => {
    getMatch();
    getMatches();
  }, [messages]);

  return (
    <div className={"d-flex "}>
      <div className="messenger" style={{float:"left"}}>
        <div className="card-header text-center">
          <h4>Существующие беседы</h4>
        </div>
        <div className="mt-2 d-grid align-content-start w-100" style={{height:"600px", width:"100%"}}>
          {messages.length > 0 ? (
            messages.map((match) => (
              <div key={match.id} className={"mt-1 me-2"}>
                <button
                  className={"btn btn-outline-secondary w-100"}
                  onClick={() => handleOpenMatch(match.id)}
                >
                  <div className="match-profile">
                    {(match.pair.pictures == null || match.pair.pictures.length == 0) && (
                        <img className={"border-secondary border-2 border border-opacity-25"} src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"/>
                    )}
                    {(match.pair.pictures != null && match.pair.pictures.length != 0) && (
                    
                        <img className={"border-secondary border-2 border border-opacity-25"} src={"data:image/png;base64," + match.pair.pictures[0]}/>
                    )}
                    {match.pair.name}
                  </div>
                </button>
              </div>
            ))
          ) : (
            <p className={"text-center mt-auto"}>Бесед нет</p>
          )}
        </div>
      </div>
      {buddy == null && (
        <div className={"m-auto text-center d-flex justify-content-center align-content-center align-items-center"}>
          <h3 className={"text-center"}>Необходимо выбрать собеседника</h3>
        </div>
      )}
      {buddy != null && (
        <div className={"h-auto"} style={{minWidth:"680px"}}>
          <div
            className="p-3"
            style={{
              height:"650px",
              overflowY: "scroll",
            }}
          >
            {messageList.map((message) => (
              <div
                key={message.createdTime}
                style={{
                  display: "flex",
                  justifyContent: message.isSender ? "flex-start" : "flex-end",
                  marginLeft: "10px",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: message.isSender ? "#c99aed" : "#0b7ea1",
                    color: message.isSender ? "#000" : "#fff",
                    padding: "2px 15px",
                    borderRadius: "10px",
                    maxWidth: "40%",
                    
                  }}
                >
                  <div className="mini-profile" style={{width:"max-content"}}>
                    
                    {message.isSender && (buddy.images == null || buddy.images.length == 0) && (
                        <img className={"border-secondary-subtle border-2 border bg-white"} src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"/>
                    )}
                    {message.isSender && (buddy.images  != null && buddy.images.length != 0) && (
                    
                        <img className={"border-secondary-subtle border-2 border bg-white"} src={"data:image/png;base64," + buddy.images[0]}/>
                    )}
                    {message.isSender && (<p className={"text-white"} style={{fontWeight:"500"}}>{buddy.name}</p>)}
                  </div>
                  <div className={"d-grid"} style={{textAlign: message.isSender ? "start" : "end"}}>
                    <p className={"mb-1 mt-1 text-white"}>{message.content}</p>
                    <p className={"mb-1 text-white"} style={{fontSize:"14px", fontFamily:"Calibri"}}>
                      {new Date(message.createdTime).toLocaleTimeString().slice(0, -3)}&nbsp;{new Date(message.createdTime).toLocaleDateString()}
                    </p>
                  </div>

                </div>
              </div>
            ))}
            {messageList.length <= 0 && (
                <div
                    className={"mt-auto text-center d-flex justify-content-center align-content-center align-items-center"}>
                  <h3 className={"text-center"}>Напишите первое сообщение</h3>
                </div>
            )}
        </div>
        <div className="message ">
        <textarea
        placeholder={"Введите сообщение"}
              id={"message"}
              style={{height:"80px", resize:"none"}}
              className={"form-control w-75 border-1 border-opacity-50 border-secondary"}
            />
            <button onClick={PostMes} className={"btn btn-success w-25"}>
              Отправить
            </button>
          </div>
        </div>
      )}
      {buddy != null && (
          <div className="ps-1 pe-1" style={{width: "350px", float: "right", borderLeft: "darkgray solid 1px"}}>
            <div className="card-img-top text-center p-0 ">
              {buddy.images != null && buddy.images.length > 0 && (
                  <div>
                    <div className="image-container-low border border-2 p-0" style={{borderRadius: "20px"}}>
                      <img
                          src={"data:image/png;base64," + buddy.images[currentPhotoIndex]}
                          alt={`User ${buddy.name}`}
                      />
                    </div>
                    {photos != null && photos.length > 1 && (
                        <div className="image-buttons btn-group w-75 m-auto mt-2">
                          <button className="btn btn-outline-secondary" onClick={handlePrevPhoto}>
                            &lt;
                          </button>
                          <button className="btn btn-outline-secondary" onClick={handleNextPhoto}>
                            &gt;
                          </button>
                        </div>
                    )}
                  </div>
              )}
              {(buddy.images == null || buddy.images.length < 1) && (
                  <div className="image-container-low">
                    <img
                        src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"
                        alt={`User ${buddy.name}`}
                    />
                  </div>
              )}
            </div>
            <div className="card-body p-0 m-0 w-100" style={{gap: "10px", minHeight: "350px", width: "300px"}}>
              <p className={"mt-1 mb-1 card-header text-center p-0"} style={{
                fontSize: "25px",
                fontWeight: "600",
                fontFamily: "Calibri"
              }}>{buddy.name}, {buddy.age}</p>
              <div className={"ms-3 me-3"}>
                <p className={"mb-0"} style={{fontSize: "20px", fontWeight: "600", fontFamily: "Calibri"}}>🏠 Личное</p>
                <p className={"mb-1"} style={{fontSize: "16px"}}>&nbsp;&nbsp;&nbsp;<u>Пол</u>: {buddy.sex}</p>
                <p className={"mb-0"} style={{fontSize: "20px", fontWeight: "600", fontFamily: "Calibri"}}>🌏 Страна</p>
                <p className={"mb-1"} style={{fontSize: "16px"}}>&nbsp;&nbsp;&nbsp;{buddy.country}</p>
                <p className={"mb-0"}
                   style={{fontSize: "20px", fontWeight: "600", fontFamily: "Calibri"}}>💻 Образование</p>
                <p className={"mb-1"} style={{fontSize: "16px"}}>&nbsp;&nbsp;&nbsp;{buddy.education}</p>
                <p className={"mb-0"}
                   style={{fontSize: "20px", fontWeight: "600", fontFamily: "Calibri"}}>💼 Что стоит учесть</p>
                <p className={"mb-0"} style={{fontSize: "16px"}}>&nbsp;&nbsp;&nbsp;
                  <u>Цель</u>: {buddy.goal}</p>
                <p className={"mb-0"} style={{fontSize: "16px"}}>&nbsp;&nbsp;&nbsp;
                  <u>Рейтинг</u>: 5 ⭐</p>
                <p className={"mb-0"}
                   style={{fontSize: "16px"}}>&nbsp;&nbsp;&nbsp;
                  <u>Описание</u>:<p className={"text-muted"} style={{lineHeight:"20px", fontSize:"14px", fontWeight:"600", marginLeft:"15px"}}>{buddy.description} </p> </p>
              </div>
            </div>
            <div className={"card-footer text-center mt-auto"}>
              <ModalWindow
                  btnName={"Пожаловаться😵"}
                  title={"Подать жалобу"}
                  modalContent={
                    <div>
                      <div className="m-3">
                      <textarea
                          id="report"
                          className="w-100 p-2 form-control"
                          style={{
                            height: "300px",
                            resize: "none",
                            textWrap: "inherit",
                          }}
                          placeholder="Введите жалобу"
                      />
                      </div>
                      <div className="justify-content-center d-flex">
                        <button
                            className="btn btn-success w-100 ms-3 me-3"
                            type={"submit"}
                            onClick={handleSendReport}
                        >
                          Отправить жалобу
                        </button>
                      </div>
                    </div>
                  }
              />
            </div>
          </div>
      )}
    </div>
  );
};

export default Messenger;
