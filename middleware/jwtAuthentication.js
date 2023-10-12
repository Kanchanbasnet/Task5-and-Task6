const jwt = require('jsonwebtoken');
const User = require('../models/User.Model.js');

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({ success: false, message: 'Please provide a token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User does not exist.' });
        } else {
            next();
            return res.status(200).send(user);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = { verifyToken };
