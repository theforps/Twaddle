import axios from "axios";

export const GetOrders = async(data) => {

    try {
        const jwt = sessionStorage.getItem('token');
        
        if (data === undefined) {

            const result = await axios.get('/orders/all-orders', {
                headers: {
                    Authorization: "Bearer " + jwt,
                }
            });

            console.log("Все заказы:")
            console.log(result.data.data)

            return result.data.data
        }
        else {
            const result = await axios.post('/orders/all-orders', {key:data},{
                headers: {
                    Authorization: "Bearer " + jwt,
                }
            });

            console.log("Все заказы:")
            console.log(result.data.data)

            return result.data.data
        }
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
}

export const DeleteOrder = async(id) => {

    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.delete('/orders/delete-order/'+ id,{
            headers: {
                Authorization: "Bearer " + jwt,
            }
        });

        console.log("Результат удаления заказа:")
        console.log(result.data.data)

        return result.data.data
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
}

export const AddOrder = async(order) => {

    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.post('/orders/add-order',order,{
            headers: {
                Authorization: "Bearer " + jwt,
            }
        });

        console.log("Результат создания заявки")
        console.log(result.data.data)

        return result.data.data
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
}

export const SendFeedBack = async(comment, id) => {

    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.post('/orders/send-feedback/'+ id,{
            key:comment
        },{
            headers: {
                Authorization: "Bearer " + jwt,
            }
        });

        console.log("Результат отправки отклика:")
        console.log(result.data.data)

        return result.data.data
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
}

export const GetFeedbackOfOrder = async(id) => {

    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.get('/orders/get-feedbacks-order/'+ id,{
            headers: {
                Authorization: "Bearer " + jwt,
            }
        });

        console.log("Все отклики заказа:")
        console.log(result.data.data)

        return result.data.data
    }
    catch (ex) {
        console.log(ex)
        return null;
    }
}