import axios from "axios";

export const GetUserMatchMessages = async (id) => {
    try {
        const jwt = sessionStorage.getItem('token');
        
        const result = await axios.get(`/message/get-match-messages/`+ id, {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });
        
        return  result;
    }
    
    catch {
        return null;
    }
};

export const SendMessage = async (data) => {
    try {
        const jwt = sessionStorage.getItem('token');
        
        const result = await axios.post("/message/send-message", data, {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });

        console.log(result.data.data);
        
        return  result;
    }
    catch {
        return null;
    }
};