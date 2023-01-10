import axios from "axios";

const baseURL = "http://localhost:5000/api/";

export const client = axios.create({
    baseURL,
    withCredentials: true,
});

const add_comment_endpoint = "/posts/comments/add";
const like_post_endpoint = "/posts/likes/add";
const post_endpoint = "/posts";
const unlike_post_endpoint = "/posts/likes/remove";

const get_post = () => {
    return client.get(post_endpoint);
}

const add_comment = (body) => {
    return client.put(add_comment_endpoint, { ...body });
}

const create_post = (body) => {
    return client.post(post_endpoint, {...body});
}

const delete_post = (id, body) => {
    return client.delete(post_endpoint+id, {...body});
}

const like_post = (id) => {
    return client.put(like_post_endpoint, { postId: id });
}

const unlike_post = (id) => {
    return client.put(unlike_post_endpoint, { postId: id });
}
export default {
    add_comment,
    create_post,
    delete_post,
    get_post,
    like_post,
    unlike_post,
    
}