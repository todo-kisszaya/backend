const sequelize = require('../db/connect')
const {DataTypes} = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
})

// User.addHook('beforeValidate', async (user, options) => {
//     const salt = await bcrypt.genSalt(10)
//     user.password = await bcrypt.hash(user.password, salt)
// })

User.beforeValidate(async function (user) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

User.prototype.createJWT = function () {
    return jwt.sign(
        {userId: this.user_id, email: this.email},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    )
}

User.prototype.comparePassword = async function (candidatePassword) {
    const isMatch = candidatePassword === this.password
    //const isMatch = await bcrypt.compare(possiblePassword, this.password)
    return isMatch
}

module.exports = User