const socket = io('http://localhost:3008', { withCredentials: true })
const worker = new Worker('/js/worker.js')

socket.on('connect', () => {
    console.log('Соединение с сервером установлено id socket = ', socket.id)
    socket.emit('message', 'Привет сервер!')
})

socket.on('notification', (data) => {
    worker.postMessage(data)
})

worker.onmessage = (e) => {
    const notification = e.data
    if (Notification.permission === "granted") {
        new Notification(notification.message)
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(notification.message)
            }
        })
    }
}

socket.on('disconnect', () => {
    console.log('Соединение с WebSocket разорвано.')
})