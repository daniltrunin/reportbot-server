const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* Getting a user role */
router.post("/getuserrole", async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "User id required" })
    }

    try {
        const user = await User.findOne({ user_id });
        if (user) {
            return res.status(201).json({ message: user.roles });
        }
        if (!user) {
            return res.status(400).json({ error: "No user with this user_id" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error getting user" })
    }
});

module.exports = router;