
const express = require('express')
const route = require('./routes')
const app = express()
const port = 5000
const db = require('./config/db')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
db.connect()
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

route(app)
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);