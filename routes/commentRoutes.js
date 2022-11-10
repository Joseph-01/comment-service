const router = require("express").Router()
const { createComment, updateComment, deleteComment, getCommentsByPostId } = require("../controllers/commentController")
const auth = require("../middleware/authMiddleware")

router.route("/comment").post(createComment)
router.route("/comment/:id").put(auth.authenticator,updateComment)
router.route("/comment/:id").delete(auth.authenticator,deleteComment)
router.route("/comment/:postId").get(auth.authenticator, getCommentsByPostId)


module.exports = router
