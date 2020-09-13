// applying the validation for each function
// server side validation
exports.isValidated = (res, data, validationFunction) => {
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
  // function to check if the body is empty for all the CRUDs
exports.getBody = (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: 'Error',
        message: `Nothing was not entered in body`
      })
      return false
    }
    return req.body
  }