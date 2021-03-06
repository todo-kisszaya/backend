const sequelize = require('../db/connect')
const {DataTypes} = require('sequelize')
const User = require("./User");

const Task = sequelize.define('task', {
    task_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        }
    },
})

module.exports = Task