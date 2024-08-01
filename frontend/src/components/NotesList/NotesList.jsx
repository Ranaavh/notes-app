import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Modal, Card } from "react-bootstrap";
import "./NotesList.css";
import FloatingActionButton from "../FloatingAction/FloatingActionButton";

const NotesList = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes", error);
      }
    };
    fetchNotes();
  }, [token]);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/notes",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes([...notes, response.data]);
      setTitle("");
      setContent("");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding note", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  const handleAddNoteClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="notes-container">
      <Form onSubmit={addNote} className="note-form">
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
          Add Note
        </Button>
      </Form>
      <div className="notes-grid">
        {notes.map((note) => (
          <Card key={note._id} className="note-card">
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>{note.content}</Card.Text>
              <Button variant="danger" onClick={() => deleteNote(note._id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
        <FloatingActionButton onClick={handleAddNoteClick} />
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={addNote} className="note-form-modal">
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
              <Button type="submit" className="btn btn-primary">
                Add Note
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default NotesList;
