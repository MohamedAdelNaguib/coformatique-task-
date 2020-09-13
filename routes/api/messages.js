const express = require('express')
const router = express.Router()
const passport = require('passport')


const controller = require('../../controllers/messageController')
// Read all Admins (Default route)
router.get('/',  passport.authenticate('jwt', { session: false }), controller.default)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.put('/:id',  passport.authenticate('jwt', { session: false }), controller.update)
router.delete('/:id',  passport.authenticate('jwt', { session: false }),  controller.delete)

module.exports = router