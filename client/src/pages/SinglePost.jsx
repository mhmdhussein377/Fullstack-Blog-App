import React, {useContext, useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import axios from "axios"
import {formatISO9075} from 'date-fns';
import {userContext} from '../context/UserContext/userContext';
import {AiOutlineEdit} from "react-icons/ai"

const SinglePost = () => {

    const [data,
        setData] = useState({});
    const {id} = useParams();
    const {user} = useContext(userContext);

    useEffect(() => {
        const getPost = async() => {
            const res = await axios.get(
              `https://fullstack-blog-app.onrender.com//api/posts/${id}`
            );
            setData(res.data);
        }
        getPost();
    }, [id]);

    const img = data.img
        ?.split("\\")[1];

    console.log(data)

    return !data
        ? (
            <div>No Content</div>
        )
        : (
            <div className="post-page">
                <h1>{data.title}</h1>
                {data
                    ?.createdAt && (
                        <time>
                            {formatISO9075(new Date(data
                                ?.createdAt), "MMM d, yyyy HH:mm")}
                        </time>
                    )}
                {data
                    ?.author
                        ?.username && (
                            <div className="author">by @{data
                                    ?.author.username}</div>
                        )}
                {user._id === data
                    ?.author
                        ?._id && (
                            <Link to={`/edit/${data._id}`}>
                                <div className="edit-row">
                                    <a className="edit-btn" href="#">
                                        <AiOutlineEdit size={20} className="edit-icon"/>
                                        Edit this post
                                    </a>
                                </div>
                            </Link>
                        )}
                <div className="image">
                    {img && (<img src={`https://fullstack-blog-app.onrender.com/uploads/${img}`} alt=""/>)}
                </div>
                <div
                    dangerouslySetInnerHTML={{
                    __html: data.content
                }}/>
            </div>
        );
}

export default SinglePost