const express = require("express");
const jwt = require("jsonwebtoken");
const Note = require("../models/Note");

const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Get notes
router.get("/", authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId });
    res.json(notes);
  } catch (error) {
    res.status(400).json({ message: "Error fetching notes" });
  }
});

// Add note
router.post("/", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({
      title,
      content,
      user: req.user.userId,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: "Error adding note" });
  }
});

// Delete note
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting note" });
  }
});

module.exports = router;
