const router = require("express").Router()
const { createComment, updateComment } = require("../controllers/commentController")

router.route("/comment").post(createComment)
router.route("/comment/:id").put(updateComment)

module.exports = router
