const express = require('express');
const router = express.Router();
const users = require('../../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET_KEY = 'afhlkasdhfklhkh'

// проверка существует ли пользователь
async function getUser(req, res, next) {
    const email = req.body.email?.trim()?.toLowerCase()
    const password = req.body.password?.trim()

    if (!email || !password) {
        return res.status(401).json({error: true, message: 'Не переданый данный логин или пароль'})
    }

    try {
        const docUser = await users.findOne({ email: email });
        if (!docUser) {
            return res.status(404).json({ error: true, message: 'Пользователь не найден' });
        }

        req.user = docUser.toObject()
        next()
    } catch (e) {
        next(e)
    }
}

// проверка парль пользователя
async function getPassword(req, res, next) {
    const password = req.body.password
    const hash = req.user.password
    const isPasswordValid = await bcrypt.compare(password, hash)
    if (!isPasswordValid) {
        return res.status(401).json({error: true, message: 'Неверный пароль'})
    }
    next()
}

// создание токена
function signAsync(payload, secret, options) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
}

async function getJWTToken(req, res, next) {
    try {
        const token = await signAsync({
            id: req.user._id,
            role: req.user.role,
            username: req.user.username,
            email: req.user.email,
        }, JWT_SECRET_KEY, { expiresIn: '6h' });

        req.user.token = token;
        next();
    } catch (err) {
        next(err);
    }
}

router.post('/', getUser, getPassword, getJWTToken, async (req, res) => {
    res.cookie('token', req.user.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 6 * 60 * 60 * 1000 })
    return res.status(200).json({success: true, message: "Пользоватлеь успешно авторизован"})
})

module.exports = router