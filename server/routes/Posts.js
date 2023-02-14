const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleWare = multer({dest: "uploads/"});
const fs = require("fs")
const Post = require("../models/Post.js");

router.post("/create", uploadMiddleWare.single('file'), async(req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const {title, summary, content, author} = req.body;

    const post = new Post({title, summary, content, img: newPath, author: author});

    const savedPost = await post.save();

    res.json(savedPost);
});

router.get("/", async(req, res) => {
    try {
        const posts = await Post
            .find()
            .populate("author", {username: 1})
            .sort({createdAt: -1})
            .limit(20);
        res
            .status(200)
            .json(posts);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

router.get("/:id", async(req, res) => {
    try {
        const post = await Post
            .findById(req.params.id)
            .populate("author", {username: 1});
        res
            .status(200)
            .json(post);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

router.put("/edit/:id", uploadMiddleWare.single("file"), async(req, res) => {
    try {
        let newPath = null;
        if (req.file) {
            const {originalname, path} = req.file;
            const parts = originalname.split(".");
            const ext = parts[parts.length - 1];
            newPath = path + "." + ext;
            fs.renameSync(path, newPath);
        }

        const {id, title, summary, content, author} = req.body;

        const postDoc = await Post.findById(id);

        if (JSON.stringify(postDoc.author) !== JSON.stringify(author)) {
            return res.status(401).json("Not Authorized");
        }


        await postDoc.updateOne({title, summary, content, img: newPath ? newPath : postDoc.img});

        res.status(200).json(postDoc);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

module.exports = router