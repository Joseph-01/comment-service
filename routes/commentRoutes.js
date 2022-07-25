const router = require("express").Router()
const { createComment } = require("../controllers/commentController")

router.route("/comment").post(createComment)


module.exports = router
