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
app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60*60*24*365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
app.use(express.json());
route(app);
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
