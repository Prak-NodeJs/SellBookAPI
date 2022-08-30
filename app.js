const express = require('express')
const app = express()
const userRouter = require('./Routes/userRoutes')
const cookieParser = require('cookie-parser')
const bookRouter = require('./Routes/bookRoutes')
const adminRoutes = require('./Routes/adminRoutes')

app.use(cookieParser())
app.use(express.json())

app.use('/', userRouter)
app.use('/', bookRouter)
app.use('/', adminRoutes)




module.exports = app
