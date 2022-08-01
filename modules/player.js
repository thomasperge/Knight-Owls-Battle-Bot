const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    userId: String,
    pseudo: String,
    slot: {
      owl1: {
        hashtagNumber: Number,
        health: Number,
        defense: Number,
        eva: Number,
        attack: Number,
      }, 
      owl2: {
        hashtagNumber: Number,
        health: Number,
        defense: Number,
        eva: Number,
        attack: Number,
      },
      owl3: {
        hashtagNumber: Number,
        health: Number,
        defense: Number,
        eva: Number,
        attack: Number,
      }, 
      owl4: {
        hashtagNumber: Number,
        health: Number,
        defense: Number,
        eva: Number,
        attack: Number,
      }, 
      owl5: {
        hashtagNumber: Number,
        health: Number,
        defense: Number,
        eva: Number,
        attack: Number,
      }, 
    },
})

module.exports = mongoose.model('Player', playerSchema)
