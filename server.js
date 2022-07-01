//Check if we are in production envirment
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    // require('dotenv').parse()
}

// Import
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

// Load Routers
const indexRouter = require('./routes/index')
const genreRouter = require('./routes/genres')

// Set app config
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// Set use
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/genres', genreRouter)


// Setup MongoDB database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

// Listen
app.listen(process.env.PORT || 3000)