const Joi = require('joi')
module.exports = {
    createValidation: req => {
      const createSchema =  Joi.object ({
        content: Joi.string().required(),
        date: Joi.date().iso().max(Date.now()).required(),
        senderEmail: Joi.string().email().required(),
        recieverEmail: Joi.string().email().required(),
        seen: Joi.boolean()
      })
      return createSchema.validate(req)
    },
    updateValidation: req => {
      const createSchema =  Joi.object ({
        content: Joi.string()
        
      })
      return createSchema.validate(req)
    }
}