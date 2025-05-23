const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    report_id: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    media: [
        {
            type: {
                type: String,
                required: true
            },
            file_id: { type: String, required: true },
            caption: { type: String }
        }
    ],
    date: { type: Date, required: true },
    dateString: { type: String },
    dateRU: { type: String, required: true },
    tags: { type: Array, required: true },
    teams: { type: Array, required: true }
}, { collection: "buyers_reports" })

module.exports = mongoose.model("Report", ReportSchema)