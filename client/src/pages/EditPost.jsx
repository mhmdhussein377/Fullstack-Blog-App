import axios from 'axios';
import React, {useContext, useEffect, useRef, useState} from 'react'
import ReactQuill from 'react-quill';
import {useNavigate, useParams} from 'react-router-dom';
import {userContext} from '../context/UserContext/userContext';

const modules = {
    toolbar: [
        [
            {
                header: [1, 2, false]
            }
        ],
        [
            "bold", "italic", "underline", "strike", "blockquote"
        ],
        [
            {
                list: "ordered"
            }, {
                list: "bullet"
            }, {
                indent: "-1"
            }, {
                indent: "+1"
            }
        ],
        [
            "link", "image"
        ],
        ["clean"]
    ]
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
];

const EditPost = () => {

    const [title,
        setTitle] = useState("");
    const [summary,
        setSummary] = useState("");
    const [content,
        setContent] = useState("");
    const [img,
        setImg] = useState(null);
    const [imgPost,
        setImgPost] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
    const {user} = useContext(userContext);
    const imgRef = useRef(null);

    useEffect(() => {
        const getPost = async() => {
            const res = await axios.get(`http://localhost:8800/api/posts/${id}`);
            setTitle(res.data.title);
            setSummary(res.data.summary);
            setContent(res.data.content);
            setImgPost(res.data.img
                ?.split("\\")[1]);
        };
        getPost();
    }, [id]);

    console.log(imgPost)

    const editPost = async(e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("id", id);
        data.set("author", user._id)
        if (img) {
            data.set("file", img);
        }

        await axios.put(`http://localhost:8800/api/posts/edit/${id}`, data);
        navigate(`/post/${id}`);
    }

    return (
        <form onSubmit={editPost}>
            <h1>Edit Post</h1>
            <input
                className='edit-btn'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"/>
            <input
                className='edit-btn'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                type="text"
                placeholder="Summary"/>
            <input ref={imgRef} style={{display: "none"}} type="file" onChange={(e) => setImg(e.target.files[0])}/>
            <div style={{cursor: "pointer"}} onClick={e => imgRef.current.click()} className="updateImgBtn">Update Image</div>
            <div className="image">
                {imgPost && <img style={{cursor: "pointer"}} onClick={e => imgRef.current.click()} src={`http://localhost:8800/uploads/${imgPost}`} alt=""/>}
            </div>
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}/>
            <button>Edit Post</button>
        </form>
    );
}

export default EditPost