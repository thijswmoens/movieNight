// Import
const express = require("express")
const router = express.Router()
const Genre = require('../models/genre')

// All Genres Route
router.get('/', (req, res ) => {
    res.render('genres/index')
})

// New Genre Route
router.get('/new', (req, res) => {
    res.render('genres/new', {
        genre: new Genre()
    })
})

// Create new Genre
router.post('/', async (req, res) => {
    const genre = new Genre({
        name: req.body.name
    })
    try {
        const newGenre = await genre.save()
        // res.redirect(`genres/${newGenre.id}`)
        res.redirect(`genres`)
    } catch {
        res.render('genres/new', {
            genre: genre,
            errorMessage: 'Error creating Genre'
        })
    }
})

module.exports = router