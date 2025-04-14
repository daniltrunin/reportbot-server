const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    roles: { type: Array, required: true },
    teams: { type: Array, required: true }
}, { collection: "users" })

module.exports = mongoose.model("User", UserSchema)