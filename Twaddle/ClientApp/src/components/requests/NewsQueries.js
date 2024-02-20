import axios from "axios";

export const GetNews = async (data) => {
    try {
        const jwt = sessionStorage.getItem('token');
        
        if (data === undefined)
            data = "";
        
        const result = await axios.get('/news', {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });

        console.log("Список новостей:")
        console.log(result.data.data);
        
        return result.data.data;
    }
    catch {
        return null;
    }
};