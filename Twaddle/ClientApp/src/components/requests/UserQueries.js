import axios from "axios";

export const GetUser = async (jwt) => {

    return await axios.get('/user/get-info', {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });
};

export const UpdateUser = async (jwt, data) => {

    return await axios.put('/user/update-info', data, {
        headers: {
            Authorization: "Bearer " + jwt,
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const DeleteUser = async (jwt) => {

    return await axios.delete('/user/delete-info', {
        headers: {
            Authorization: "Bearer " + jwt
        }
    });
};