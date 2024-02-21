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
        
        const result = await axios.post('/join/registration', user);

        console.log("Информация о регистрации:");
        console.log(result.data);

        if(result.data.statusCode === 200) {
            sessionStorage.setItem('token', result.data.data.jwt);
            sessionStorage.setItem('role', result.data.data.user.role)
            sessionStorage.setItem('user', result.data.data.user.login)
        }
        return result;
    }
    catch {
        return null;
    }
};

export const Login = async (data) => {
    try {

        const result = await axios.post('/join/login', data);

        console.log("Информация о входе в систему:");
        console.log(result.data);

        if(result.data.statusCode === 200) {

            sessionStorage.setItem('token', result.data.data.jwt);
            sessionStorage.setItem('role', result.data.data.user.role)
            sessionStorage.setItem('user', result.data.data.user.login)
        }
        
        return result;
    }
    catch {
        return null;
    }
};

export const Logout = async() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('user');
    
}