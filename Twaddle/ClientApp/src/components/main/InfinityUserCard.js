import React, {useEffect, useState} from 'react';
import {GetCards, SetUserMatch} from "../requests/CardsQueries";

const InfiniteUserCard = () => {
    const [userList, setUserList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const getCards = async () => {
        
        const token = sessionStorage.getItem('token')
        
        if(token != null) {
            const result = await GetCards(token)
            
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
        
        console.log(result)
    }
    
    
    useEffect(() => {
        getCards()
    }, []);
    
    return (
        <div className="w-75 d-flex justify-content-center">
                <div className={"card w-75 border-3 border-danger"}>
                    {userList.length > currentIndex &&  (
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
                                <button className={"m-3"} onClick={() => goToNextCard}>
                                    Дизлайк
                                </button>
                                <button className={"m-3"} onClick={() => setLike(userList[currentIndex].login)}>
                                    Лайк
                                </button>
                            </div>
                        </div>
                    )}
                    {(userList.length <= 0 || currentIndex >= userList.length ) && (
                            <h3>Анкет больше нет</h3>
                        )
                    }
                </div>
        </div>
    );
};

export default InfiniteUserCard;
