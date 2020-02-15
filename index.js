const express = require('express')
const app = express()
const appName = "curl.ninja"
const port = 8000

// Routes
app.get('/', (req, res) => res.send('hello world'))

// Shell Routes
app.get('/shell', (req, res) => res.send('SYNTAX: /shell/LANGUAGE/TARGET_IP/PORT'))
app.get('/shell/:language/:target/:port', (req, res) => res.send(`${JSON.stringify(req.params)}`))

// Tool Routes
app.get('/nix', (req, res) => res.send(''))
app.get('/win', (req, res) => res.send(''))

// Misc Routes
app.get('/listen/', (req, res) => res.send('SYNTAX: /listen/:PORT'))
app.get('/listen/:port', (req, res) => res.send(`nc -lv ${req.params.port}`))

app.listen(port, () => console.log(`${appName} listening on port ${port}!`))
