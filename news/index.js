const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/news', (req, res) => {
    res.send(JSON.stringify(JSON.parse(fs.readFileSync('news.json'))))
})

app.listen(port, () => {
    console.log(`News app listening at http://localhost:${port}`)
})