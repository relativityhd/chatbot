require('dotenv').config()
const axios = require('axios').default
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

app.post('/api', (req, res) => {
  const type = req.body.type

  if (type === 'slack') {
    axios({
      method: 'post',
      url: process.env.SLACK_URL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`
      },
      data: {
        text: 'Amk neue nachricht',
        channel: 'C01N19SKRPE'
      }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.warn(err)
      })
    res.send('Send message to slack!')
  } else if (type === 'email') {
    res.send('Send message to email!')
  } else {
    res.send('Invalid type, please specify!')
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
