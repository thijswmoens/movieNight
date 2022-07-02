const mongoose = require('mongoose')

const coverImageBasePath = 'uploads/movieCovers'

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    releaseDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true,
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre'
    }
})

module.exports = mongoose.model('Movie', movieSchema)
module.exports.coverImageBasePath = coverImageBasePath