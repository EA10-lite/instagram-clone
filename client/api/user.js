import axios from "axios";

const baseURL = "http://localhost:4000/api/";

export const client = axios.create({
    baseURL,
    withCredentials: true,
});

const follow_endpoint = "users/follow/";
const unfollow_endpoint = "users/unfollow"

const follow = (id)=> {
    return client.put(follow_endpoint+id);
}

const unfollow = (id) => {
    return client.put(unfollow_endpoint+id);
}

export default {
    follow,
    unfollow, 
}