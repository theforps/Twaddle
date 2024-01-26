import axios from "axios";

export const GetCards = async (jwt) => {

    return await axios.get('/cards/forms', {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });
};

export const SendReport = async (jwt, data) => {

    return await axios.post('/cards/report', data, {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });
};