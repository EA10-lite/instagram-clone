import axios from "axios";

const baseURL = "http://localhost:5000/api/";

export const client = axios.create({
    baseURL,
    withCredentials: true,
    
});
const user_endpoint = "users/me";
const follow_endpoint = "users/follow/";
const unfollow_endpoint = "users/unfollow";

const get_user = () => {
    return client.get(user_endpoint);
}

const follow = (id)=> {
    return client.put(follow_endpoint+id);
}

const unfollow = (id) => {
    return client.put(unfollow_endpoint+id);
}

export default {
    follow,
    get_user,
    unfollow, 
}