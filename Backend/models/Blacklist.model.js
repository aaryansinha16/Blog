const { Schema, model } = require("mongoose");

const BlacklistSchema = new Schema({
    mainToken: String,
    refreshToken : String
})

const BlacklistModel = model("blacklist", BlacklistSchema)

module.exports = BlacklistModel