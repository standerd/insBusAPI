const {validationResult} = require('express-validator')

exports.postRegister = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        console.log(errors)
    }
}