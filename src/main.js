const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/health', (req, res) => {
  res.send('Healthy')
})

app.post('/email', (req, res) => {
  res.send('Received an Email!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
