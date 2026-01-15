self.onmessage = (e) => {
    const data = e.data
    self.postMessage(data)
}