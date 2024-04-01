import React, {useEffect, useState} from "react";
import ModalWindow from "../additionally/ModalWindow";
import {SendReport} from "../requests/CardsQueries";
import {GetSub} from "../requests/SubQueries";
import {AddOrder, DeleteOrder, GetFeedbackOfOrder, GetOrders, SendFeedBack} from "../requests/OrdersQueries";
import ModalFeedback from "../additionally/ModalFeedback";
import {GetUserMatchOrder, SetUserMatchOrder} from "../requests/MatchQueries";

const OrderList = ({openMes}) => {

    const [sub, setSub] = useState(null);
    const [orders, setOrders] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    
    
    useEffect(() => {
        checkSub();
        getOrders();
    }, []);
    
    
    const checkSub = async() => {

        const result = await GetSub();

        setSub(result.data);
    }

    const getOrders = async (data) => {
        
        const result = await GetOrders(data);
        
        setOrders(result);

    }

    const handleSearch = () => {

        const search = document.getElementById("search").value;


        getOrders(search)
    };
    
    const getFeedbacks = async (id) => {

       
        const result = await GetFeedbackOfOrder(id);
        
        if(result != null) {
            setFeedbacks(result);
        }
    }

    const handleGetOrderMatch = async (wantingLogin, orderId) => {
        
        const result = await GetUserMatchOrder(wantingLogin, orderId);
        
        openMes(result.data.data.id);
    }
    
    const handleCreateOrder = async() => {
        
        const order = {
            title : document.getElementById("title").value,
            description : document.getElementById("description").value,
            startPrice : document.getElementById("startPrice").value,
            endPrice : document.getElementById("endPrice").value,
        };
        
        await AddOrder(order);
    }
    
    const handleSendReport = async(login) => {


        report.Culprit = login;
        report.Content = document.getElementById("report").value;

        await SendReport(report);
    };
    
    const handleSetApproval = async (wantingLogin, orderId) => 
    {
        await SetUserMatchOrder(wantingLogin, orderId);
        
        setOrders(orders.slice());
    }
    
    const handleSendReaction = async(comment, id) => {

        await SendFeedBack(comment, id);
        
        
    };

    const report = {
        Culprit: '',
        Content: ''
    }

    return (
        <div className={"w-100 "}>
            <p>Сделать сортировку (показать только мои, по новизне, по количеству откликов(ебануть рандом) )</p>
            {sub != null &&
                <ModalWindow
                    btnName={'Создать свой заказ'}
                    title={'Создание заказа'}
                    modalContent={
                        <div>
                            <div className="m-3">
                                <input
                                    id="title"
                                    className="w-100 p-2 form-control"
                                    placeholder="Введите заголовок"
                                />
                                <input
                                    id="description"
                                    className="w-100 p-2 form-control"
                                    placeholder="Введите описание"
                                />
                                <input
                                    id="startPrice"
                                    type={"number"}
                                    className="w-100 p-2 form-control"
                                    placeholder="Начальная стоимость"
                                />
                                <input
                                    id="endPrice"
                                    type={"number"}
                                    className="w-100 p-2 form-control"
                                    placeholder="Конечная стоимость"
                                />
                            </div>
                            <div className="justify-content-center d-flex">
                                <button className="btn btn-success"
                                        onClick={() => handleCreateOrder()}
                                >Создать
                                </button>
                            </div>
                        </div>
                    }
                />
            }
            <div className={"d-flex w-100"}>
                <div className="input-group w-50">
                    <input type="search" id="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                           aria-describedby="search-addon"/>
                    <button 
                        onClick={() => handleSearch()}
                        type="button" 
                        className="btn btn-outline-primary" 
                        data-mdb-ripple-init>search</button>
                </div>
            </div>
            <div>
                {orders.length > 0 &&
                    orders.map(item => (
                    <div key={item.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                            <h6 className="card-subtitle mb-2 text-muted">{item.createdTime}</h6>
                            {item.creator.login !== sessionStorage.getItem('user') && (
                                <div className={"btn-group"} style={{float: "right"}}>
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
                                                        onClick={() => handleSendReport(item.creator.login)}
                                                    >Отправить жалобу
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    />
                                    <ModalWindow
                                        btnName={'Отклик'}
                                        title={'Откликнуться на вакансию'}
                                        modalContent={
                                            <div>
                                                <div className="m-3">
                                                    <textarea
                                                        id="reaction"
                                                        className="w-100 p-2 form-control"
                                                        style={{
                                                            height: "300px",
                                                            resize: "none",
                                                            textWrap: "inherit",
                                                        }}
                                                        placeholder="Введите ваще сообщение (по желанию)"
                                                    />
                                                </div>
                                                <form className="justify-content-center d-flex">
                                                    <button className="btn btn-success" type={"submit"}
                                                            onClick={() => handleSendReaction(
                                                                document.getElementById("reaction").value, item.id
                                                            )}
                                                    >Отправить отклик
                                                    </button>
                                                </form>
                                            </div>
                                        }
                                    />
                                </div>
                            )}
                            {item.creator.login === sessionStorage.getItem('user') && (
                                <div className={"btn-group"} style={{float: "right"}}>
                                    <button
                                        className={"btn btn-danger"}
                                        onClick={() => DeleteOrder(item.id)}
                                    >
                                        Удалить
                                    </button>
                                    <ModalFeedback
                                        btnName={'Посмотреть отклики'}
                                        title={'Все отклики на заказ'}
                                        getFeedback={() => getFeedbacks(item.id)}
                                        modalContent={
                                            <div>
                                                {feedbacks.length > 0 && feedbacks.map(feed => (
                                                    <div className="card" key={feed.id}>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{feed.wanting.name}</h5>
                                                            <h6 className="card-subtitle mb-2 text-muted">{feed.wanting.description}</h6>
                                                            <p className="card-text">{feed.comment}</p>
                                                        </div>
                                                        <div className={"btn-group"}>
                                                            {!feed.isLike && 
                                                                <button 
                                                                    className={"btn btn-primary"} 
                                                                    onClick={() => handleSetApproval(feed.wanting.login, item.id)}
                                                                >Одобрить</button>
                                                            }
                                                            {feed.isLike &&
                                                                <button 
                                                                    className={"btn btn-success"}
                                                                    onClick={() => handleGetOrderMatch(feed.wanting.login, item.id)}
                                                                >Написать сообщение</button>
                                                            }
                                                        </div>
                                                    </div>
                                                    ))
                                                }
                                                {feedbacks.length === 0 &&
                                                    <div>Откликов нет</div>
                                                }
                                            </div>
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    );
}

export default OrderList;