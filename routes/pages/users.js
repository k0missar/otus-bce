const express = require('express')
const router = express.Router()
const users = require("../../models/user")

router.get('/', async (req, res) => {
    try {
        const data = await users.find()
        res.render('users', { data })
    } catch (error) {
        res.status(500).json({ error: true, message: 'Ошибка сервера при получении юзеров' })
    }
})

module.exports = router