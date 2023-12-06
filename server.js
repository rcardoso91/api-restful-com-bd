require('dotenv').config()
const express = require ('express')
const cors = require('cors');
const path = require ('path')
const app = express ()
const apiV1Router = require('./api/routes/apiV1Router');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/app', express.static (path.join (__dirname, '/public')))
app.use('/api/v1', apiV1Router);//produtos


let port = process.env.PORT || 3000
app.listen (port)
