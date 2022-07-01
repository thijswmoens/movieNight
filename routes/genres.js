// Import
const express = require("express")
const router = express.Router()

// All Genres Route
router.get('/', (req, res ) => {
    res.render('genres/index')
})

// New Genre Route
router.get('/new', (req, res) => {
    res.render('genres/new')
})

// Create new Genre
router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router