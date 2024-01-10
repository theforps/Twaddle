import axios from "axios";

export const GetUserMatchMessages = async (jwt, id) => {

    return await axios.get(`/message/get-match-messages/${id}`, {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });
};

export const SendMessage = async (jwt, data) => {

    return await axios.post("/message/send-message", data,{
        headers: {
            Authorization: "Bearer " + jwt
        }
    });
};