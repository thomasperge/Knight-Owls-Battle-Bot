const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    userId: String,
    pseudo: String,
    slot: {
      owl1: {
        hashtagNumber: Number,
        status: Number,
        health: Number,
        defenseLow: Number,
        defenseHigh: Number,
        attackLow: Number,
        attackHigh: Number,
        eva: Number,
        cooldown: Number,
      }, 
      owl2: {
        hashtagNumber: Number,
        status: Number,
        health: Number,
        defenseLow: Number,
        defenseHigh: Number,
        attackLow: Number,
        attackHigh: Number,
        eva: Number,
        cooldown: Number,
      },
      owl3: {
        hashtagNumber: Number,
        status: Number,
        health: Number,
        defenseLow: Number,
        defenseHigh: Number,
        attackLow: Number,
        attackHigh: Number,
        eva: Number,
        cooldown: Number,
      }, 
      owl4: {
        hashtagNumber: Number,
        status: Number,
        health: Number,
        defenseLow: Number,
        defenseHigh: Number,
        attackLow: Number,
        attackHigh: Number,
        eva: Number,
        cooldown: Number,
      }, 
      owl5: {
        hashtagNumber: Number,
        status: Number,
        health: Number,
        defenseLow: Number,
        defenseHigh: Number,
        attackLow: Number,
        attackHigh: Number,
        eva: Number,
        cooldown: Number,
      }, 
    },
    loot:{
      eagleHead: Number,
      eagleWing: Number,
      eagleTalon: Number
    }
})

module.exports = mongoose.model('Player', playerSchema)
