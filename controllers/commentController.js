const Comment = require("../models/comment")
const axios = require("axios")
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/"
})

const createComment = async (req, res) => {
    try {
        const { postId, userId, comment } = req.body
        const userResponse = await axiosInstance({
            url: `users/${userId}`,
            method: "get",
        });
        const fName = userResponse.data.user.firstname + " " + userResponse.data.user.lastname

        const newComment = new Comment({
            userId: userId,
            postId: postId,
            fullname: fName,
            comment: comment
        })

        const saveComment = await newComment.save()
        res.status(201).json({ saveComment })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const updateComment = async (req, res) => {
    try {
        const { id: commentId } = req.params
        const comment = await Comment.findOneAndUpdate({ id: commentId }, 
            req.body, {
                new: true
            })
        if (!comment) {
            return res.status(404).json({msg: "id not found"})
        }
        res.status(200).json({comment})
    } catch (error) {
        res.status(500).json({ error })
    }
}

const deleteComment = async (req, res) => {
    try {
        const checkComment = await Comment.findById(req.params.id)
        if(!checkComment) {
            return res.status(404).json({msg: "id not found"})
        }
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: "comment deleted"})
    } catch (error) {
        res.status(500).json({ error })
    }
}

//get comments by postId
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params
        const comments = await Comment.find({ postId })
        if (!comments) {
            return res.status(404).json({msg: "id not found"})
        }
        res.status(200).json({comments})
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByPostId,
}