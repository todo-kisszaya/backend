require('dotenv').config()
require('express-async-errors');

const sequelize = require('./db/connect')
const cors = require('cors')

const express = require('express')
const app = express()

const authRouter = require('./routes/auth')
const tasksRouter = require('./routes/tasks')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const authenticateUser = require('./middleware/authentication')

require('./models')

app.use(cors())
app.use(express.json())

app.use('/api/tasks', authenticateUser, tasksRouter)
app.use('/api/auth', authRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

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