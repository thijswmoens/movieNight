// Import
const express = require("express")
const router = express.Router()
const Movie = require('../models/movie')

// All Movies Route
router.get('/', async (req, res ) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const movies = await Movie.find(searchOptions)
        res.render('movies/index', { 
            movies: movies, 
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/')
    }
})

// New Movie Route
router.get('/new', (req, res) => {
    res.render('movies/new', {
        movie: new Movie()
    })
})

// Create new Movie
router.post('/', async (req, res) => {
    const movie = new Movie({
        name: req.body.name
    })
    try {
        const newMovie = await movie.save()
        // res.redirect(`movies/${newMovie.id}`)
        res.redirect(`movies`)
    } catch {
        res.render('movies/new', {
            movie: movie,
            errorMessage: 'Error creating Movie'
        })
    }
})

module.exports = router