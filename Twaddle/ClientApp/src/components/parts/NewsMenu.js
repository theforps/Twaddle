import React, {useEffect, useState} from 'react';
import {AddNews, DeleteNews, GetNews, SetLike} from "../requests/NewsQueries";
import {Await} from "react-router-dom";
import ModalWindow from "../additionally/ModalWindow";
import {SendReport} from "../requests/CardsQueries";

const NewsMenu = () => {
    const [newPost, setNewPost] = useState('');
    const [news, setNews] = useState([]);
    
    
    const loadNews = async(data) => {
        
        const result = await GetNews(data);
        
        setNews(result);
    }

    const handleSearch = () => {
        
        const search = document.getElementById("search").value;
        
        
        loadNews(search)
    };
    
    
    const handleNewPostChange = (e) => {
        setNewPost(e.target.value);
    };
    const handlePostSubmit = async() => {
        if (newPost.trim() !== '') {
            const newNewsItem = {
                key: newPost,
            };
            
            
            const result = await AddNews(newNewsItem)
            
            setNewPost('');
        }
    };

    
    const handleLike = async(newsId) => {
        const updatedNews = [...news];
        
        const result = updatedNews.find(x => x.id === newsId);
        
        
        if(!result.fans.includes(sessionStorage.getItem('user')))
            result.fans.push(sessionStorage.getItem('user'));
        else
            result.fans.splice(result.fans.indexOf(sessionStorage.getItem('user')),1);
        
        await SetLike(newsId);
        
        
        setNews(updatedNews);
    };
    
    
    const handleSendReport = async(login) => {
        

        report.Culprit = login;
        report.Content = document.getElementById("report").value;

        await SendReport(report);
    };

    const report = {
        Culprit: '',
        Content: ''
    }
    
    return (
        <div className={"w-100 "}>
            <div className={"d-flex"}>
                <div className="input-group mb-3 w-50 m-auto">
                    <input
                           id="search"
                           type="text"
                           className="form-control"
                           placeholder="Поиск..."/>
                    <button className="btn btn-success"
                            onClick={handleSearch}
                            type="button">Искать
                    </button>
                </div>
            </div>
            <div className="card w-50 m-auto mb-3">
                <div className="card-body">
                    <div className="input-group">
                        <textarea
                            onChange={handleNewPostChange}
                            value={newPost}
                            className="form-control"
                            placeholder={"Что нового?"}
                            style={{height: "150px", resize: "none"}}></textarea>
                        <button
                            onClick={() => handlePostSubmit()}
                            className="btn btn-outline-secondary"
                            type="button">Запостить
                        </button>
                    </div>
                </div>
            </div>
            <div style={{maxHeight: "500px", overflowY: "scroll"}}>
            {loadNews && news != null && news.map(item => (
                <div className="card w-50 m-auto mb-2" key={item.id}>
                    <div className="card-body">
                        <p className="card-text">{item.description}</p>
                        <div className={"d-flex justify-content-between align-items-center"}>
                            <h6 className="card-subtitle mb-2 text-muted">{item.creator.name}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{new Date(item.createdTime).toLocaleString()}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{item.fans.length}</h6>
                            <div className={"btn-group"}>
                                <button className={"btn btn-primary"} onClick={() => handleLike(item.id)}>Лайк</button>
                                {item.creator.login !== sessionStorage.getItem('user') && <ModalWindow
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
                                                        onClick={() => handleSendReport(item.creator.login)}>Отправить жалобу
                                                </button>
                                            </div>
                                        </div>
                                    }
                                />}
                                {item.creator.login === sessionStorage.getItem('user') && 
                                    <button 
                                        className={"btn btn-danger"}
                                        onClick={() => DeleteNews(item.id)}>
                                        Удалить
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default NewsMenu;