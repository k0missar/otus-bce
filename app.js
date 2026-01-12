const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const cors = require('cors');

app.use(cors());
app.use(cookieParser());

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('./public'));
app.use(express.json()) // для JSON в теле запроса
app.use(express.urlencoded({ extended: true })) // для формы x-www-form-urlencoded

async function checkToken(req, res, next) {
    if (!req.cookies.token) {
        return next();
    }

    try {
        const userData = jwt.verify(req.cookies.token, 'afhlkasdhfklhkh');
        res.locals.user = userData;
        next();
    } catch (e) {
        req.userData = null;
        next();
    }
}

// pages
app.use('/', checkToken, require('./routes/pages/index'))
app.use('/courses', checkToken, require('./routes/pages/courses'))
app.use('/users', checkToken, require('./routes/pages/users'))
app.use('/auth', checkToken, require('./routes/pages/auth'))

// api
app.use('/api/v1/users', checkToken, require('./routes/api/v1/users'))
app.use('/api/v1/courses', checkToken, require('./routes/api/v1/courses'))
app.use('/api/v1/users/register', checkToken, require('./routes/api/v1/users/register'))
app.use('/api/v1/users/login', checkToken, require('./routes/api/v1/users/login'))
app.use('/api/v1/users/logout', require('./routes/api/v1/users/logout'))

// api-docs
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app