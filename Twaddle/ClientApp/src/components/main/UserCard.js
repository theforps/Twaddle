import React, {useEffect, useState} from "react";
import {GetUser, UpdateUser} from "../requests/UserQueries";

const UserCard = () => {
    const[user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [images, setImages] = useState([]);
    const [pictures, setPictures] = useState([]);
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
                resultImages.push({ img, i });
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
        
        const newUser = new FormData();
            
        newUser.append('name', user.name);
        newUser.append('sex', user.sex);
        newUser.append('goal', user.goal);
        newUser.append('age', user.age);
        newUser.append('country', user.country);
        newUser.append('education', user.education);
        newUser.append('description', user.description);

        if(images.images != null) {
            for (let i = 0; i < images.images.length; i++) {
                newUser.append('images', images.images[i]);
            }
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
    
    useEffect(() => {
        GetUserInfo()
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <div className={"card border-3 border-light-subtle"}>
                <div className={"m-4"}>
                    {isEditing ? (
                        <div className={""}>
                            <label className={"d-block mb-2"}>
                                Имя
                                <input type="text" name="name" value={user.name}  onChange={handleChange}/>
                            </label>
                            <label className={"d-block mb-2"}>
                                Пол
                                <input type="text" name="sex" value={user.sex}  onChange={handleChange}/>
                            </label>
                            <label className={"d-block mb-2"}>
                                Цель
                                <input type="text" name="goal" value={user.goal}  onChange={handleChange}/>
                            </label>
                            <label className={"d-block mb-2"}>
                                Возраст
                                <input type="number" name="age" value={user.age} onChange={handleChange}/>
                            </label>
                            <label className={"d-block mb-2"}>
                                Страна
                                <input type="text" name="country" value={user.country} onChange={handleChange}/>
                            </label>
                            <label className={"d-block mb-2"}>
                                Образование
                                <input type="text" name="education" value={user.education} onChange={handleChange}/>
                            </label>
                            <label className={"d-block mb-2"}>
                                Описание
                                <input type="text" name="description" value={user.description} onChange={handleChange}/>
                            </label>
                            <label className={"d-block mb-2"}>
                                Изображение
                                <input type="file" name="image" accept={"image/*"} multiple value={images} onChange={handleImageUpload}/>
                            </label>
                        </div>
                    ) : user != null && (
                        <div>
                            <p>Имя: {user.name}</p>
                            <p>Пол: {user.sex}</p>
                            <p>Цель: {user.goal}</p>
                            <p>Возраст: {user.age}</p>
                            <p>Страна: {user.country}</p>
                            <p>Образование: {user.education}</p>
                            <p>Описание: {user.description}</p>
                            <div>
                            {pictures.length > 0 && pictures.map((image => {
                                return (
                                <img key={image.i} alt={image.i} style={{width: "100px", height: "100px"}} src={image.img}/>
                                )
                            }))}
                            </div>
                        </div>
                    )}
                    <div className={"d-flex justify-content-center"}>
                        {isEditing ? (
                            <button className={"btn btn-success m-3"} onClick={handleSaveClick}>
                                Сохранить
                            </button>
                        ) : (
                            <button className={"btn btn-success m-3"} onClick={handleEditClick}>
                                Изменить
                            </button>
                        )}
                        <button className={"btn btn-danger m-3"}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;