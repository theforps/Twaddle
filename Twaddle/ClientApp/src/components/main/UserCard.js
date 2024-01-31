import React, {useEffect, useState} from "react";
import {GetUser, UpdateUser} from "../requests/UserQueries";

const UserCard = () => {
    const[user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [images, setImages] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const GetUserInfo = async() => {
        
        const jwt = sessionStorage.getItem('token');
        
        const result = await GetUser(jwt);
        
        console.log("Профиль:")
        console.log(result.data);
        
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

    const handleImageUpload = (event) => {
        const fileList = event.target.files;
        const updatedImages = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            updatedImages.push(file);
        }

        setImages((prevFormData) => ({
            ...prevFormData,
            images: updatedImages,
        }));
    };
        
    const handleSaveClick = async() => {

        setIsEditing(false);

        const base64Strings = [];
        if(images.images != null) {
            const fileList = images.images;

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
                try {
                    const base64String = await readFileAsDataURL(file);
                    base64Strings.push(base64String);
                } catch (error) {
                    console.error('Error reading file:', error);
                    // Handle the error as needed
                }
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
        const jwt = sessionStorage.getItem('token');

        const result = await UpdateUser(jwt, newUser);

        console.log("Измененный профиль:")
        console.log(result.data);

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
    
    useEffect(() => {
        GetUserInfo()
    }, []);

    return (
        <div className={"card d-flex"}>
            {
                isEditing ? 
                (
                    <div className={"card-body"}>
                        <p className="card-text m-2">
                            Имя
                            <input type="text" name="name" className="form-control" value={user.name} onChange={handleChange}/>
                        </p>
                        <p className="card-text m-2">
                            Пол
                            <input type="text" name="sex" className="form-control" value={user.sex} onChange={handleChange}/>
                        </p>
                        <p className="card-text m-2">
                            Цель
                            <input type="text" name="goal" className="form-control" value={user.goal} onChange={handleChange}/>
                        </p>
                        <p className="card-text m-2">
                            Возраст
                            <input type="number" name="age" className="form-control" value={user.age} onChange={handleChange}/>
                        </p>
                        <p className="card-text m-2">
                            Страна
                            <input type="text" name="country" className="form-control" value={user.country} onChange={handleChange}/>
                        </p>
                        <p className="card-text m-2">
                            Образование
                            <input type="text" name="education" className="form-control" value={user.education} onChange={handleChange}/>
                        </p>
                        <p className="card-text m-2">
                            Описание
                            <input type="text" name="description" className="form-control" value={user.description} onChange={handleChange}/>
                        </p>
                        <p className="card-text m-2">
                            Фотография
                            <input type="file" className="form-control" accept={"image/*"} multiple
                                   onChange={handleImageUpload}/>
                        </p>
                    </div>
                )
                    : user != null &&
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
                            <div className="card-body">
                                <p className="card-text">Имя: {user.name}</p>
                                <p className="card-text">Пол: {user.sex}</p>
                                <p className="card-text">Цель: {user.goal}</p>
                                <p className="card-text">Возраст: {user.age}</p>
                                <p className="card-text">Страна: {user.country}</p>
                                <p className="card-text">Образование: {user.education}</p>
                                <p className="card-text">Описание: {user.description}</p>
                            </div>
                        </div>
                    )
            }
            <div className={"btn-group m-2"}>
                {
                    isEditing ? 
                        (
                            <div className="btn-group d-flex justify-content-center">
                                <button className={"btn btn-success"} onClick={handleSaveClick}>
                                    Сохранить
                                </button>
                                <button className={"btn btn-danger"} type="submit">Отмена</button>
                            </div>

                        )
                        : 
                        (
                            <button className={"btn btn-success"} onClick={handleEditClick}>
                                Изменить
                            </button>
                        )
                }
            </div>
        </div>
    );
};

export default UserCard;