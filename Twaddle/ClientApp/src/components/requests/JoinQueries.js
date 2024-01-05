import axios from "axios";

export const Registration = async (data) => {
    try {
        const user = {
            Sex: data.sex,
            Name: data.nick,
            Goal: data.goal,
            Age: data.age,
            Country: data.country,
            Education: data.education,
            Description: data.desc,
            Login: data.login,
            Password: data.password
        };

        return await axios.post('/join/registration', user);
    }
    catch {
        return null;
    }
};

export const Login = async (data) => {
    try {

        return await axios.post('/join/login', data);
    }
    catch {
        return data;
    }
};