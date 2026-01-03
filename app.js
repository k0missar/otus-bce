const express = require('express')
const app = express()
const course = require('./models/course');

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', async (req, res) => {
    const param = 'Параметр, много параметров'
    const courses = await course.find();
    console.log(courses)
    res.render('index', { param, courses })
})

app.get('/course/', async (req, res) => {
    const test = 'Название курса'
    const courses = await course.find();
    console.log(courses)
    res.render('course', { test, courses })
})

app.get('/auth/', (req, res) => {
    res.render('auth')
})

module.exports = app