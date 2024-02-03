import React, {useEffect, useState} from 'react';
import {GetCards} from "../requests/CardsQueries";
import {GetUserMatches, SetUserMatch} from "../requests/MatchQueries";

const InfiniteUserCard = ({openMes}) => {
    const [userList, setUserList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [matches, setMatches] = useState([]);
    const [matchId, setMatchId] = useState(null);
    const getCards = async () => {
        
        const token = sessionStorage.getItem('token')
        
        if(token != null) {
            const result = await GetCards(token)
            
            setUserList(result.data.data);
            
            updatePhoto();
            
            console.log("Карточки пользователей:");
            console.log(result.data.data);

            console.log("Текущие фото:");
            console.log(currentPhoto);
        }
    }

    const getMatches = async () => {

        const jwt = sessionStorage.getItem('token');

        const result = await GetUserMatches(jwt);

        console.log("Все метчи:")
        console.log(result.data)

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
    
    const updatePhoto = () => {
        if(userList != null && userList.length > 0 && userList[currentIndex].images != null) {
            const yourArray = userList[currentIndex].images;

            const resultImages = [];

            for (let i = 0; i < yourArray.length; i++) {
                const dataUrl = yourArray[i];
                const img = "data:image/png;base64," + dataUrl;
                resultImages.push(img);
            }

            setCurrentPhoto(resultImages);
        }
        else
        {
            setCurrentPhoto([]);
        }
    }
    
    const goToNextCard = () => {
        setCurrentIndex(currentIndex + 1);

        updatePhoto();
    };

    const setLike = async(secondUser) => {
        setCurrentIndex(currentIndex + 1);

        const token = sessionStorage.getItem('token')
        
        const result = await SetUserMatch(token, secondUser);
        
        console.log("Отправка метча:");
        console.log(result.data);
    }

    const handleNextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % currentPhoto.length);
    };

    const handlePrevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + currentPhoto.length) % currentPhoto.length);
    };

    const handleOpenMatch = (id) => {
        setMatchId(id);
        openMes(matchId);
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
                                        currentPhoto.length > 1 &&
                                        <div>
                                            <button className="btn btn-primary" onClick={handlePrevPhoto}>&lt;</button>
                                            <img
                                                className="card-img-top m-2"
                                                style={{width: '350px', height: '550px'}}
                                                src={currentPhoto[currentPhotoIndex]}
                                                alt={"user"}/>
                                            <button className="btn btn-primary" onClick={handleNextPhoto}>&gt;</button>
                                        </div>
                                    }
                                    {
                                        currentPhoto.length === 1 &&
                                        <div>
                                            <img
                                                className="card-img-top m-2"
                                                style={{width: '350px', height: '550px'}}
                                                src={userList[currentIndex].images[0]}
                                                alt={"user"}/>
                                        </div>
                                    }
                                    {
                                        currentPhoto.length === 0 &&
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
