const express = require('express')
const router = express.Router()
const course = require('../../models/course')

router.get('/', async (req, res) => {
    try {
        const data = await course.find().populate('author_id', 'username')
        res.render('course', { data })
    } catch (error) {
        res.status(500).json({ error: true, message: 'Ошибка сервера при получении курса' })
    }
})

router.get('/:id/', async (req, res) => {
    try {
        const data = await course.findOne({"_id": req.params.id}).populate('author_id', 'username')
        res.render('courseDetail', { data })
    } catch (error) {
        res.status(500).json({ error: true, message: 'Ошибка сервера при получении курса' })
    }
})

module.exports = router