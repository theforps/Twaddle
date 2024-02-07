import axios from "axios";

export const GetCards = async () => {

    try {
        const jwt = sessionStorage.getItem('token')
        
        const result = await axios.get('/cards/forms', {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });

        console.log("Карточки пользователей:");
        console.log(result.data.data);
        
        return result;
    }
    catch {
        return null;
    }
};

export const SendReport = async (data) => {
    try {
        const jwt = sessionStorage.getItem('token');
        
        const result = await axios.post('/cards/report', data, {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });
        
        console.log("Отправленная жалоба:")
        console.log(result.data.data);
    }
    catch {
        return null;
    }
};