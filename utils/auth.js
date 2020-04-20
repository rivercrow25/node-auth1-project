module.exports = function (req, res, next) {
    if (req.session.loggedin) {
        next()
    } else {
        res.status(400).json({ message: 'must be logged in' })
    }
}