import CommentResponse from "../models/Comment";
import PostResponse from "../models/Post";
import UserResponse from "../models/User";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async () => {
    return await fetch(`${API_URL}/posts`)
        .then(response => response.json())
        .then((posts: Array<PostResponse>) => {
            return posts;
        });
}

export const getPostById = async (postId: number) => {
    return await fetch(`${API_URL}/posts/${postId}`)
        .then(response => response.json())
        .then((post: PostResponse) => {
            return post;
        });
}

export const getComments = async (postId: number) => {
    return await fetch(`${API_URL}/posts/${postId}/comments`)
        .then((res) => res.json())
        .then((comments: Array<CommentResponse>) => {
            return comments;
        });
}

export const getUsername = async (userId: number) => {
    return await fetch(`${API_URL}/users/${userId}`)
        .then((res) => res.json())
        .then((user: UserResponse) => {
            return user.name;
        });
}

const actions = {
    getPosts,
    getPostById,
    getComments,
    getUsername
}

export default actions;
