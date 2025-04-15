const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");
const { v4: uuidv4 } = require("uuid");

// create new tag
router.post("/createtag", async (req, res) => {
    const { tag_name } = req.body;

    if (!tag_name) {
        return res.status(400).json({ error: "Tag name required" });
    }

    try {
        const new_tag_id = uuidv4();
        const newTag = new Tag({ tag_id: new_tag_id, tag_name });
        const exist = await Tag.findOne({ new_tag_id })
        if (exist) {
            return res.status(400).json({ error: "Tag already exist" })
        }

        await newTag.save();
        res.status(201).json({ message: tag_name })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error adding tag" })
    }
})

// get all tags
router.get("/getalltags", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json({ message: tags })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error fetching tags" })
    }
})

module.exports = router;