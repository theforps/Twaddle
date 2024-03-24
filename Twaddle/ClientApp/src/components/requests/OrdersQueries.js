import axios from "axios";

export const GetOrders = async() => {

    try {
        const jwt = sessionStorage.getItem('token');

        const result = await axios.get('/orders/all-orders/',{
            headers: {
                Authorization: "Bearer " + jwt,
            }
        });

        console.log("Все заказы:")
        console.log(result.data.data)
        
        return result.data.data
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