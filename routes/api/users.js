const express = require('express')
const router = express.Router()

const controller = require('../../controllers/userController')
// Read all Admins (Default route)
// router.get('/', controller.default)
// sign up
router.post('/',controller.signUp)
// sign in
router.put('/login',controller.login)

// router.put('/:id', controller.update)
// router.delete('/:id', controller.delete)

module.exports = router