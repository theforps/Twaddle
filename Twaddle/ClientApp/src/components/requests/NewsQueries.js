import axios from "axios";

export const GetNews = async (data) => {
    
    
    try {
        const jwt = sessionStorage.getItem('token');
        
        if (data === undefined) {

            const result = await axios.get('/news', {
                headers: {
                    Authorization: "Bearer " + jwt,
                }
            });

            console.log("Список новостей:")
            console.log(result.data.data);

            return result.data.data;
        }
        else
        {
            
            const result = await axios.post('/news', {key:data}, {
                headers: {
                    Authorization: "Bearer " + jwt,
                }
            });

            console.log("Список новостей:")
            console.log(result.data.data);

            return result.data.data;
        }
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
};

export const AddNews = async(data) => {

    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.post('/news/add-news', data, {
            headers: {
                Authorization: "Bearer " + jwt,
            }
        });
        
        console.log("Результат публикации поста:")
        console.log(result.data.data)
        
        return result.data.data
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
}

export const SetLike = async(id) => {

    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.post('/news/set-like/'+id, null,{
            headers: {
                Authorization: "Bearer " + jwt,
            }
        });

        console.log("Результат лайка поста:")
        console.log(result.data.data)

        return result.data.data
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
}