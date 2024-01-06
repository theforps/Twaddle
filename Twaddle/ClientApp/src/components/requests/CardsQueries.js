import axios from "axios";

export const GetCards = async (jwt) => {

    return await axios.get('/cards', {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });

};