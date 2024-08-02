const Note = require("../models/Note");

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(400).json({ message: "Error fetching notes" });
  }
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({
      title,
      content,
      user: req.user._id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: "Error adding note" });
  }
};

const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting note" });
  }
};

module.exports = { getNotes, createNote, deleteNote };
