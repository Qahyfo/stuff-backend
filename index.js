require('dotenv').config()
const express = require("express")
const cors = require('cors');
const sequelize = require('./db');
const router = require('./routes/index')
const models = require('./models/models')
const path = require('path')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5000;

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log("App listening on port: " + PORT))
    } catch (error) {
        console.log(error)
    }

}

start()
