const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.signup = async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: '',
        surname: '',
        email: req.body.email,
        password: hash
    });
    try {
        const savedUser = await user.save();
        res.status(201).json({
            message: 'User created!',
            result: savedUser
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                message: "Auth Failed"
            });
        }
        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) {
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        const token = jwt.sign({ email: user.email, userId: user._id }, 'secret_this_should_be_longer', { expiresIn: "1h" });
        res.status(200).json({
            token: token,
            expiresIn: 3600
        })
    } catch (err) {
        return res.status(401).json({
            message: "Auth failed"
        })
    }
}