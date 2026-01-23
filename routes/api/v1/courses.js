const express = require('express')
const router = express.Router()
const course = require('../../../models/course')
const { createCourseSchema, updateCourseSchema } =
    require('../../../validators/course.validator')

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
    const { error, value } = createCourseSchema.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: true,
            message: error.details[0].message
        })
    }

    try {
        const newCourse = await course.create(value)
        res.status(201).json({ success: true, data: newCourse })
    } catch (error) {
        res.status(500).json({ error: true, message: 'Ошибка сервера при создании курса' })
    }
})

// PUT
router.put('/:id', async (req, res) => {
    const { error, value } = updateCourseSchema.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: true,
            message: error.details[0].message
        })
    }

    try {
        const updatedCourse = await course.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }
        )

        if (!updatedCourse) {
            return res.status(404).json({ error: true, message: 'Курс не найден' })
        }

        res.status(200).json({ success: true, data: updatedCourse })
    } catch (error) {
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