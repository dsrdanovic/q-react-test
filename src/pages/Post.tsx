import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostResponse from '../models/Post';
import api from '../api/api';

interface Props {
    message: string;
    componentName?: string;
}

export const Post: React.FC<Props> = ({ message, componentName = Post.displayName }) => {

    const params = useParams();
    const [post, setPost] = React.useState<PostResponse | null>(null);

    useEffect(() => {
        const getPostById = async () => {
            setPost(await api.getPostById(Number(params.id)))
        }
        getPostById();

        console.log(`${message} ${componentName}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    return (
        <div>
            <h3>
                POST ({params.id})
            </h3>
            <h4>TITLE:</h4>{post && post.title}
            <h4>BODY:</h4>{post && post.body}
        </div>
    );
}

Post.displayName = "Post";
export default Post
