const { model, Schema} = require("mongoose")

const UserSchema = new Schema({
    email: String,
    password: String,
    age: Number
})

const UserModel = model("user", UserSchema)

module.exports = UserModel