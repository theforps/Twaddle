import React, {useEffect, useState} from 'react';
import {GetCards} from "../requests/CardsQueries";

const InfiniteUserCard = () => {
    const [userList, setUserList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalCards = userList.length;

    const getCards = async () => {
        
        const token = sessionStorage.getItem('token')
        
        if(token != null) {
            const result = await GetCards(token)

            setUserList(result.data.data);
        }
    }
    
    const goToNextCard = () => {
        if(currentIndex < userList.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    useEffect(() => {
        getCards()
    }, []);
    
    return (
        <div className="w-75 d-flex justify-content-center">
                <div >
                    {userList.length > 0 && (
                        <div className={"m-5"}>
                            <div>
                                <p>{userList[currentIndex].name}</p>
                                <p>{userList[currentIndex].sex}</p>
                                <p>{userList[currentIndex].goal}</p>
                                <p>{userList[currentIndex].age}</p>
                                <p>{userList[currentIndex].country}</p>
                                <p>{userList[currentIndex].education}</p>
                                <p>{userList[currentIndex].description}</p>
                            </div>
                            <div className={"d-flex justify-content-center"}>
                                <button className={"m-3"} onClick={goToNextCard}>
                                    Дизлайк
                                </button>
                                <button className={"m-3"} onClick={goToNextCard}>
                                    Лайк
                                </button>
                            </div>
                        </div>
                    )}
                    {
                        userList.length <= 0 && (
                            <h3>Анкет больше нет</h3>
                        )
                    }
                </div>
        </div>
    );
};

export default InfiniteUserCard;
