import React, {useEffect, useState} from 'react';
import {GetCards} from "../requests/CardsQueries";
import {SetUserMatch} from "../requests/MatchQueries";

const InfiniteUserCard = () => {
    const [userList, setUserList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const getCards = async () => {
        
        const token = sessionStorage.getItem('token')
        
        if(token != null) {
            const result = await GetCards(token)

            console.log("Карточки пользователей:");
            console.log(result.data);
            
            setUserList(result.data.data);
        }
    }
    
    const goToNextCard = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const setLike = async(secondUser) => {
        setCurrentIndex(currentIndex + 1);

        const token = sessionStorage.getItem('token')
        
        const result = await SetUserMatch(token, secondUser);
        
        console.log("Отправка метча:");
        console.log(result.data);
    }
    
    
    useEffect(() => {
        getCards()
    }, []);
    
    return (
        <div className="d-flex justify-content-center">
                <div className={"card border-3 border-light-subtle"}>
                    {userList.length > currentIndex &&  (
                        <div className={"m-4"}>
                            <div>
                                <p>Имя: {userList[currentIndex].name}</p>
                                <p>Пол: {userList[currentIndex].sex}</p>
                                <p>Цель: {userList[currentIndex].goal}</p>
                                <p>Возраст: {userList[currentIndex].age}</p>
                                <p>Страна: {userList[currentIndex].country}</p>
                                <p>Образование: {userList[currentIndex].education}</p>
                                <p>Описание: {userList[currentIndex].description}</p>
                            </div>
                            <div className={"d-flex justify-content-center"}>
                                <button className={"btn btn-danger m-3"} onClick={goToNextCard}>
                                    Дизлайк
                                </button>
                                <button className={"btn btn-success m-3"} onClick={() => setLike(userList[currentIndex].login)}>
                                    Лайк
                                </button>
                            </div>
                        </div>
                    )}
                    {(userList.length <= 0 || currentIndex >= userList.length ) && (
                            <h1 className={"m-5"}>Анкет больше нет</h1>
                        )
                    }
                </div>
        </div>
    );
};

export default InfiniteUserCard;
