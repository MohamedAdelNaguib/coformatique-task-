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
    editValidation: req => {
      const createSchema =  Joi.object ({
        content: Joi.string(),
        date: Joi.date().iso().max(Date.now()),
        senderEmail: Joi.string().email(),
        recieverEmail: Joi.string().email(),
        seen: Joi.boolean()
      })
      return createSchema.validate(req)
    }
}