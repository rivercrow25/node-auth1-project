const express = require('express')
const db = require('./users-model')

const router = express.Router()

router.get('/', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

module.exports = router