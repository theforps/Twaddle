import axios from "axios";

export const GetUserMatches = async (jwt) => {

    return await axios.get('/match/user-matches', {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });

};

export const SetUserMatch = async (jwt, login) => {

    return await axios.post('/match/set-match', {
            SecondLogin: login
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + jwt
            }
        });
};