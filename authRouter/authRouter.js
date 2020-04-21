const router = require('express').Router()
const bcrypt = require('bcryptjs')

const db = require('../users/users-model')

router.post('/register', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 12)
    req.body.password = hash
    db.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    db.getBy({ username })
        .then(([found]) => {
            console.log(found)
            if (found && bcrypt.compareSync(password, found.password)) {
                req.session.loggedin = true
                res.status(200).json(found)
            } else {
                res.status(401).json({ message: 'incorrect username or password' })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

module.exports = router