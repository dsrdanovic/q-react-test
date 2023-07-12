import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostResponse from '../models/Post';
import CommentResponse from '../models/Comment';
import api from '../api/api';

interface Props {
    message: string;
    componentName?: string;
}

export const Posts: React.FC<Props> = ({ message, componentName = Posts.displayName }) => {

    const navigate = useNavigate();
    const [posts, setPosts] = React.useState<Array<PostResponse>>([]);
    const [comments, setComments] = React.useState<Array<CommentResponse>>([]);
    const [selectedPostId, setSelectedPostId] = React.useState<number>(-1);
    const [searchValue, setSearchValue] = React.useState("");

    useEffect(() => {
        const getPosts = async () => {
            setPosts(await api.getPosts())
        }
        getPosts();

        console.log(`${message} ${componentName}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getComments = async (postId: number) => {
        setComments(await api.getComments(postId));
        setSelectedPostId(postId);
    }

    useEffect(() => {
        if (!posts.some((p: PostResponse) => p.username)) {
            const getUsernames = async () => {
                let usernames = [] as any;
                for (let i = 0; i < posts.length; i++) {
                    let findIndex = usernames.findIndex((u: any) => u.userId === posts[i].userId);
                    if (findIndex === -1) {
                        const username = await api.getUsername(posts[i].userId);
                        usernames.push({ userId: posts[i].userId, username: username });
                    }
                    const updatedPosts = posts.map((p: PostResponse) => {
                        return { ...p, username: usernames.find((u: any) => u.userId === p.userId)?.username };
                    });
                    setPosts(updatedPosts);
                }
            }
            getUsernames();
        }
    }, [posts]);

    return (
        <div>
            <h3>
                POSTS
            </h3>
            <div style={{ margin: 10 }}>
                <input
                    spellCheck="false"
                    autoComplete="false"
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Enter User's Name"
                    onChange={event => setSearchValue(event.target.value.trim().toLowerCase())}
                />
            </div>
            <table style={{ fontSize: 14, width: "100%" }}>
                <thead>
                    <tr style={{ backgroundColor: "lightblue" }}>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>User's Name</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {posts && posts.length > 0 && posts.filter((p: PostResponse) => p.username?.toLowerCase().includes(searchValue)).map((p: PostResponse) => {
                        return <React.Fragment key={p.id}>
                            <tr style={p.id === selectedPostId ? { backgroundColor: "lightgoldenrodyellow", fontWeight: "bold", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => navigate(`/posts/${p.id}`)}>
                                <td>{p.id}</td>
                                <td>{p.title}</td>
                                <td>{p.body}</td>
                                <td>{p?.username}</td>
                                <td>
                                    {p.id !== selectedPostId && <button
                                        style={{ cursor: "pointer", backgroundColor: "lightsalmon", zIndex: 999 }}
                                        onClick={(e) => { e.stopPropagation(); getComments(p.id) }}>
                                        Show
                                    </button>}
                                </td>
                            </tr>
                            {p.id === selectedPostId &&
                                <tr style={{ fontSize: 12, backgroundColor: "lightgoldenrodyellow" }}>
                                    <td colSpan={5}>
                                        <h4>
                                            COMMENTS
                                        </h4>
                                        <table style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Body</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {comments && comments.length > 0 && comments.map((c: CommentResponse) => {
                                                    return <tr key={c.id}>
                                                        <td>{c.id}</td>
                                                        <td>{c.name}</td>
                                                        <td>{c.email}</td>
                                                        <td>{p.body}</td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>}
                        </React.Fragment>
                    })}
                </tbody>
            </table>
        </div>
    );
}

Posts.displayName = "Posts";
export default Posts
