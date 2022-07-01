// Import
const express = require("express")
const router = express.Router()

router.get('/', (req, res ) => {
    res.send('Movie Night!')
})

module.exports = router