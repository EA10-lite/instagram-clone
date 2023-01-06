import axios from "axios";

const baseURL = "http://localhost:4000/api/";

export const client = axios.create({
    baseURL,
    withCredentials: true,
});

const add_comment_endpoint = "/posts/add-comment/";
const like_post_endpoint = "/posts/add-like/";
const post_endpoint = "/posts";
const unlike_post_endpoint = "/posts/remove-like/";

const add_comment = (id, body) => {
    return client.put(add_comment_endpoint+id, {...body});
}

const create_post = (body) => {
    return client.post(post_endpoint, {...body});
}

const delete_post = (id, body) => {
    return client.delete(post_endpoint+id, {...body});
}

const like_post = (id) => {
    return client.put(like_post_endpoint+id);
}

const unlike_post = (id) => {
    return client.put(unlike_post_endpoint+id);
}
export default {
    add_comment,
    create_post,
    delete_post,
    like_post,
    unlike_post,
    
}