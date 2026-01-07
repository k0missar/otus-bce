const express = require('express')
const router = express.Router()
const course = require('../../../models/course')

// GET
router.get('/', async (req, res) => {
    const courseId = req.query.id // если придёт ?id=123

    try {
        let data

        if (courseId) {
            data = await course.findById(courseId).populate('author_id', 'username')
            if (!data) {
                return res.status(404).json({ error: true, message: 'Курс не найден' })
            }
        } else {
            data = await course.find().populate('author_id', 'username')
        }

        res.status(200).json({ success: true, data })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: true, message: 'Ошибка сервера при получении курса' })
    }
})

// POST
router.post('/', async (req, res) => {
    const { title, description, difficulty, tags, author_id } = req.body

    if (!title || !description || !difficulty || !tags || !author_id) {
        return res.status(400).json({ error: true, message: 'Не переданы все параметры' })
    }

    try {
        const newCourse = await course.create({ title, description, difficulty, tags, author_id })
        res.status(201).json({ success: true, data: newCourse })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: true, message: 'Ошибка сервера при создания курса' })
    }
})

// PUT
router.put('/:id', async (req, res) => {
    const courseId = req.params.id
    const updateData = req.body

    try {
        const updatedCourse = await course.findByIdAndUpdate(
            courseId,
            updateData,
            { new: true, runValidators: true }
        )

        if (!updatedCourse) {
            return res.status(404).json({ error: true, message: 'Курс не найден' })
        }

        res.status(200).json({ success: true, data: updatedCourse })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: true, message: 'Ошибка сервера при обновлении курса' })
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    const courseId = req.params.id

    try {
        const deletedCourse = await course.findByIdAndDelete(courseId)

        if (!deletedCourse) {
            return res.status(404).json({ error: true, message: 'Курс не найден' })
        }

        res.status(200).json({ success: true, message: 'Курс удалён', data: deletedCourse })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: true, message: 'Ошибка сервера при удалении курса' })
    }
})

module.exports = router