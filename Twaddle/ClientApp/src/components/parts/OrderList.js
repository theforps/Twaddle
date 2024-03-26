import React, {useEffect, useState} from "react";
import ModalWindow from "../additionally/ModalWindow";
import {SendReport} from "../requests/CardsQueries";
import {GetSub} from "../requests/SubQueries";
import {DeleteOrder, GetOrders, SendFeedBack} from "../requests/OrdersQueries";

const OrderList = () => {

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

    const getOrders = async () => {
        
        const result = await GetOrders();
        
        setOrders(result);
    }



    const handleSendReport = async(login) => {


        report.Culprit = login;
        report.Content = document.getElementById("report").value;

        await SendReport(report);
    };

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
                <button className={"btn btn-success"}>
                    Создать свой заказ
                </button>
            }
            <div className={"d-flex w-100"}>
                <div className="input-group w-50">
                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                           aria-describedby="search-addon"/>
                    <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init>search</button>
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
                                    {feedbacks.length > 0 &&
                                        <ModalWindow
                                            btnName={'Посмотреть отклики'}
                                            title={'Все отклики на заказ'}
                                            modalContent={
                                                <div>
                                                    {feedbacks.map(item => (
                                                        <div className="card" style="width: 18rem;">
                                                            <div className="card-body">
                                                                <h5 className="card-title">Card title</h5>
                                                                <h6 className="card-subtitle mb-2 text-muted">Card
                                                                    subtitle</h6>
                                                                <p className="card-text">Some quick example text to
                                                                    build on the card title and make up the bulk of the
                                                                    card's content.</p>
                                                                <a href="#" className="card-link">Card link</a>
                                                                <a href="#" className="card-link">Another link</a>
                                                            </div>
                                                        </div>
                                                        ))
                                                    }
                                                </div>
                                            }
                                        />
                                    }
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