const {UnauthenticatedError} = require("../errors");
const jwt = require("jsonwebtoken");

const checkToken = async (req, res) => {
    const access = req.body.access
    if (!access) {
        throw new UnauthenticatedError('Authentication invalid')
    }
    try {
        jwt.verify(access, process.env.JWT_SECRET)

        res.status(200).json({access})
    } catch (err) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = {checkToken}