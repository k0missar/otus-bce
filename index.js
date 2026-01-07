const app = require('./app')
// const https = require('https')
// const fs = require('fs')
const connectDB = require('./config/db')

connectDB()

// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'),
// }

const port = 3008

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port} \n http://localhost:${port}`)
})