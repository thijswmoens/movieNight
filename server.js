// Import
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const indexRouter = require('./routes/index')

// Set app config
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// Set use
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

// Listen
app.listen(process.env.PORT || 3000)