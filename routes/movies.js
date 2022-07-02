// Import
const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Movie = require('../models/movie')
const Genre = require('../models/genre')
const uploadPath = path.join('public', Movie.coverImageBasePath)
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

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
router.get('/new', async (req, res) => {
    renderNewPage(res, new Movie())
})

// Create new Movie
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        releaseDate: new Date(req.body.releaseDate),
        duration: req.body.duration,
        coverImageName: fileName,
        description: req.body.description
    })
    try {
        const newMovie = movie.save()
        // res.redirect(`movies/${newMovie.id}`)
        res.redirect(`movies`)
    } catch {
        renderNewPage(res, movie, true)
    }
})

async function renderNewPage(res, movie, hasError = false) {
    try {
        const genres = await Genre.find({})
        const params = {
            genres: genres,
            movie: movie
        }
        if(hasError) params.errorMessage = 'Error Creating Movie'
        res.render('movies/new', params)
    } catch {
        res.redirect('/movies')
    }
}

module.exports = router