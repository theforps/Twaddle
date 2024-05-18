import React, { useEffect, useState } from "react";
import ModalWindow from "../additionally/ModalWindow";
import { SendReport } from "../requests/CardsQueries";
import { GetSub } from "../requests/SubQueries";
import {
  AddOrder,
  DeleteOrder,
  GetFeedbackOfOrder,
  GetOrders,
  SendFeedBack,
} from "../requests/OrdersQueries";
import ModalFeedback from "../additionally/ModalFeedback";
import { GetUserMatchOrder, SetUserMatchOrder } from "../requests/MatchQueries";
import "./style.css";
const OrderList = ({ openMes }) => {
  const [sub, setSub] = useState(null);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    checkSub();
    getOrders();
  }, []);  
  // useEffect(() => {
  //   checkSub();
  //   getOrders();
  // }, [orders]);

  const checkSub = async () => {
    const result = await GetSub();

    setSub(result.data);
  };

  const getOrders = async (data) => {
    const result = await GetOrders(data);

    setOrders(result);
  };

  const handleSearch = () => {
    const search = document.getElementById("search").value;

    getOrders(search);
  };

  const getFeedbacks = async (id) => {
    const result = await GetFeedbackOfOrder(id);

    if (result != null) {
      setFeedbacks(result);
    }
  };

  const handleGetOrderMatch = async (wantingLogin, orderId) => {
    await handleSetApproval(wantingLogin, orderId);
    
    const result = await GetUserMatchOrder(wantingLogin, orderId);
    
    openMes(result.data.data.id);
  };

  const handleCreateOrder = async () => {
    const order = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      startPrice: document.getElementById("startPrice").value,
      endPrice: document.getElementById("endPrice").value,
    };

    await AddOrder(order);
  };

  const handleSendReport = async (login) => {
    report.Culprit = login;
    report.Content = document.getElementById("report").value;

    await SendReport(report);
  };

  const handleSetApproval = async (wantingLogin, orderId) => {
    await SetUserMatchOrder(wantingLogin, orderId);

    setOrders(orders.slice());
  };

  const handleSendReaction = async (comment, id) => {
    await SendFeedBack(comment, id);
  };

  const report = {
    Culprit: "",
    Content: "",
  };

  return (
    <div className="order" >
      <div className={"d-flex w-100 justify-content-center"} >
        <div style={{}}>
        {sub != null && (
          <ModalWindow
            btnName={"Создать свой заказ"}
            title={"Создание заказа"}
            modalContent={
              <div>
                <div className="order-creater">
                  <h6 className={"text-center"}>Название проекта</h6>
                  <input
                      id="title"
                      className="w-100 p-2 form-control"
                      placeholder="Введите название"
                  />
                  <h6 className={"text-center"}>Описание проекта</h6>
                  <textarea
                      style={{minHeight: "150px", maxHeight: "250px"}}
                      id="description"
                      className="w-100 p-2 form-control"
                      placeholder="Введите описание"
                  />
                  <h6 className={"text-center"}>Стоимость проекта</h6>
                  <div className={"input-group"}>
                    <input
                        id="startPrice"
                        type={"number"}
                        className="w-50 p-2 form-control"
                        placeholder="Начальная стоимость"
                    />
                    <input
                        id="endPrice"
                        type={"number"}
                        className="w-50 p-2 form-control"
                        placeholder="Конечная стоимость"
                    />
                  </div>
                </div>
                <div className="justify-content-center d-flex">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => handleCreateOrder()}
                  >
                    Создать
                  </button>
                </div>
              </div>
            }
          />
        )}
        </div>
        <div className="search-order input-group ps-4">
          <input
              id="search"
              type="text"
              className="form-control"
              placeholder="Поиск..."
          />
          <button
              className="btn btn-success"
              onClick={() => handleSearch()}
              type="button"
          >
            Поиск
          </button>
        </div>
      </div>
      <div style={{display: "flex", gap: "10px", flexDirection: "column",maxHeight: "650px", overflowY: "scroll",width:"970px"}}>
        {orders != null &&
            orders.length > 0 &&
            orders.map((item) => (
                <div key={item.id} >
                  <div className="card">
                  <h5 className="card-title ps-2 pe-2 pt-3">{item.title}</h5>
                  <p className="card-text ps-2 pe-2 pb-2">{item.description}</p>
                    <div className={"d-flex justify-content-between align-items-center ps-2 pe-2 w-100 mb-2"}>
                      <div className="match-profile align-content-center d-flex me-4 pe-4">
                        {(item.creator.images == null || item.creator.images .length == 0) && (
                            <img className={"border-secondary-subtle border-2 border"} src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"/>
                        )}
                        {(item.creator.images  != null && item.creator.images .length != 0) && (

                            <img className={"border-secondary-subtle border-2 border"} src={"data:image/png;base64," + item.creator.images[0]}/>
                        )}
                        <h6 className="card-subtitle text-muted">
                          {item.creator.name}
                        </h6>
                      </div>
                      <h6 className="text-muted d-grid p-0 m-0 ">
                        <p className={"p-0 m-0"}>
                        Дата публикации: &nbsp;
                        </p>
                        <p className={"p-0 m-0"}>
                        {new Date(item.createdTime).toLocaleDateString()}&nbsp;
                        {new Date(item.createdTime).toLocaleTimeString().slice(0, -3)}
                        </p>
                      </h6 >
                      <h6 className="text-muted">
                        
                        {item.startPrice != 0 && item.endPrice == 0 && (<span>ОТ {item.startPrice}</span>)}
                        {item.endPrice != 0 && item.startPrice == 0 && (<span>ДО {item.endPrice}</span>)}
                        {item.endPrice != 0 && item.startPrice != 0 && (<span>{item.startPrice} - {item.endPrice}</span>)}
                        
                        {(item.startPrice != 0 || item.endPrice != 0) && (<span>&nbsp;₽</span>)}
                      </h6>
                      {item.creator.login !== sessionStorage.getItem("user") && (
                          <div className="buttons-order">
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
                                          className="btn btn-success"
                                          type={"submit"}
                                          onClick={() =>
                                              handleSendReport(item.creator.login)
                                          }
                                      >
                                        Отправить жалобу
                                      </button>
                                    </div>
                                  </div>
                                }
                            />
                            <ModalWindow
                                btnName={"Откликнуться"}
                                title={"Откликнуться на заказ"}
                                modalContent={
                                  <div>
                                    <div className="">
                                      <h5 className={"text-center mb-2"}>Сообщение заказчику</h5>
                                      <textarea
                                          id="reaction"
                                          className="w-100 p-2 form-control"
                                          style={{
                                            minHeight: "200px",
                                            maxHeight:"500px",
                                            textWrap: "inherit",
                                          }}
                                          placeholder="Введите ваще сообщение"
                                      />
                                    </div>
                                    <div className="justify-content-center d-flex">
                                      <button
                                          className="btn btn-success w-100 mt-4"
                                          type={"submit"}
                                          onClick={() =>
                                              handleSendReaction(
                                                  document.getElementById("reaction").value,
                                                  item.id
                                              )
                                          }
                                      >
                                        Отправить отклик
                                      </button>
                                    </div>
                                  </div>
                                }
                            />
                          </div>
                      )}
                      {item.creator.login === sessionStorage.getItem("user") && (
                          <div className="buttons-order">
                            <button
                                className={"btn btn-danger"}
                                onClick={() => DeleteOrder(item.id)}
                            >
                              Удалить
                            </button>
                            <ModalFeedback
                                btnName={"Посмотреть отклики"}
                                title={"Все отклики на заказ"}
                                getFeedback={() => getFeedbacks(item.id)}
                                modalContent={
                                  <div>
                                    {feedbacks.length > 0 &&
                                        feedbacks.map((feed) => (
                                            <div className="card mb-3" key={feed.id}>
                                              <div className="card-body">
                                                <div className="match-profile align-content-center d-flex justify-content-start mb-3">
                                                  {(feed.wanting.images == null || feed.wanting.images.length == 0) && (
                                                      <img className={"border-secondary-subtle border-2 border"}
                                                           src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"/>
                                                  )}
                                                  {(feed.wanting.images != null && feed.wanting.images.length != 0) && (

                                                      <img className={"border-secondary-subtle border-2 border"}
                                                           src={"data:image/png;base64," + feed.wanting.images[0]}/>
                                                  )}
                                                  <h5 className="card-title">
                                                    {feed.wanting.name}
                                                  </h5>
                                                </div>
                                                <h6 className="card-subtitle mb-2 text-muted">
                                                  {feed.wanting.description}
                                                </h6>
                                                {feed.comment != null && feed.comment.length > 0 && (
                                                  <div>
                                                    <h6 className="card-text mb-2 text-center">
                                                      Сообщение 
                                                    </h6>
                                                    <p className="card-text border border-1 p-3 border-secondary-subtle" style={{borderRadius:"10px"}}>{feed.comment}</p>
                                                  </div>
                                                )}
                                              </div>
                                              <div className={"btn-group"}>
                                                {/*{!feed.isLike && (*/}
                                                {/*    <button*/}
                                                {/*        className={"btn btn-primary ms-3 me-3 mb-3"}*/}
                                                {/*        */}
                                                {/*        onClick={() =>*/}
                                                {/*            handleSetApproval(*/}
                                                {/*                feed.wanting.login,*/}
                                                {/*                item.id*/}
                                                {/*            )*/}
                                                {/*        }*/}
                                                {/*        */}
                                                {/*    >*/}
                                                {/*    Одобрить*/}
                                                {/*    </button>*/}
                                                {/*)}*/}
                                                
                                                  <button
                                                      className={"btn btn-success ms-3 me-3 mb-3"}
                                                      onClick={() =>
                                                          handleGetOrderMatch(
                                                              feed.wanting.login,
                                                              item.id
                                                          )
                                                      }
                                                  >
                                                    Написать сообщение
                                                  </button>
                                                
                                              </div>
                                            </div>
                                        ))}
                                    {feedbacks.length === 0 && <div>Откликов нет</div>}
                                  </div>
                                }
                            />
                          </div>
                      )}
                    </div>
                  </div>
                </div>
            ))}
        {orders.length == 0 && (
            <div className={"m-auto text-center d-flex justify-content-center align-content-center align-items-center"} style={{height:"1000px"}}>
              <h3 className={"text-center m-auto"}>Заказов нет</h3>
            </div>
      )}
    </div>
    </div>
  );
};

export default OrderList;
