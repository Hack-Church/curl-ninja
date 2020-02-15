const express = require('express')
const { checkAgent } = require('./curlNinja')

// CONFIG
const APP_NAME = "curl.ninja"
const PORT = 8000

const app = express()

// Routes
app.get('/', checkAgent)
app.get('/:action/:lang?/:ip?/:port?', checkAgent)

app.listen(PORT, () => console.log(`${APP_NAME} listening on port ${PORT}!`))
