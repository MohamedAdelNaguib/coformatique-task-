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
    },
    SignInValidation: req => {
        const SignInSchema =  Joi.object ({
          email :Joi.string().email().required(),
          password: Joi.string().required()
          
        })
        return SignInSchema.validate(req)
      }
}