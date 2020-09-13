const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenKey = require('../config/keys').secretOrKey
const passwordRegx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
const Model = require('../models/User')
const Message = require('../models/Message')
const helperFunctions = require('./helperFunctions')
const validator = require('../validations/userValidation')
const mongoose = require('mongoose')



//sign up
exports.signUp = async (req, res) => {
    const entityName = Model.collection.name
    const data = helperFunctions.getBody(req, res)
    if (!data) {
      return
    }
  
    try {
      const validated = helperFunctions.isValidated(res, data, validator.SignUpValidation)
      if (!validated) {
        return
      }
      const password = data.password
      if (password) {
        if (passwordRegx.test(password)) {
          const salt = bcrypt.genSaltSync(10)
          const hashedPassword = bcrypt.hashSync(data.password, salt)
          data.password = hashedPassword
        } else {
          const errors = vaildatePassword(password)
          return res.status(400).json({
            status: 'Error',
            message: errors[0]
          })
        }
      }
      const newEntity = await Model.create(data)
      return res.json({
        status: 'Success',
        message: `New ${entityName} created with id ${newEntity.id}`,
        data: newEntity
      })
    } catch (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.message
      })
    }
  }
// checking the errors of the password
const vaildatePassword = password => {
    var errors = []
    if (password.length < 8) {
      errors.push('Your password must be at least 8 characters')
    }
    if (password.search(/[a-z]/i) < 0) {
      errors.push('Your password must contain at least one small letter')
    }
    if (password.search(/[A-Z]/) < 0) {
      errors.push('Your password must contain at least one capital letter')
    }
    if (password.search(/[0-9]/) < 0) {
      errors.push('Your password must contain at least one digit.')
    }
    return errors
  }
// login 
exports.login = async (req, res) => {
    try {
        const data = helperFunctions.getBody(req, res)
        if (!data) {
          return
        }
      const validated = helperFunctions.isValidated(res, data, validator.SignInValidation)
      if (!validated) {
        return
      }
      const { email, password } = req.body
      const user = await Model.findOne({ email })
      if (!user) {
        return res.status(404).json({
          status: 'Error',
          message: 'You must sign up first'
        })
      }
      const match = bcrypt.compareSync(password, user.password)
      if (match) {
        const payload = {
          id: user._id,
          firstName: user.firstName,
          email: user.email
        }
        const token = jwt.sign(payload, tokenKey, { expiresIn: '2h' })
        return res.json({
          status: 'Success',
          token: `Bearer ${token}`,
          id: user._id,
        })
      } else {
        return res.status(400).json({
          status: 'Error',
          message: 'Wrong password'
        })
      }
    } catch (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.message
      })
    }
  }
// show my messages
exports.showMyRecievedMessages =  async (req,res) =>{
try{
  const entityId = req.params.id
  const isValidId = validId(res, entityId)
  if (!isValidId) {
    return false
  }
  let user = await Model.findById(entityId)
  let email = user.email
  const query = { 'recieverEmail': email }
  let messages= await Message.find(query)
  return res.json({
    status: 'Success',
    data: messages
  })
}catch(error){
  return res.status(400).json({
    status: 'Error',
    message: error.message
  })
}
}
const validId = exports.validId = (res, entityId) => {
  const entityName = Model.collection.name
  if (!mongoose.Types.ObjectId.isValid(entityId)) {
    res.status(400).json({
      status: 'Error',
      message: `Not a valid ID for ${entityName}`
    })
    return false
  }
  return true
}
