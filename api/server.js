const express = require('express')
const session = require('express-session')

const userRoute = require('../users/userRoute')
const authRouter = require('../authRouter/authRouter')
const auth = require('../utils/auth')

const server = express()

const sessionConfig = {
    name: 'cia spy',
    secret: process.env.SECRET || 'banana bread',
    resave: false,
    saveUninitialized: process.env.SEND || true,
    cookies: {
        maxAge: 1000 * 10,
        secure: process.env.SECURE || false,
        httpOnly: true,
    }
}

server.use(session(sessionConfig))
server.use(express.json())


server.use('/api/users', auth, userRoute)
server.use('/api/auth', authRouter)

module.exports = server