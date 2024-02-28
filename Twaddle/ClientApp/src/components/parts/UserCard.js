import React, {useEffect, useState} from "react";
import {DeleteUser, GetUser, UpdateUser, UpdateUserPassword} from "../requests/UserQueries";
import ModalWindow from "../additionally/ModalWindow";
import {AddSub, GetSub} from "../requests/SubQueries";

const UserCard = () => {
    const[user, setUser] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [imagesLoad, setImagesLoad] = useState([]);
    const [sub, setSub] = useState(null);
    
    const [pictures, setPictures] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const GetUserInfo = async() => {
        
        const result = await GetUser();
        
        setUser(result.data.data);

        if(result.data.data.images != null) {
            const yourArray = result.data.data.images;

            const resultImages = [];

            for (let i = 0; i < yourArray.length; i++) {
                const dataUrl = yourArray[i];
                const img = "data:image/png;base64," + dataUrl;
                resultImages.push(img);
            }
                
            setPictures(resultImages);            
        }
    }
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDeleteUser = async () => {
        
        await DeleteUser();
    }
    
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
        
    const handleSaveClick = async() => {

        setIsEditing(false);

        const base64Strings = [];
        if(imagesLoad.images != null) {
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

            for (let i = 0; i < fileList.length; i++) 
            {
                const file = fileList[i];
                const base64String = await readFileAsDataURL(file);
                base64Strings.push(base64String);
            }
        }
        
        const newUser = {
            name : user.name,
            sex: user.sex,
            goal: user.goal,
            age: user.age,
            country: user.country,
            education: user.education,
            description: user.description,
            images: base64Strings,
            role: sessionStorage.getItem('role')
        }

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
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length);
    };
    
    const handleChangePassword = async() => {
        
        const data = {
            oldPassword : document.getElementById("oldPassword").value,
            newPassword : document.getElementById("newPassword").value
        }
        
        await UpdateUserPassword(data);
    }

    const handlePeriodSelection = (period) => {
        setSelectedPeriod(period);
    };

    const checkSub = async() => {
        const sub = await GetSub();
        
        setSub(sub.data)
    }
    
    const handleSubscription = async() => {
        
        const result = selectedPeriod;
        
        await AddSub(result);
        
    };
    
    useEffect(() => {
        GetUserInfo()
        checkSub()
    }, []);

    return (
        <div className={"d-flex w-100"}>
            <div className={"bg-white"} style={{width: 'max-content'}}>
                <ModalWindow
                    btnName={'Подписка'}
                    title={'Подписка'}
                    modalContent={
                        <div>
                            {sub == null &&
                                <div>    
                                    <h2>Выберите подписку</h2>
                                    <p>Описание подписки: ...</p>
        
                                    <div className={"btn-group d-flex justify-content-center mb-3"}> 
                                        <button
                                            className={"btn btn-outline-secondary"}
                                            onClick={() => handlePeriodSelection('month')}
                                            disabled={selectedPeriod === 'month'}
                                        >
                                            Ежемесячно (1000 руб./мес)
                                        </button>
                                        <button
                                            className={"btn btn-outline-primary"}
                                            onClick={() => handlePeriodSelection('year')}
                                            disabled={selectedPeriod === 'year'}
                                        >
                                            Ежегодно (10000 руб./год)
                                        </button>
                                    </div>
                                    {selectedPeriod && (
                                        <div className="justify-content-center d-flex">
                                            <button className="btn btn-success" onClick={() => handleSubscription()}>Оформить подписку</button>
                                        </div>
                                    )}
                                </div>
                            }
                            {sub != null &&
                                <div>
                                    <p>Описание подписки</p>
                                    <p>Дата начала: {sub.startTime}</p>
                                    <p>Дата окончания: {sub.endTime}</p>
                                </div>
                            }

                        </div>
                    }
                />
                
                <button className={"btn btn-success"} onClick={handleEditClick}>
                    Изменить личные данные
                </button>
                <ModalWindow
                    btnName={'Изменить пароль'}
                    title={'Изменение пароля'}
                    modalContent={
                    
                        <div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Старый пароль</span>
                                <input type="text" className="form-control" id="oldPassword" placeholder="Введите старый пароль"/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Новый пароль</span>
                                <input type="text" className="form-control" id="newPassword" placeholder="Введите новый пароль"/>
                            </div>
                            
                            <div className="justify-content-center d-flex">
                                <button className="btn btn-success" type={"button"}
                                        onClick={() => handleChangePassword()}>Сменить пароль
                                </button>
                            </div>
                        </div>
                    }
                />

                <button onClick={handleDeleteUser} className="btn btn-outline-danger">
                    Удалить аккаунт
                </button>
            </div>
            <div className={"d-flex w-100 justify-content-center"}>
                {
                    isEditing ?
                        (
                            <div className="d-flex p-5">
                                <div>
                                    {
                                        pictures.length > 1 &&
                                        <div>
                                            <button className="btn btn-primary" onClick={handlePrevPhoto}>&lt;</button>
                                            <img
                                                className="card-img-top m-2"
                                                style={{width: '350px', height: '550px'}}
                                                src={pictures[currentPhotoIndex]}
                                                alt={user.name}/>
                                            <button className="btn btn-primary" onClick={handleNextPhoto}>&gt;</button>
                                        </div>
                                    }
                                    {
                                        pictures.length === 1 &&
                                        <div>
                                            <img
                                                className="card-img-top m-2"
                                                style={{width: '350px', height: '550px'}}
                                                src={pictures[currentPhotoIndex]}
                                                alt={user.name}/>
                                        </div>
                                    }
                                    {
                                        pictures.length === 0 &&
                                        <img
                                            style={{width: '350px', height: '550px'}}
                                            className="card-img-top m-2"
                                            src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"
                                            alt="Profile"/>
                                    }
                                </div>
                                <div className={"card-body"}>
                                    <p className="card-text m-2">
                                        Имя
                                        <input type="text" name="name" className="form-control" value={user.name}
                                               onChange={handleChange}/>
                                    </p>
                                    <p className="card-text m-2">
                                        Пол
                                        <input type="text" name="sex" className="form-control" value={user.sex}
                                               onChange={handleChange}/>
                                    </p>
                                    <p className="card-text m-2">
                                        Цель
                                        <input type="text" name="goal" className="form-control" value={user.goal}
                                               onChange={handleChange}/>
                                    </p>
                                    <p className="card-text m-2">
                                        Возраст
                                        <input type="number" name="age" className="form-control" value={user.age}
                                               onChange={handleChange}/>
                                    </p>
                                    <p className="card-text m-2">
                                        Страна
                                        <input type="text" name="country" className="form-control" value={user.country}
                                               onChange={handleChange}/>
                                    </p>
                                    <p className="card-text m-2">
                                        Образование
                                        <input type="text" name="education" className="form-control"
                                               value={user.education} onChange={handleChange}/>
                                    </p>
                                    <p className="card-text m-2">
                                        Описание
                                        <input type="text" name="description" className="form-control"
                                               value={user.description} onChange={handleChange}/>
                                    </p>
                                    <p className="card-text m-2">
                                        Фотография
                                        <input type="file" className="form-control" accept={"image/*"} multiple
                                               onChange={handleImageUpload}/>
                                    </p>
                                </div>
                                <form className="btn-group d-flex justify-content-center">
                                    <button className={"btn btn-success"} onClick={handleSaveClick}>
                                        Сохранить
                                    </button>
                                    <button className={"btn btn-danger"} type="submit">Отмена</button>
                                </form>
                            </div>
                        )
                        : user != null &&
                        (
                            <div className="p-5 w-100 d-flex justify-content-center">
                                <div className={"d-flex align-items-center w-100"}>
                                    <div>
                                        {
                                            pictures.length > 1 &&
                                            <div>
                                                <button className="btn btn-primary" onClick={handlePrevPhoto}>&lt;</button>
                                                <img
                                                    className="card-img-top m-2"
                                                    style={{width: '350px', height: '550px'}}
                                                    src={pictures[currentPhotoIndex]}
                                                    alt={user.name}/>
                                                <button className="btn btn-primary" onClick={handleNextPhoto}>&gt;</button>
                                            </div>
                                        }
                                        {
                                            pictures.length === 1 &&
                                            <div>
                                                <img
                                                    className="card-img-top m-2"
                                                    style={{width: '350px', height: '550px'}}
                                                    src={pictures[currentPhotoIndex]}
                                                    alt={user.name}/>
                                            </div>
                                        }
                                        {
                                            pictures.length === 0 &&
                                            <img
                                                style={{width: '350px', height: '550px'}}
                                                className="card-img-top m-2"
                                                src="https://tiktokgid.info/wp-content/uploads/2021/12/kak-sdelat-prozrachnuyu-avatarku-v-tik-tok(1).jpg"
                                                alt="Profile"/>
                                        }
                                    </div>
                                    <div className="card-body m-3">
                                        <p className="card-text">Ваш логин: {user.login}</p>
                                        <p className="card-text">Имя: {user.name}</p>
                                        <p className="card-text">Пол: {user.sex}</p>
                                        <p className="card-text">Цель: {user.goal}</p>
                                        <p className="card-text">Возраст: {user.age}</p>
                                        <p className="card-text">Страна: {user.country}</p>
                                        <p className="card-text">Образование: {user.education}</p>
                                        <p className="card-text">Описание: {user.description}</p>
                                    </div>
                                </div>
                            </div>

                        )
                }
            </div>
        </div>
    );
};

export default UserCard;