const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors/index')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {name:user.getName()}, token})
}
const login = async (req, res) => {
    res.send('user login')
}

module.exports = {register, login}