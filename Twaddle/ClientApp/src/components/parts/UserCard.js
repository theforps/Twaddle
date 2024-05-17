import React, { useEffect, useState } from "react";
import {
  DeleteUser,
  GetUser,
  UpdateUser,
  UpdateUserPassword,
} from "../requests/UserQueries";
import ModalWindow from "../additionally/ModalWindow";
import { AddSub, GetSub } from "../requests/SubQueries";
import {GetCountries} from "../requests/RegInfoQueries";
import {Button, Modal} from "react-bootstrap";
import LogoutButton from "../additionally/LogoutButton";

const UserCard = () => {
  const [user, setUser] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagesLoad, setImagesLoad] = useState([]);
  const [sub, setSub] = useState(null);
  const [countries, setCountries] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [snowModal, setSnowModal] = useState(false);
  const [snowModal2, setSnowModal2] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    getCountries();
  }, []);
  const GetUserInfo = async () => {
    const result = await GetUser();

    setUser(result.data.data);

    if (result.data.data.images != null) {
      const yourArray = result.data.data.images;

      const resultImages = [];

      for (let i = 0; i < yourArray.length; i++) {
        const dataUrl = yourArray[i];
        const img = "data:image/png;base64," + dataUrl;
        resultImages.push(img);
      }

      setPictures(resultImages);
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const getCountries = async () => {
    const result = await GetCountries();

    setCountries(result);
  };
  
  const handleDeleteUser = async () => {
    await DeleteUser();
  };

  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    const updatedImages = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      updatedImages.push(file);
    }

    setImagesLoad((prevFormData) => ({
      ...prevFormData,
      images: updatedImages,
    }));
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    const base64Strings = [];
    if (imagesLoad.images != null) {
      const fileList = imagesLoad.images;

      async function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            resolve(base64String);
          };

          reader.onerror = reject;

          reader.readAsDataURL(file);
        });
      }

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const base64String = await readFileAsDataURL(file);
        base64Strings.push(base64String);
      }
    }

    const newUser = {
      name: user.name,
      sex: user.sex,
      goal: user.goal,
      age: user.age,
      country: user.country,
      education: user.education,
      description: user.description,
      images: base64Strings,
      role: sessionStorage.getItem("role"),
    };

    const result = await UpdateUser(newUser);

    setUser(result.data.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % pictures.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length
    );
  };

  const handleChangePassword = async () => {
    const data = {
      oldPassword: document.getElementById("oldPassword").value,
      newPassword: document.getElementById("newPassword").value,
    };

    await UpdateUserPassword(data);
  };

  const handlePeriodSelection = (period) => {
    setSelectedPeriod(period);
  };

  const checkSub = async () => {
    const sub = await GetSub();

    setSub(sub.data);
  };

  const handleCloseModal = () => {
    setSnowModal(false)
  }

  const handleOpenModal = () => {
    setSnowModal(true)
  }

  const handleCloseModal2 = () => {
    setSnowModal2(false)
  }

  const handleOpenModal2 = () => {
    setSnowModal2(true)
  }
  
  const handleSubscription = async () => {
    const result = selectedPeriod;

    await AddSub(result);
  };
  
  const handleSetCountry = (data) => {
    user.country = data;
    setUser(user);
  }
    const handleSetGoal = (data) => {
    user.goal = data;
    setUser(user);
  }
  
  useEffect(() => {
    GetUserInfo();
    checkSub();
  }, []);

  return (
    <div className="about">
      <div className={"d-flex w-100"}>
        <div className="buttons">
          <h1>Профиль</h1>
          <ModalWindow
              btnName={"Подписка"}
              title={"Подписка"}
              modalContent={
                <div>
                  {sub == null && (
                      <div className={"d-flex justify-content-center"}>
                        <div className="card" style={{width: "500px"}}>
                          <div className="card-body">
                            <h5 className="card-title">Зачем нужна подписка?</h5>
                            <p className="card-text">Откройте дверь к миру привилегий с нашей платной подпиской. Получайте эксклюзивный доступ к лучшему контенту, инновационным функциям и уникальным преимуществам. Присоединяйтесь к элитному кругу и раскройте новые горизонты с нами.</p>
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">&#9679;&nbsp;Безлимитный просмотр резюме</li>
                            <li className="list-group-item">&#9679;&nbsp;Создание заказов</li>
                            <li className="list-group-item">&#9679;&nbsp;Возможность делиться новостями</li>
                          </ul>
                          <div className="card-body">
                            <div
                                className={"btn-group d-flex justify-content-center"}
                            >
                              <button
                                  className={"btn btn-outline-secondary w-50"}
                                  onClick={() => handlePeriodSelection("month")}
                                  disabled={selectedPeriod === "month"}
                              >
                                1 месяц - 200 ₽
                              </button>
                              <button
                                  className={"btn btn-outline-primary w-50"}
                                  onClick={() => handlePeriodSelection("year")}
                                  disabled={selectedPeriod === "year"}
                              >
                                12 месяцев - 2000 ₽
                              </button>
                            </div>
                            {selectedPeriod && (
                                <div className="justify-content-center d-flex mt-3">
                                  <button
                                      className="btn btn-success w-100"
                                      onClick={() => handleSubscription()}
                                  >
                                    Оформить подписку
                                  </button>
                                </div>
                            )}
                          </div>
                        </div>
                      </div>
                  )}
                  {sub != null && (
                      <div className={"d-flex justify-content-center"}>
                        <div className="card" style={{width: "500px"}}>
                          <div className="card-body">
                            <h5 className="card-title">Преимущества подписки</h5>
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">&#9679;&nbsp;Безлимитный просмотр резюме</li>
                            <li className="list-group-item">&#9679;&nbsp;Создание заказов</li>
                            <li className="list-group-item">&#9679;&nbsp;Возможность делиться новостями</li>
                          </ul>
                          <div className="card-body">
                            <p className="card-text">Дата начала периода:&nbsp;
                              {new Date(sub.startTime).toLocaleTimeString().slice(0, -3)}&nbsp;
                              {new Date(sub.startTime).toLocaleDateString()}&nbsp;
                            </p>
                            <p className="card-text">Дата окончания периода:&nbsp;
                              {new Date(sub.endTime).toLocaleTimeString().slice(0, -3)}&nbsp;
                              {new Date(sub.endTime).toLocaleDateString()}&nbsp;
                            </p>
                          </div>
                        </div>
                      </div>
                  )}
                </div>
              }
          />

          <button className={"btn btn-primary"} onClick={handleEditClick}>
            Изменить личные данные
          </button>
          <ModalWindow
              btnName={"Изменить пароль"}
              title={"Изменение пароля"}
              modalContent={
                <div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Старый пароль</span>
                    <input
                        type="text"
                        className="form-control"
                        id="oldPassword"
                        placeholder="Введите старый пароль"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Новый пароль</span>
                    <input
                        type="text"
                        className="form-control"
                        id="newPassword"
                        placeholder="Введите новый пароль"
                    />
                  </div>

                  <div className="justify-content-center d-flex">
                    <button
                        className="btn btn-success w-100"
                        type={"button"}
                        onClick={() => handleChangePassword()}
                    >
                      Сменить пароль
                    </button>
                  </div>
                </div>
              }
          />

          <button onClick={handleDeleteUser} className="btn btn-outline-danger">
            Удалить аккаунт
          </button>
        </div>
        <div className={"d-flex w-100 justify-content-start"}>
          <div style={{margin: "70px"}} className={""}>
          {pictures.length > 1 && (
                <div className="image-container-profile p-0">
                  <img
                      src={pictures[currentPhotoIndex]}
                      alt={user.name}
                  />
                </div>
            )}
            {pictures.length === 1 && (
                <div className="image-container-profile p-0">
                  <img
                      src={pictures[currentPhotoIndex]}
                      alt={user.name}
                  />
                </div>
            )}
            {pictures.length === 0 && (
                <div className="image-container-profile p-0">
                  <img
                      src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"
                      alt="Profile"
                  />
                </div>
            )}
            {pictures.length > 1 && (
                <div className={"btn-group w-100"} style={{marginTop: "10px"}}>
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
          {isEditing ? (
              <div className="profile">
                <div className="">
                  <div className={"ms-4 pe-4 w-75"} style={{fontSize: "20px"}}>
                    <p className="d-flex align-items-center" style={{gap: "30px"}}>
                      Имя
                      <input
                          type="text"
                          name="name"
                          className="form-control border-2 border-secondary border-opacity-50"
                          value={user.name}
                          onChange={handleChange}
                      />
                    </p>
                    <p className="d-flex align-items-center" style={{gap: "30px"}}>
                      Пол
                      <input
                          type="text"
                          name="sex"
                          className="form-control border-2 border-secondary border-opacity-50"
                          value={user.sex}
                          onChange={handleChange}
                      />
                    </p>
                    <p className="d-flex align-items-center" style={{gap: "30px"}}>
                      Цель
                      <div>
                        <Button variant="secondary" style={{width: "200px"}} onClick={handleOpenModal2}>
                          {user.goal || "Выберите цель"}
                        </Button>

                        <Modal className={""} show={snowModal2} onHide={handleCloseModal2}>
                          <Modal.Header closeButton>
                            <Modal.Title>Выберите цель</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div style={{height: "100px", margin: "0px 0px"}} className="d-grid"
                                 role="group">
                              <a
                                  name="goal"
                                  className="btn btn-outline-secondary m-1"
                                  onClick={() => handleSetGoal("Ищу заказчика")}
                              >Ищу заказчика</a>
                              <a
                                  name="goal"
                                  className="btn btn-outline-secondary m-1" onClick={() => handleSetGoal("Ищу исполнителя")}>
                                Ищу исполнителя
                              </a>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </div>
                    </p>
                    <p className="d-flex align-items-center" style={{gap: "30px"}}>
                      Возраст
                      <input
                          type="number"
                          name="age"
                          className="form-control border-2 border-secondary border-opacity-50"
                          value={user.age}
                          onChange={handleChange}
                      />
                    </p>
                    <p className="d-flex align-items-center" style={{gap: "30px"}}>
                      Страна
                      {/*<input*/}
                      {/*    type="text"*/}
                      {/*    name="country"*/}
                      {/*    className="form-control border-2 border-secondary border-opacity-50"*/}
                      {/*    value={user.country}*/}
                      {/*    onChange={handleChange}*/}
                      {/*/>*/}
                      <div>
                        <Button variant="secondary" style={{width: "200px"}} onClick={handleOpenModal}>
                          {user.country || "Выберите страну"}
                        </Button>

                        <Modal className={""} show={snowModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Выберите страну</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div style={{height: "600px", margin: "0px 0px", overflowY: "scroll"}} className="d-grid"
                                 role="group">
                              {countries.map((entity) => (
                                  <a
                                      name="country"
                                      className="btn btn-outline-secondary m-1"
                                      onClick={() => handleSetCountry(entity.name)}

                                  >
                                    {entity.name}
                                  </a>
                              ))}
                            </div>
                          </Modal.Body>
                        </Modal>
                      </div>
                    </p>
                    <p className="d-flex align-items-center" style={{gap: "30px"}}>
                      Образование
                      <input
                          type="text"
                          name="education"
                          className="form-control border-2 border-secondary border-opacity-50"
                          value={user.education}
                          onChange={handleChange}
                      />
                    </p>
                    <p className="" style={{gap: "30px"}}>
                      Описание
                      <textarea
                          name="description"
                          className="form-control border-2 border-secondary border-opacity-50"
                          style={{height: "150px", resize: "none"}}
                          value={user.description}
                          onChange={handleChange}
                      />
                    </p>
                    <p className="d-flex align-items-center" style={{gap: "30px"}}>
                      Фотографии
                      <input
                          type="file"
                          className="form-control border-2 border-secondary border-opacity-50"
                          accept={"image/*"}
                          multiple
                          onChange={handleImageUpload}
                      />
                    </p>
                    <div>
                      <div className="saveButtons btn-group">
                        <button
                            className={"btn btn-success"}
                            onClick={handleSaveClick}
                        >
                          Сохранить
                        </button>
                        <button className={"btn btn-danger"} onClick={() => setIsEditing(false)}>
                          Отмена
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ) : (
              user != null && (
                  <div className="profile">
                    <div className="card__body-info mb-auto border border-2 border-secondary border-opacity-25">
                        <p className="card-text-profile w-50 col col-1">Ваш логин: {user.login}</p>
                        <p className="card-text-profile w-75 col col-1">Имя: {user.name}</p>
                        <p className="card-text-profile w-50 col col-1">Возраст: {user.age}</p>
                        <p className="card-text-profile w-75 col col-1">Страна: {user.country}</p>
                        <p className="card-text-profile">Пол: {user.sex}</p>
                        <p className="card-text-profile">Цель: {user.goal}</p>
                      <p className="card-text-profile">
                        Образование: {user.education}
                      </p>
                      <p className="card-text-profile" style={{textWrap:"wrap", width: "300px", height:"200px"}}>
                        Описание: 
                        <p className={"d-block"} style={{fontSize:"15px"}}>{user.description}   Описсаниениие:: Описание: Опи  ие: Описание:сание:  Описсаниениие:: Описание: Описание:  Описсаниениие:: Описание: Описание:  Описсаниениие:: Описание: Описание:  Описсаниениие:: Описание: Описание:  Описсаниениие:: Описание: Описание:</p>
                      </p>
                    </div>
                  </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
