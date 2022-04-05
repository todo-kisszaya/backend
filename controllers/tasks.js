const {Task} = require('../models')
const {NotFoundError, BadRequestError} = require('../errors')

const createTask = async (req, res) => {
    req.body.user_id = req.user.userId
    const task = await Task.create({...req.body})
    res.status(200).json({task})
}

const getTask = async (req, res) => {
    const {
        params: {id: taskId},
        user: {userId}
    } = req

    const task = await Task.findOne({
        where: {
            user_id: userId, task_id: taskId
        }
    })

    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`)
    }

    res.status(200).json({task})
}

const updateTask = async (req, res) => {
    const {
        params: {id: taskId},
        user: {userId},
        body: {completed, name}
    } = req

    if (completed === '' || name === '') {
        throw new BadRequestError('Completed or Name fields cannot be empty')
    }

    let task = await Task.findOne({
        where: {
            user_id: userId, task_id: taskId
        }
    })

    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`)
    }

    task.completed = completed;
    task.name = name;
    task.save()
    res.status(200).json({task})
}

const deleteTask = async (req, res) => {
    const {
        params: {id: taskId},
        user: {userId}
    } = req

    const task = await Task.findOne({
        where: {
            user_id: userId, task_id: taskId
        }
    })
    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`)
    }

    task.destroy()
    task.save()
    res.status(200).json({msg: "good"})
}

const getAllTasks = async (req, res) => {
    const {completed} = req.query
    let queryObject = {user_id: req.user.userId};

    if (completed) {
        queryObject.completed = completed === 'true'
    }
    const tasks = await Task.findAll({where: queryObject, order: [['updatedAt', 'DESC']]})
    res.status(200).json({tasks})
}

module.exports = {
    createTask, getAllTasks, getTask, updateTask, deleteTask
}