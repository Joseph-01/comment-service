const router = require("express").Router()
const { createComment, updateComment, deleteComment, getCommentsByPostId } = require("../controllers/commentController")

router.route("/comment").post(createComment)
router.route("/comment/:id").put(updateComment)
router.route("/comment/:id").delete(deleteComment)
router.route("/comment/:postId").get(getCommentsByPostId)


module.exports = router
