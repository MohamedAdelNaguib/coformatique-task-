const mongoose = require('mongoose')
const Model = require('../models/Message')
const validator = require('../validations/messageValidation')
const helperFunctions = require('./helperFunctions')
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
  const data = helperFunctions.getBody(req, res)
  if (!data) {
    return
  }

  try {
    const validated = helperFunctions.isValidated(res, data, validator.createValidation)
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
// edit message
exports.update = async (req, res,) => {
  const entityName = Model.collection.name
  const data = helperFunctions.getBody(req, res)
  if (!data) {
    return
  }

  try {
    const entityId = req.params.id
    const validated = helperFunctions.isValidated(res, data, validator.updateValidation)
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
// helper method for the update function
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

// delete fuction
exports.delete = async (req, res) => {
  const entityName = Model.collection.name
  try {
    const entityId = req.params.id
    const deletedEntity = await findByIdAndRemove(res, entityId)
    if (!deletedEntity) {
      return
    }

    return res.json({
      status: 'Success',
      message: `Deleted ${entityName} with id ${entityId}`,
      deleted: deletedEntity,
      remaining: await Model.find()
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

// helper method for the delete function
const findByIdAndRemove = exports.findByIdAndRemove = async (res, entityId) => {
  const entityName = Model.collection.name
  const isValidId = validId(res, entityId)
  if (!isValidId) {
    return false
  }

  const removedEntity = await Model.findByIdAndRemove(entityId)
  if (!removedEntity) {
    res.status(400).json({
      status: 'Error',
      message: `${entityName} not found`,
      available: await Model.find()
    })
    return false
  }
  return removedEntity
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