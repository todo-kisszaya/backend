const sequelize = require('../db/connect')
const {DataTypes} = require('sequelize')

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
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
})

const Task = sequelize.define('task', {
    task_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
})

User.hasMany(Task)
Task.belongsTo(User)

module.exports = {Task, User}