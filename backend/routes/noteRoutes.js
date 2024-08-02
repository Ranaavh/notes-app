const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getNotes,
  createNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

// Get notes
router.get("/", authMiddleware, getNotes);

// Add note
router.post("/", authMiddleware, createNote);

// Delete note
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
