const express = require('express')
const router = express.Router()

const controller = require('../../controllers/messageController')
// Read all Admins (Default route)
router.get('/', controller.default)
router.post('/',controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router