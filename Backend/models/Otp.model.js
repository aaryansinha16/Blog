const { Schema, model } = require("mongoose");

const OtpSchema = new Schema({
    email: String,
    otp: String
})

const OtpModel = model("otp", OtpSchema)

module.exports = OtpModel