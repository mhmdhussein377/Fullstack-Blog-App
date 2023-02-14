import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Post from '../components/Post/Post';

const Home = () => {

    let [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get("http://localhost:8800/api/posts");
            setPosts(res.data);
        }
        getPosts();
    }, []);

    return (
        <div className="posts">
            {posts.length > 0 && posts.map((post, index) => (
                <Post {...post} key={index} />
            ))}
        </div>
    );
}

export default Home