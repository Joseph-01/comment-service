const axios = require("axios")
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/"
})

const createComment = async (req, res) => {
    try {
        const postId= req.params.post_id
        const response = await axiosInstance({
            url: `users/${postId}`,
            method: "get",
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    createComment,
}