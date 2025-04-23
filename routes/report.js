const express = require("express");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const User = require("../models/User")
const Report = require("../models/Report");

// Set a report on BD
router.post("/setreport", async (req, res) => {
    const { user_id, message, tags = [], teams = [], media = [] } = req.body;

    if (!user_id || !message) {
        return res.status(400).json({ error: "User id and message are required" })
    }

    try {
        const user = await User.findOne({ user_id })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const now = new Date();

        const report = new Report({
            report_id: uuidv4(),
            user_id: user._id,
            message,
            media,
            date: now,
            dateString: now.toLocaleString("ru-RU"),
            dateRU: now.toLocaleDateString("ru-RU"),
            tags,
            teams
        })

        await report.save();
        res.status(201).json({ message: "Report added successfully" })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error setting report" })
    }
})

// получить отчёты вообще все отчёты баеров за сегодняшний день
router.get("/receiveallreportsbycurrentday", async (req, res) => {
    try {
        const now = new Date();
        const reports = await Report.find({
            dateRU: now.toLocaleDateString("ru-RU")
        })
            .populate("user_id");
        res.status(200).json({ reports: reports })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error getting reports" })
    }
})

// receive all reports by the team by current day // получить все отчёта команды за сегодняшний день
router.post("/receiveallreportsbyteamoncurrentday", async (req, res) => {
    const { team } = req.body;
    try {
        const now = new Date();
        const reports = await Report.find({
            dateRU: now.toLocaleDateString("ru-RU")
        })
            .populate({
                path: "user_id",
                match: { teams: team }
            })
        const filteredReports = reports.filter(r => r.user_id !== null);
        res.status(201).json({ reports: filteredReports })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Error getting reports" })
    }
})

// получи все отчёты, у которых указаны 
// переданная команда
// переданный тег
// переданный байер
router.post("/getbuyersbytagsandbuyername", async (req, res) => {
    const { tag, team, buyer } = req.body;

    if (!tag || !team || !buyer) {
        return res.status(400).json({ error: "Tag name, team name and buyer name are required" });
    }

    try {
        const reports = await Report.find({
            tags: tag,
            teams: team
        }).populate({
            path: "user_id",
            match: { username: buyer }
        });

        const filteredReports = reports.filter(report => report.user_id !== null);

        res.status(201).json({ message: filteredReports });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error getting buyers list" });
    }
});

//вернуть все отчёты по дате, байеру, тегу и команде
router.post("/getreportsbydatetagsbuyerteam", async (req, res) => {
    const { date, tag, buyer, team } = req.body;

    if (!date || !tag || !buyer || !team) {
        return res.status(400).json({ error: "Date, tag name, buyer name, team name are required" });
    }

    try {
        const reports = await Report.find({
            dateRU: date,
            tags: tag,
            teams: team,
        }).populate({
            path: "user_id",
            match: { username: buyer }
        })
        const filteredReports = reports.filter(r => r.user_id);

        res.status(201).json({ message: filteredReports })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error getting reports" })
    }
})

module.exports = router;