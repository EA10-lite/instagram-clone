import axios from "axios";

const baseURL = "http://localhost:5000/api";

const client = axios.create({
    baseURL,
    headers: {
        "content-type": "application/json"
    }
});

const register_endpoint = "/auth/register";
const login_endpoint = "/auth/login";
const reset_password_endpoint = '/auth/resetpassword';

const register_user = (body) => {
    return client.post(register_endpoint, {...body});
}

const login_user = (body)=> {
    return client.post(login_endpoint, {...body});
}

const reset_user_password = (body)=> {
    return client.put(reset_password_endpoint, {...body});
}

export default {
    login_user,
    register_user,
    reset_user_password,
}