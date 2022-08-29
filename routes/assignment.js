const express = require("express")
const router = express.Router()
const verifyToken = require("../lib/verify_token")

const controller = require("../controllers/assignment")

router.post("/",verifyToken, controller.create)
router.get("/",verifyToken, controller.retrieve)

module.exports = router