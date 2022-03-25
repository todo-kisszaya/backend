const createTask = async (req, res) => {
    res.status(200).json({msg: "createTask"})
}

const getTask = async (req, res) => {
    res.status(200).json({msg: "getTask"})
}

const updateTask = async (req, res) => {
    res.status(200).json({msg: "updateTask"})
}

const deleteTask = async (req, res) => {
    res.status(200).json({msg: "deleteTask"})
}

const getAllTasks = async (req, res) => {
    res.status(200).json({msg: "getAllTasks"})
}

module.exports = {
    createTask, getAllTasks, getTask, updateTask, deleteTask
}