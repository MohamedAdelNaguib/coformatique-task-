const express = require('express')
const router = express.Router()

const controller = require('../../controllers/messageController')
// Read all Admins (Default route)
router.get('/', controller.default)
router.post('/',controller.create)

module.exports = router