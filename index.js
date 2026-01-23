const app = require('./app')
const { Server } = require("socket.io")
const http = require('http')
const jwt = require('jsonwebtoken')
// const https = require('https')
// const fs = require('fs')
const connectDB = require('./config/db')

connectDB()

// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'),
// }

// Socket IO
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3008",
        credentials: true
    },
})


// socket io
io.on('connection', async (socket) => {
    console.log('Client connected ', socket.id)

    const rawCookies = socket.request.headers.cookie || ''
    const cookies = {}

    rawCookies.split(';').forEach(c => {
        const [name, ...rest] = c.trim().split('=')
        cookies[name] = rest.join('=')
    })
    const token = cookies.token
    let dataUser = {}

    const notificationMessage = {
        message: 'Для открытия больших функций пройдите регистрацию'
    }

    try {
        if (token) {
            dataUser = jwt.verify(token, 'afhlkasdhfklhkh') // тот же секрет
        }

        console.log('Пользовтель WebSocket:', dataUser.id)

        // Можно использовать модели
        let user
        if (dataUser.id) {
            user = await require('./models/user').findById(dataUser.id)
            console.log('Пользователь из модели:', user.username)
        }

        if (user) {
            notificationMessage.message = 'Добро пожаловать на портал BCE ' + user.username
        }
    } catch (err) {
        console.log('Неверный, устаревший токен')
        socket.disconnect()
    }

    const intervalId = setInterval(() => {
        socket.emit('notification', { message: notificationMessage.message })
    }, 10000)

    socket.on('message', data => {
        console.log('Сообдещие для ', socket.userId, data)
    })

    socket.on('disconnect', () => {
        console.log('Соединение разовано ', socket.userId)
        clearInterval(intervalId)
    })
})

const port = 3008

server.listen(port, () => {
    console.log(`Сервер + Socket IO запущен на порту ${port} \n http://localhost:${port}`)
})