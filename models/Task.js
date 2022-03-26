const sequelize = require('../db/connect')
const {DataTypes} = require('sequelize')

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

module.exports = Task