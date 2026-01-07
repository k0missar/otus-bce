const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const cors = require('cors');

app.use(cors());

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // для JSON в теле запроса
app.use(express.urlencoded({ extended: true })) // для формы x-www-form-urlencoded

// pages
app.use('/', require('./routes/pages/index'))
app.use('/courses', require('./routes/pages/courses'))
app.use('/users', require('./routes/pages/users'))
app.use('/auth', require('./routes/pages/auth'))

// api
app.use('/api/v1/users', require('./routes/api/v1/users'))
app.use('/api/v1/courses', require('./routes/api/v1/courses'))

// api-docs
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app