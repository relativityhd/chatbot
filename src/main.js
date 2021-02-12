require('dotenv').config()
const path = require('path')
const axios = require('axios').default
const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')
const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const socketio = require('socket.io')
const io =
  process.env.NODE_ENV === 'production'
    ? socketio(http)
    : socketio(http, {
        cors: {
          origin: 'http://localhost:8080',
          methods: ['GET', 'POST']
        }
      })
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend/dist')))

const assistant = new AssistantV2({
  version: '2020-09-24',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_TOKEN
  }),
  serviceUrl: process.env.WATSON_URL
})

let sessionId
assistant
  .createSession({
    assistantId: process.env.WATSON_ID
  })
  .then((res) => {
    sessionId = res.result.session_id
    console.log(res.result)
  })
  .catch((err) => {
    console.log(err)
  })

const chat = []

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('msg', (msg) => {
    console.log('--DEBUG  ~ file: main.js ~ line 76 ~ socket.on ~ msg', msg)
    axios({
      method: 'post',
      url: process.env.SLACK_URL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`
      },
      data: {
        text: `User: ${msg}`,
        channel: process.env.SLACK_CHANNEL
      }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.warn(err)
      })
    assistant
      .message({
        assistantId: process.env.WATSON_ID,
        sessionId: sessionId,
        input: {
          message_type: 'text',
          text: msg
        }
      })
      .then((res) => {
        res.result.output.generic.forEach((gen) => {
          io.emit('res', gen.text)
          console.log('--DEBUG  ~ file: main.js ~ line 65 ~ res.result.output.generic.forEach ~ gen.text', gen.text)
          axios({
            method: 'post',
            url: process.env.SLACK_URL,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: `Bearer ${process.env.SLACK_TOKEN}`
            },
            data: {
              text: `Bot: ${gen.text}`,
              channel: process.env.SLACK_CHANNEL
            }
          })
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.warn(err)
            })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname, '../frontend/dist/index.html')
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
        channel: process.env.SLACK_CHANNEL
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
    console.log(`### Received Email: ${req.body.email}`)
    res.send('Send message to email!')
  } else {
    res.send('Invalid type, please specify!')
  }
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
