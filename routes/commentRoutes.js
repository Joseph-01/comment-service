const router = require("express").Router()
const { createComment } = require("../controllers/commentController")

router.route("/comment/:post_id").post(createComment)


module.exports = router
