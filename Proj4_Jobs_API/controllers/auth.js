const register = async (req, res) => {
    res.send('register users')
}
const login = async (req, res) => {
    res.send('user login')
}

module.exports = {register, login}