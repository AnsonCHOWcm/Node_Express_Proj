const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')
require('dotenv').config();

const login = async (req, res) => {
    const {username,  password} = req.body
    console.log({username,  password})

    if (!username || !password){
        throw new CustomAPIError('Please provide email and password', 400)
    }

    const id = new Date().getDate()
    const token = jwt.sign({id, username},process.env.JWT_SERCET, {expiresIn: '30d'})


    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {

    const authoriztion = req.headers.authorization

    if (!authoriztion || !authoriztion.startsWith('Bearer ')){
        throw new CustomAPIError('No Token', 401)
    }

    const token = authoriztion.split(' ')[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SERCET)
        const luckyNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg: `Hello, ${decoded.username}`, sercet : `Here is your authoerized data, your lucky number is ${luckyNumber}`})    

    } catch (error) {
        throw new CustomAPIError('Not authorized',401)
    }

}
module.exports = {
    login,
    dashboard,
}