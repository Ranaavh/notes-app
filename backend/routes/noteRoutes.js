const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware"); // Import the middleware
const Note = require("../models/Note");

const router = express.Router();

// Get notes
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }); // Use req.user._id
    res.json(notes);
  } catch (error) {
    res.status(400).json({ message: "Error fetching notes" });
  }
});

// Add note
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({
      title,
      content,
      user: req.user._id, // Use req.user._id
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: "Error adding note" });
  }
});

// Delete note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting note" });
  }
});

module.exports = router;
