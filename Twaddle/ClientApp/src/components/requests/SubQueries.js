import axios from "axios";

export const GetSub = async() => {

    try {
        const jwt = sessionStorage.getItem('token');

        const data = await axios.get('/user/user-sub', {
            headers: {
                Authorization: "Bearer " + jwt,
            }
        });
        
        console.log("Подписка:")
        console.log(data.data);
        
        if(data.data.statusCode === 200)
        {
            sessionStorage.setItem('sub', true);
        }
        else {
            sessionStorage.setItem('sub', false);
        }
        
        return data.data;
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
};

export const AddSub = async(content) => {
    try{

        const jwt = sessionStorage.getItem('token');

        const data = await axios.post('/user/arrange-sub', {key : content}, {
            headers: {
                Authorization: "Bearer " + jwt,
            }
        });

        console.log("Результат оформления:")
        console.log(data.data);

        if(data.data.statusCode === 200)
        {
            sessionStorage.setItem('sub', true);
        }
        else {
            sessionStorage.setItem('sub', false);
        }

        return data.data;
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
}
