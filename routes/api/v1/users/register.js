const express = require('express');
const router = express.Router();
const users = require('../../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET_KEY = 'afhlkasdhfklhkh'

router.post('/', async (req, res) => {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();
    const email = req.body.email?.trim();

    if (!username || !password || !email) {
        return res.status(400).send({error: true, message: 'Недостаточно данных для регистрации нового пользователя'});
    }

    const isEmail = await users.findOne({ email: email })

    if (isEmail) { // Уточнить
        return res.status(409).send({error: true, message: 'Пользователь с таким email уже существует'})
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const user = await users.create({
        username: username,
        password: hash,
        email: email,
    })

    if (!user) {
        return res.status(400).send({error: true, message: 'Пользователь не создан, ошибка сервера'})
    }

    const userObj = user.toObject(); // превращаем документ в обычный объект JS

    const token = await jwt.sign({
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
    }, JWT_SECRET_KEY, {expiresIn: '6h'});

    userObj.token = token;

    return res.status(201).json(userObj)
})

module.exports = router