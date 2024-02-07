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
        
        const result = await axios.post('/match/set-match', {
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