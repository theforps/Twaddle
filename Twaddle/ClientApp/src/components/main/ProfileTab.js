import LogoutButton from "./LogoutButton";
import React from "react";

const ProfileTab = () => {

    const DeleteUser = async () => {
        
        const jwt = sessionStorage.getItem('token');
        
        const result = await DeleteUser(jwt);
        
        console.log("Профиль удален:");
        console.log(result.data);
        
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user');
    }

    return (
        <div>
            <button type={"submit"} className="btn btn-outline-danger d-block m-5" onSubmit={() => DeleteUser()}>
                Удалить аккаунт
            </button>
            
            <LogoutButton />
        </div>
    );
}
export default ProfileTab;