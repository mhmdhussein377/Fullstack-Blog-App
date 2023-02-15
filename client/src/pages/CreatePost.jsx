import React, {useContext, useRef, useState} from 'react'
import ReactQuill from "react-quill";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "react-quill/dist/quill.snow.css";
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

const CreatePost = () => {

    const [title,
        setTitle] = useState("");
    const [summary,
        setSummary] = useState("");
    const [content,
        setContent] = useState("");
    const [img,
        setImg] = useState("");
    const navigate = useNavigate();
    const {user} = useContext(userContext);
    const imgRef = useRef(null);

    const createPost = async(e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("author", user._id);
        data.set("file", img);

        data.forEach((value, key) => {
            console.log(key, value);
        });

        const res = await axios.post(
          "https://fullstack-blog-app.onrender.com//api/posts/create",
          data
        );
        res.data && navigate("/");
    }

    return (
        <form onSubmit={createPost}>
            <h1>Create a Post</h1>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"/>
            <input
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                type="text"
                placeholder="Summary"/>
            <input
                ref={imgRef}
                style={{
                display: "none"
            }}
                type="file"
                onChange={(e) => setImg(e.target.files[0])}/>
            <div
                onClick={e => imgRef
                .current
                .click()}
                className="uploadImgBtn">Upload an image</div>
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}/>
            <button>Create a Post</button>
        </form>
    );
}

export default CreatePost