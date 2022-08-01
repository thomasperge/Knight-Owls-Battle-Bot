const mongoose = require('mongoose')

const battleSchema = mongoose.Schema({
    battleCreatorID: String,
    battleMember: Array,
    maxUser: Number,
    ennemi : {
        eagle: Number,
        eagleCaptain: Number,
        eagleKing: Number,
        eagleGod: Number
    }
})

module.exports = mongoose.model('Battle', battleSchema)
