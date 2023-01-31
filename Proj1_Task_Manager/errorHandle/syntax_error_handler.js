const { CustomAPIError } = require('../error/customize_api_error')

const SyntaxErrorHandler = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomAPIError){
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({msg: 'Something went wrong'})
}

module.exports = SyntaxErrorHandler