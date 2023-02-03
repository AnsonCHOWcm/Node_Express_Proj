const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')


const authorizationMiddleWare = async (req, res, next) => {


    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No Token', 401)
    }

    const token = authHeader.split(' ')[1]

    try{

        const user_info = jwt.verify(token, process.env.JWT_SERCET)
        const {id, username} = user_info
        req.user = {id, username}
        next()
    } catch(error){
        throw new CustomAPIError('Not authorized',401)
    }

}

module.exports = authorizationMiddleWare;