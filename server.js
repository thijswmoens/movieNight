// Import
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

// Set app config
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// Set use
app.use(expressLayouts)
app.use(express.static('public'))

// Listen
app.listen(process.env.PORT || 3000)