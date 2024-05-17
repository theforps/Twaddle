import React, { useEffect, useState } from "react";
import { GetCards, SendReport } from "../requests/CardsQueries";
import { GetUserMatches, SetUserMatch } from "../requests/MatchQueries";
import ModalWindow from "../additionally/ModalWindow";

const InfiniteUserCard = ({ openMes }) => {
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [photoIndex, setPhotoIndex] = useState(0);

  const [matches, setMatches] = useState([]);
  const getCards = async () => {
    const result = await GetCards();

    setUserList(result.data.data);
  };

  const getMatches = async () => {
    const result = await GetUserMatches();

    const tempArrayMatches = result.data.data;

    if (tempArrayMatches != null) {
      let result = [];

      for (let i = 0; i < tempArrayMatches.length; i++) {
        if (tempArrayMatches[i].messages.length === 0) {
          result.push(tempArrayMatches[i]);
        }
      }
      setMatches(result);
    }
  };

  const goToNextCard = () => {
    setCurrentIndex(currentIndex + 1);
    setPhotoIndex(0);
  };

  const setLike = async (secondUser) => {
    setCurrentIndex(currentIndex + 1);
    setPhotoIndex(0);

    await SetUserMatch(secondUser);
  };

  const handleNextPhoto = () => {
    setPhotoIndex(
      (prevIndex) => (prevIndex + 1) % userList[currentIndex].images.length
    );
  };

  const handlePrevPhoto = () => {
    setPhotoIndex(
      (prevIndex) =>
        (prevIndex - 1 + userList[currentIndex].images.length) %
        userList[currentIndex].images.length
    );
  };

  const handleSendReport = async () => {
    console.log(userList[currentIndex]);

    report.Culprit = userList[currentIndex].login;
    report.Content = document.getElementById("report").value;

    await SendReport(report);
  };

  const report = {
    Culprit: "",
    Content: "",
  };

  const handleOpenMatch = (id) => {
    openMes(id);
  };

  useEffect(() => {
    getCards();
    getMatches();
  }, []);

  return (
    <div className={"d-flex"} style={{minHeight:"750px"}}>
      <div className="" style={{float:"right",width:"25%", borderRight: "darkgray solid 1px"}}>
        <div className="card-header text-center">
          <h4>Совпадения</h4>
        </div>
        <div className="mt-2">
          {matches.length > 0 ? (
            matches.map(
              (match) =>
                  match.isMutually && (
                  <button
                    key={match.id}
                    className={"btn btn-primary m-1"}
                    style={{backgroundColor:"#106cc2"}}
                    onClick={() => handleOpenMatch(match.id)}
                  >
                    <div className="match-profile">
                      {(match.pair.pictures == null || match.pair.pictures.length == 0) && (
                          <img className={"border-secondary border-2 border border-opacity-25"} src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"/>
                      )}
                      {(match.pair.pictures != null && match.pair.pictures.length != 0) && (

                          <img className={"border-secondary border-2 bg-white border border-opacity-25"} src={"data:image/png;base64," + match.pair.pictures[0]}/>
                      )}
                      {match.pair.name}
                    </div>
                  </button>
                )
            )
          ) : (
            <p>Совпадений нет</p>
          )}
        </div>
      </div>
      <div className="card border-0" style={{marginTop:"10px"}}>
        {userList != null && userList.length > currentIndex && (
          <div className="p-3 ">
            <div className={"d-flex "}>
              <div style={{height:"600px"}}>
                {userList[currentIndex].images.length > 1 && (
                    <div className="image-container p-2">
                      <img
                          src={
                              "data:image/png;base64," +
                              userList[currentIndex].images[photoIndex]
                          }
                          alt={"user"}
                      />
                    </div>
                )}
                {userList[currentIndex].images.length === 1 && (
                    <div className="image-container p-2">
                      <img
                          src={
                              "data:image/png;base64," +
                              userList[currentIndex].images[0]
                          }
                          alt={"user"}
                      />
                    </div>
                )}
                {userList[currentIndex].images.length === 0 && (
                    <div className="image-container p-0">
                      <img
                          src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"
                          alt={"user"}
                      />
                    </div>
                )}
                {userList[currentIndex].images.length > 1 && (
                <div className={"btn-group w-100"} style={{marginTop:"10px"}}>
                  <button
                      className="btn btn-primary"
                      onClick={handlePrevPhoto}
                  >
                    &lt;
                  </button>
                  <button
                      className="btn btn-primary"
                      onClick={handleNextPhoto}
                  >
                    &gt;
                  </button>
                </div>
                    )}
              </div>
              <div className={"card-body m-0"} style={{width: "430px"}}>
                <div className={"text-center"} style={{float:"right"}}>
                  <ModalWindow
                      btnName={"Пожаловаться"}
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
                                onClick={handleSendReport}
                            >
                              Отправить жалобу
                            </button>
                          </div>
                        </div>
                      }
                  />
                </div>
                <div className="card-text p-4" style={{fontSize: "20px"}}>
                  <p>Имя: {userList[currentIndex].name}</p>
                  <p>Пол: {userList[currentIndex].sex}</p>
                  <p>Цель: {userList[currentIndex].goal}</p>
                  <p>Возраст: {userList[currentIndex].age}</p>
                  <p>Страна: {userList[currentIndex].country}</p>
                  <p>Образование: {userList[currentIndex].education}</p>
                  <p>Описание: {userList[currentIndex].description} </p>
                </div>

              </div>
            </div>
            <div className={"w-100 d-flex justify-content-center"}>
              <button className={"btn btn-danger ms-2 me-2"} style={{width: "300px", height: "100px", fontSize: "25px"}}
                      onClick={goToNextCard}>
                
                Пропустить
              </button>
              <button
                  className={"btn btn-success me-2 ms-2"}
                  style={{width: "300px", height: "100px", fontSize: "25px"}}
                  onClick={() => setLike(userList[currentIndex].login)}
              >
                Согласиться на взаимодействие
              </button>
            </div>
          </div>
        )}
        {(userList == null ||
            userList.length <= 0 ||
            currentIndex >= userList.length) && (
            <h1 className={"text-center m-auto"} style={{width:"1000px"}}>Анкет больше нет</h1>
        )}
      </div>
    </div>
  );
};

export default InfiniteUserCard;
