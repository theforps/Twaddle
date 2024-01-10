import axios from "axios";

export const GetCards = async (jwt) => {

    return await axios.get('/cards/forms', {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });
};
