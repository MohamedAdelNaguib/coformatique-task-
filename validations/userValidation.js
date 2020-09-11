const Joi = require('joi')
module.exports = {
    SignUpValidation: req => {
      const SignUpSchema =  Joi.object ({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required(),
        email :Joi.string().email().required()
      })
      return SignUpSchema.validate(req)
    }
}