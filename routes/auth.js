const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* Creating an admin */
router.post("/createadmin", async (req, res) => {
    const { user_id, username, roles, teams } = req.body;

    if (!username || !user_id) {
        return res.status(400).json({ error: "Username and user id required" })
    }

    try {
        const newUser = new User({ user_id, username, roles, teams });

        const exist = await User.findOne({ user_id });
        if (exist) {
            return res.status(400).json({ error: "User already exist" });
        }

        await newUser.save();
        res.status(201).json({ message: "Admin added successfully" })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error adding admin" })
    }
});

// Creating a buyer user
router.post("/createbuyer", async (req, res) => {
    const { user_id, username, roles, teams } = req.body

    if (!username || !user_id) {
        return res.status(400).json({ error: "Username and user id required" })
    }

    try {
        const newUser = new User({ user_id, username, roles, teams });

        const exist = await User.findOne({ user_id });
        if (exist) {
            return res.status(400).json({ error: "User already exist" });
        }

        await newUser.save();
        res.status(201).json({ message: "Buyer added successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error adding buyer" })
    }
})

// Creating a manager user
router.post("/createmanager", async (req, res) => {
    const { user_id, username, roles, teams } = req.body

    if (!username || !user_id) {
        return res.status(400).json({ error: "Username and user id required" })
    }

    try {
        const newUser = new User({ user_id, username, roles, teams });

        const exist = await User.findOne({ user_id });
        if (exist) {
            return res.status(400).json({ error: "User already exist" });
        }

        await newUser.save();
        res.status(201).json({ message: "Manager added successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error adding manager" })
    }
})

module.exports = router;