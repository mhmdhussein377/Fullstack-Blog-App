const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    content: {
        type: String,
    },
    img: {
        type: String,
    }
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post