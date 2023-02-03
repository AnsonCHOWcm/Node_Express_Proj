const jwt = require('jsonwebtoken')
const {BadRequestError, UnauthenticError} = require('../errors/index')


const authorizationMiddleWare = async (req, res, next) => {


    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new BadRequestError('No Token')
    }

    const token = authHeader.split(' ')[1]

    try{

        const user_info = jwt.verify(token, process.env.JWT_SERCET)
        const {id, username} = user_info
        req.user = {id, username}
        next()
    } catch(error){
        throw new UnauthenticError('Not authorized')
    }

}

module.exports = authorizationMiddleWare;