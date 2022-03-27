require('dotenv').config()
require('express-async-errors');

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const sequelize = require('./db/connect')
const express = require('express')
const app = express()

const authRouter = require('./routes/auth')
const tasksRouter = require('./routes/tasks')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const authenticateUser = require('./middleware/authentication')


app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res) => {
    res.send('tasks api')
})

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