const app = require('./app')

const port = 3008

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port} \n http://localhost:${port}`)
})