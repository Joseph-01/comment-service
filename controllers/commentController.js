require("dotenv").config()
const articleUrl = process.env.ARTICLE_URL
const Comment = require("../models/comment")
const axios = require("axios")
const axiosInstance = axios.create({
    baseURL: articleUrl
})


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - postId
 *         - userId
 *         - comment
 *       properties:
 *         comment:
 *           type: string
 *         userId:
 *           type: string
 *         postId:
 *           type: string
 *         fullname: 
 *           type: string
 *       example:
 *         comment: "this is a comment"
 *         userId: "60e1c5b5b0b5a8a0b4e1b0a5"
 *         postId: "60e1c5b5b0b5a8a0b4e1b0a5"
 *         fullname: "Shugr api"
 */


/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: The comment managing API
*/


/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create new comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 */
const createComment = async (req, res) => {
    try {
        const header = req.headers.authorization
        const { postId, userId, comment } = req.body
        const userResponse = await axiosInstance({
            url: `users/${userId}`,
            method: "get",
            headers: {
                "authorization":
                    header
            }
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
        res.status(500).json(error.message)
    }
}


/**
 * @swagger
 * /comment/{id}:
 *  put:
 *   summary: Update a comment
 *   tags: [Comment]
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Comment'
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The comment id
 *   responses:
 *    200:
 *      description: The comment description by id
 *      contents:
 *        application/json:
 *          schema:
 *            type: array 
 *            items:
 *              $ref: '#/components/schemas/Commnet'
 *    404:
 *      description: The comment was not found
 */
const updateComment = async (req, res) => {
    try {
        const { id: commentId } = req.params
        const comment = await Comment.findOneAndUpdate({ id: commentId },
            req.body, {
            new: true
        })
        if (!comment) {
            return res.status(404).json({ msg: "id not found" })
        }
        res.status(200).json({ comment })
    } catch (error) {
        res.status(500).json({ error })
    }
}


/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete the comment by id
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment was deleted
 *       404:
 *         description: The comment was not found
 *       500:
 *         description: Some server error
 *         
 */
const deleteComment = async (req, res) => {
    try {
        const checkComment = await Comment.findById(req.params.id)
        if (!checkComment) {
            return res.status(404).json({ msg: "id not found" })
        }
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "comment deleted" })
    } catch (error) {
        res.status(500).json({ error })
    }
}



/**
 * @swagger
 * /comment/{postId}:
 *   get:
 *     summary: Get all comments by post id
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The comments by postId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             items:
 *              $ref: '#/components/schemas/Comment'
 *       404:
 *         description: This post has no comment
 *       500:
 *         description: Some server error
 */
//get comments by postId
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params
        const comments = await Comment.find({ postId })
        if (!comments) {
            return res.status(404).json({ msg: "id not found" })
        }
        res.status(200).json({ comments })
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