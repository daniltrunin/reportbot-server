const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    tag_id: { type: String, required: true, unique: true },
    tag_name: { type: String, required: true }
}, {collection: "tags"})

module.exports = mongoose.model("Tag", TagSchema);