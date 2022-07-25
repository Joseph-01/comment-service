const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model("Comment", CommentSchema)