import React, {useEffect, useState} from 'react';
import {GetCards, SendReport} from "../requests/CardsQueries";
import {GetUserMatches, SetUserMatch} from "../requests/MatchQueries";
import ModalWindow from "../additionally/ModalWindow";

const InfiniteUserCard = ({openMes}) => {
    const [userList, setUserList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const [photoIndex, setPhotoIndex] = useState(0);
    
    const [matches, setMatches] = useState([]);
    const getCards = async () => {
        
        const result = await GetCards()
        
        setUserList(result.data.data);
    }

    const getMatches = async () => {
        
        const result = await GetUserMatches();
        
        const tempArrayMatches = result.data.data;

        if(tempArrayMatches != null) {
            
            let result = []
            
            for (let i = 0; i < tempArrayMatches.length; i++)
            {
                if (tempArrayMatches[i].messages.length === 0)
                {
                    result.push(tempArrayMatches[i]);
                }
            }
            setMatches(result);
        }
    }
    
    const goToNextCard = () => {
        setCurrentIndex(currentIndex + 1);
        setPhotoIndex(0);
    };
    
    const setLike = async(secondUser) => {
        setCurrentIndex(currentIndex + 1);
        setPhotoIndex(0);
        
        await SetUserMatch(secondUser);
    }

    const handleNextPhoto = () => {
        setPhotoIndex((prevIndex) => (prevIndex + 1) % userList[currentIndex].images.length);
    };

    const handlePrevPhoto = () => {
        setPhotoIndex((prevIndex) => (prevIndex - 1 + userList[currentIndex].images.length) % userList[currentIndex].images.length);
    };

    const handleSendReport = async() => {
        
        console.log(userList[currentIndex])
        
        report.Culprit = userList[currentIndex].login;
        report.Content = document.getElementById("report").value;

        await SendReport(report);
    };

    const report = {
        Culprit: '',
        Content: ''
    }
    
    const handleOpenMatch = (id) => {
        openMes(id);
    }
    
    useEffect(() => {
        getCards()
        getMatches()
    }, []);
    
    return (
        <div className={"d-flex justify-content-center w-100"}>
            <div className="p-2 card w-25 text-center">
                <div className="card-header">
                    <h4>
                        Совпадения
                    </h4>
                </div>
                <div className="mt-2 d-inline">
                    {matches.length > 0 ? (matches.map((match) => (
                        <button key={match.id} className={"btn btn-primary m-1"} onClick={() => handleOpenMatch(match.id)}>
                            {match.pair.id + " " + match.pair.name}
                        </button>
                    ))) : (
                        <p>Совпадений нет.</p>
                    )}
                </div>
            </div>
            <div className="card w-75">
                {
                    userList != null && userList.length > currentIndex &&
                    (
                        <div className="p-3 ">
                            <div className={"d-flex "}>
                                <div>
                                    {
                                        userList[currentIndex].images.length > 1 &&
                                        <div>
                                            <button className="btn btn-primary" onClick={handlePrevPhoto}>&lt;</button>
                                            <img
                                                className="card-img-top m-2"
                                                style={{width: '350px', height: '550px'}}
                                                src={"data:image/png;base64," + userList[currentIndex].images[photoIndex]}
                                                alt={"user"}/>
                                            <button className="btn btn-primary" onClick={handleNextPhoto}>&gt;</button>
                                        </div>
                                    }
                                    {
                                        userList[currentIndex].images.length === 1 &&
                                        <div>
                                            <img
                                                className="card-img-top m-2"
                                                style={{width: '350px', height: '550px'}}
                                                src={"data:image/png;base64," + userList[currentIndex].images[0]}
                                                alt={"user"}/>
                                        </div>
                                    }
                                    {
                                        userList[currentIndex].images.length === 0 &&
                                        <img
                                            style={{width: '350px', height: '550px'}}
                                            className="card-img-top m-2"
                                            src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"
                                            alt={"user"}/>
                                    }
                                </div>
                                <div className={"card-body"}>
                                    <div className="card-text">
                                        <p>Имя: {userList[currentIndex].name}</p>
                                        <p>Пол: {userList[currentIndex].sex}</p>
                                        <p>Цель: {userList[currentIndex].goal}</p>
                                        <p>Возраст: {userList[currentIndex].age}</p>
                                        <p>Страна: {userList[currentIndex].country}</p>
                                        <p>Образование: {userList[currentIndex].education}</p>
                                        <p>Описание: {userList[currentIndex].description}</p>
                                    </div>
                                    <div className={"card-footer text-center"}>
                                        <ModalWindow
                                            btnName={'Пожаловаться'}
                                            title={'Подать жалобу'}
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
                            <div className={"btn-group w-100"}>
                                <button className={"btn btn-danger"} onClick={goToNextCard}>
                                    Дизлайк
                                </button>
                                <button className={"btn btn-success "}
                                        onClick={() => setLike(userList[currentIndex].login)}>
                                    Лайк
                                </button>
                            </div>
                        </div>
                    )
                }
                {
                    (userList == null || userList.length <= 0 || currentIndex >= userList.length) &&
                    (
                        <h1 className={"m-5 m-auto"}>
                            Анкет больше нет
                        </h1>
                    )
                }
            </div>
        </div>
    )
        ;
};

export default InfiniteUserCard;
