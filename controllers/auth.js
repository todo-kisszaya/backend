const {User} = require('../models')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = await user.createJWT()
    res.status(200).json({user: {email: user.email}, token})
}

const login = async (req, res) => {
    const {password, email} = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ where: {email}})
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()

    res.status(200).json({ user: { email: user.email }, token })
}

module.exports = {
    register, login
}