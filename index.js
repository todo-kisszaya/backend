require('dotenv').config()
const sequelize = require('./db/connect')
const cors = require('cors')

const express = require('express')
const app = express()

const authRouter = require('./routes/auth')
const tasksRouter = require('./routes/tasks')

app.use(cors())
app.use(express.json())

app.use('/api/tasks', tasksRouter)
app.use('/api/auth', authRouter)

const PORT = process.env.PORT

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()