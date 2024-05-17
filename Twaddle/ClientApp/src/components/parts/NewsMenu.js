import React, { useEffect, useState } from "react";
import { AddNews, DeleteNews, GetNews, SetLike } from "../requests/NewsQueries";
import { Await } from "react-router-dom";
import ModalWindow from "../additionally/ModalWindow";
import { SendReport } from "../requests/CardsQueries";
import { GetSub } from "../requests/SubQueries";
import "./style.css";
const NewsMenu = () => {
  const [newPost, setNewPost] = useState("");
  const [news, setNews] = useState([]);
  const [sub, setSub] = useState(null);

  // useEffect(() => {
  //   checkSub();
  //   loadNews();
  // },[news] );  
  useEffect(() => {
    checkSub();
    loadNews();
  },[] );

  const loadNews = async (data) => {
    const result = await GetNews(data);

    setNews(result);
  };

  const handleSearch = () => {
    const search = document.getElementById("search").value;

    loadNews(search);
  };

  const handleNewPostChange = (e) => {
    setNewPost(e.target.value);
  };
  const handlePostSubmit = async () => {
    if (newPost.trim() !== "") {
      const newNewsItem = {
        key: newPost,
      };

      const result = await AddNews(newNewsItem);

      setNewPost("");
    }
  };

  const handleLike = async (newsId) => {
    const updatedNews = [...news];

    const result = updatedNews.find((x) => x.id === newsId);

    if (!result.fans.includes(sessionStorage.getItem("user")))
      result.fans.push(sessionStorage.getItem("user"));
    else
      result.fans.splice(
        result.fans.indexOf(sessionStorage.getItem("user")),
        1
      );

    await SetLike(newsId);

    setNews(updatedNews);
  };

  const checkSub = async () => {
    const result = await GetSub();

    setSub(result.data);
  };

  const handleSendReport = async (login) => {
    report.Culprit = login;
    report.Content = document.getElementById("report").value;

    await SendReport(report);
  };

  const report = {
    Culprit: "",
    Content: "",
  };

  const getAvatar = (url) => {
    return "data:image/png;base64,"+url
  }
  
  return (
    <div className={"w-100 "}>
      <div className={"d-flex"}>
        <div className="search input-group">
          <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Поиск..."
          />
          <button
            className="btn btn-success"
            onClick={handleSearch}
            type="button"
          >
            Поиск
          </button>
        </div>
        
      </div>
      {sub != null && (
          
        <div className="card m-auto mb-3" style={{ width:"1000px" }}>
          <div className="card-body">
            <div className="">
              <textarea
                onChange={handleNewPostChange}
                value={newPost}
                style={{minHeight:"50px",height:"50px",maxHeight:"200px", padding:"10px"}}
                className="postNews border-1 border-secondary-subtle"
                placeholder={"Что у вас нового?"}
              ></textarea>
              <button
                onClick={() => handlePostSubmit()}
                className="btn btn-primary w-100"
                type="button"
              >
                Опубликовать запись
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={"m-auto"} style={{ minHeight: "500px", width:"1000px" }}>
        {loadNews &&
          news != null &&
          news.map((item) => (
            <div className="card m-auto mb-2" key={item.id}>
              <div className="card-body">
                <p className="card-text">{item.description}</p>
                <div
                    className={
                      "d-flex justify-content-between align-items-center align-content-center"
                    }
                >
                  <div className="match-profile align-content-center d-flex">
                    {(item.creator.pictures == null || item.creator.pictures.length == 0) && (
                        <img className={"border-secondary-subtle border-2 border"} src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"/>
                    )}
                    {(item.creator.pictures != null && item.creator.pictures.length != 0) && (
                        
                        <img className={"border-secondary-subtle border-2 border"} src={"data:image/png;base64," + item.creator.pictures[0]}/>
                    )}
                    <h6 className="card-subtitle text-muted">
                      {item.creator.name}
                    </h6>
                  </div>
                  <h6 className="card-subtitle text-muted">
                    Дата публикации: &nbsp;
                    {new Date(item.createdTime).toLocaleDateString()}&nbsp;
                    {new Date(item.createdTime).toLocaleTimeString().slice(0,-3)}
                  </h6>
                  
                  <h6 className="card-subtitle text-muted">
                    Количество оценок:&nbsp;
                    {item.fans.length}
                  </h6>
                  <div className={"d-flex justify-content-around"} style={{width: "270px"}}>
                    <button
                        className="btn btn-success"
                        onClick={() => handleLike(item.id)}
                    >
                      Оценить❤️
                    </button>
                    {item.creator.login !== sessionStorage.getItem("user") && (
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
                                <div className="justify-content-center d-flex ">
                                  <button
                                      className="btn btn-success w-100 m-3"
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
                    )}
                    {item.creator.login === sessionStorage.getItem("user") && (
                        <button
                            className={"btn btn-danger"}
                            style={{width: "150px"}}
                            onClick={() => DeleteNews(item.id)}
                        >
                          Удалить🗑️
                        </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        {news.length == 0 && (
            <div className={"m-auto text-center d-flex justify-content-center align-content-center align-items-center"}
                 style={{height: "400px"}}>
              <h3 className={"text-center m-auto"}>Новостей нет</h3>
            </div>
        )}
      </div>
    </div>
  );
};

export default NewsMenu;
