import LogoutButton from "./LogoutButton";
import React from "react";
import {DeleteUser} from "../requests/UserQueries";

const ProfileTab = () => {

    const handleDeleteUser = async () => {
        
        const jwt = sessionStorage.getItem('token');
        
        const result = await DeleteUser(jwt);
        
        console.log("Профиль удален:");
        console.log(result.data);
        
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role');
    }

    return (
        <div className={"btn-group btn-group-vertical p-2"}>
            <button className="btn btn-primary  mt-2 mb-2">
                Оформить подписку
            </button>

            <button className="btn btn-success  mt-2 mb-2">
                Изменить логин
            </button>

            <button className="btn btn-success  mt-2 mb-2">
                Изменить пароль
            </button>

            <LogoutButton/>

            <button onClick={handleDeleteUser} className="btn btn-outline-danger  mt-2 mb-2">
                Удалить аккаунт
            </button>
        </div>
    );
}
export default ProfileTab;