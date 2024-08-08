import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Modal, Card } from "react-bootstrap";
import "./NotesList.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import FloatingActionButton from "../FloatingAction/FloatingActionButton";

const NotesList = ({ token }) => {
  // State variables for managing notes, form inputs, modal visibility, and edit mode
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // Track whether in edit mode
  const [currentNoteId, setCurrentNoteId] = useState(null); // Track the ID of the note being edited

  // Fetch notes from the server when the component mounts or token changes
  useEffect(() => {
    const fetchNotes = async () => {
      console.log("Token:", token); // Log the token to ensure it's being passed correctly
      try {
        // Fetch notes from the server with authorization header
        const response = await axios.get("http://localhost:5000/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data); // Set the fetched notes in state
      } catch (error) {
        console.error("Error fetching notes", error); // Handle errors
      }
    };
    fetchNotes();
  }, [token]);

  // Handle form submission for adding or editing a note
  const handleAddOrEditNote = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      if (editMode) {
        // Update an existing note
        await axios.put(
          `http://localhost:5000/notes/${currentNoteId}`,
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Update the notes in state
        setNotes(
          notes.map((note) =>
            note._id === currentNoteId ? { ...note, title, content } : note
          )
        );
      } else {
        // Add a new note
        const response = await axios.post(
          "http://localhost:5000/notes",
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotes([...notes, response.data]); // Add the new note to the state
      }
      // Reset form fields and close the modal
      setTitle("");
      setContent("");
      setShowModal(false);
      setEditMode(false); // Reset edit mode
      setCurrentNoteId(null); // Reset current note ID
    } catch (error) {
      console.error("Error saving note", error); // Handle errors
    }
  };

  // Handle click to edit a note
  const handleEditClick = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCurrentNoteId(note._id);
    setEditMode(true);
    setShowModal(true);
  };

  // Handle deletion of a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove the deleted note from the state
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note", error); // Handle errors
    }
  };

  // Handle click to add a new note
  const handleAddNoteClick = () => {
    setEditMode(false); // Ensure it's not in edit mode
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setContent("");
    setEditMode(false); // Reset edit mode
    setCurrentNoteId(null); // Reset current note ID
  };

  return (
    <Container className="notes-container">
      {/* Form for adding or editing notes */}
      <Form onSubmit={handleAddOrEditNote} className="note-form">
        <Form.Group>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="note-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
            className="note-input"
          />
        </Form.Group>
        <Button type="submit" className="add-note-button">
          {editMode ? "Save Changes" : "Add Note"}
        </Button>
      </Form>
      {/* Grid of notes */}
      <div className="notes-grid">
        {notes.map((note) => (
          <Card key={note._id} className="note-card">
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>{note.content}</Card.Text>
              <div className="icons-section">
                {/* Edit and delete buttons */}
                <Button variant="" onClick={() => handleEditClick(note)}>
                  <FaEdit style={{ color: "#142788", fontSize: "18px" }} />
                </Button>
                <Button variant="" onClick={() => deleteNote(note._id)}>
                  <MdDelete style={{ color: "red", fontSize: "18px" }} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
        {/* Floating action button to add a new note */}
        <FloatingActionButton onClick={handleAddNoteClick} />
        {/* Modal for adding or editing notes */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? "Edit Note" : "Add a new note"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleAddOrEditNote} className="note-form-modal">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="modal-input"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                required
                className="modal-textarea"
              ></textarea>
              <Button type="submit" className="modal-add-button">
                {editMode ? "Save Changes" : "Add Note"}
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default NotesList;
