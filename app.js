const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    const param = 'Параметр, много параметров'
    res.render('index', { param })
})

app.get('/course/', (req, res) => {
    const course = 'Название курса'
    res.render('course', { course })
})

app.get('/auth/', (req, res) => {
    res.render('auth')
})

module.exports = app