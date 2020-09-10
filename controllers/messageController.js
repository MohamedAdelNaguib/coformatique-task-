const mongoose = require('mongoose')
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
// update message
exports.update = async (req, res,) => {
  const entityName = Model.collection.name
  const data = getBody(req, res)
  if (!data) {
    return
  }

  try {
    const entityId = req.params.id
    const validated = isValidated(res, data, validator.updateValidation)
    if (!validated) {
      return
    }
    const updatedEntity = await findByIdAndUpdate(res, entityId, data)
    if (!updatedEntity) {
      return
    }

    return res.json({
      status: 'Success',
      message: `Updated ${entityName} with id ${entityId}`,
      data: updatedEntity
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}
// functionality of the update 
const findByIdAndUpdate = exports.findByIdAndUpdate = async (res,entityId, data) => {
  const entityName = Model.collection.name
  const isValidId = validId(res, entityId)
  if (!isValidId) {
    return false
  }

  const query = { '_id': entityId }
  const updatedEntity = await Model.findByIdAndUpdate(query, data, { new: true })
  if (!updatedEntity) {
    res.status(400).json({
      status: 'Error',
      message: `Could not find the ${entityName} you are looking for!`
    })
    return false
  }
  return updatedEntity
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
// checking the id of the entity
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