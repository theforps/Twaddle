import axios from "axios";

export const GetCards = async (jwt) => {

    return await axios.get('/cards/forms', {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });

};

export const GetUserMatches = async (jwt) => {

    return await axios.get('/cards/matches', {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });

};

export const GetUserMatch = async (jwt, id) => {

    return await axios.get(`/cards/get-match/${id}`, {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });
};

export const SetUserMatch = async (jwt, login) => {

    return await axios.post('/cards/set-match', {
            SecondLogin : login
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + jwt
        }
    });

};