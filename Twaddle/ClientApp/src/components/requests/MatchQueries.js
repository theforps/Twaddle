import axios from "axios";

export const GetUserMatches = async () => {

    try {
        const jwt = sessionStorage.getItem('token');
        
        const result = await axios.get('/match/user-matches', {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });
        
        return result;
    }
    catch {
        return null;
    }
};

export const SetUserMatch = async (login) => {
    
    try {
        const jwt = sessionStorage.getItem('token');
        
        const result = await axios.post('/match/set-match-form', {
                SecondLogin: login
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + jwt
                }
            });

        console.log("Отправка метча:");
        console.log(result.data);
        
        return result;
    }
    catch {
        return null
    }
};

export const SetUserMatchOrder = async (login, id) => {

    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.post('/match/set-match-order/' + id, {
                SecondLogin: login
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + jwt
                }
            });

        console.log("Отправка метча:");
        console.log(result.data);

        return result;
    }
    catch {
        return null
    }
};

export const GetUserMatchOrder = async (wantingLogin, orderId) => {

    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.get('/match/get-match-order/' + wantingLogin +'/' + orderId,
            {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            });

        console.log("Получение метча:");
        console.log(result.data);

        return result;
    }
    catch {
        return null
    }
};