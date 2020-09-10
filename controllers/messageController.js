const Model = require('../models/Message')
const validator = require('../validations/messageValidation')
// get all messages
exports.default = async (req, res) => {
  try{
    const entities = await Model.find()
    return res.json({
      status: 'Success',
      data: entities
    })
  } catch(error) {
    return res.status(400).json({
        status: 'Error',
        message: error.message
      })
  }
    
  }
// create message
exports.create = async (req, res) => {
  const entityName = Model.collection.name
  const data = getBody(req, res)
  console.log(data)
  if (!data) {
    return
  }

  try {
    const validated = isValidated(res, data, validator.createValidation)
    if (!validated) {
      return
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

// function to check if the body is empty for all the CRUDs
const getBody = exports.getBody = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      status: 'Error',
      message: `Nothing was not entered in body`
    })
    return false
  }
  return req.body
}
// server side validation
const isValidated = exports.isValidated = (res, data, validationFunction) => {
  const validationResult = validationFunction(data)
  if (validationResult.error) {
    res.status(400).json({
      status: 'Error',
      message: validationResult.error.details[0].message,
      data: data
    })
    return false
  }
  return true
}