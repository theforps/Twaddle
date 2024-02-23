import axios from "axios";

export const GetUser = async () => {
    try {
        const jwt = sessionStorage.getItem('token');
        
        const result = await axios.get('/user/get-info', {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });

        console.log("Профиль:")
        console.log(result.data);
        
        return result;
    }
    catch {
        return null;
    }
};

export const UpdateUser = async (data) => {
    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.put('/user/update-info', data, {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });

        console.log("Измененный профиль:")
        console.log(result.data);
        
        return result;
    }
    catch {
        return null;
    }
};

export const DeleteUser = async () => {
    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.delete('/user/delete-info', {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });

        console.log("Профиль удален:");
        console.log(result.data);

        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role');
        
        return result;
    }
    catch {
        return null;
    }
};

export const UpdateUserPassword = async (data) => {
    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.put('/user/update-password', data, {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });

        console.log("Результат изменения пароля:")
        console.log(result.data);

        return result;
    }
    catch {
        return null;
    }
};