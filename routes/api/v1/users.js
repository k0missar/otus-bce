const express = require('express')
const router = express.Router()
const users = require('../../../models/user')

// GET
router.get('/', async (req, res) => {
    const userId = req.query.id // если придёт ?id=123

    try {
        let data

        if (userId) {
            data = await users.findById(userId)
            if (!data) {
                return res.status(404).json({ error: true, message: 'Пользователь не найден' })
            }
        } else {
            data = await users.find()
        }

        res.status(200).json({ success: true, data })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: true, message: 'Ошибка сервера при получении пользователей' })
    }
})

// POST
router.post('/', async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ error: true, message: 'Не переданы все параметры' })
    }

    try {
        const newUser = await users.create({ username, email, password })
        res.status(201).json({ success: true, data: newUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: true, message: 'Ошибка сервера при создании пользователя' })
    }
})

// PUT
router.put('/:id', async (req, res) => {
    const userId = req.params.id
    const updateData = req.body

    try {
        const updatedUser = await users.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ error: true, message: 'Пользователь не найден' })
        }

        res.status(200).json({ success: true, data: updatedUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: true, message: 'Ошибка сервера при обновлении пользователя' })
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    const userId = req.params.id

    try {
        const deletedUser = await users.findByIdAndDelete(userId)

        if (!deletedUser) {
            return res.status(404).json({ error: true, message: 'Пользователь не найден' })
        }

        res.status(200).json({ success: true, message: 'Пользователь удалён', data: deletedUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: true, message: 'Ошибка сервера при удалении пользователя' })
    }
})

module.exports = router