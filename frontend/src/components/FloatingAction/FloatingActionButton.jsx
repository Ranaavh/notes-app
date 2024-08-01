// src/components/FloatingActionButton.jsx
import React from "react";
import { Button } from "react-bootstrap";
import "./FloatingActionButton.css";

const FloatingActionButton = ({ onClick }) => {
  return (
    <Button className="fab" onClick={onClick}>
      Add
    </Button>
  );
};

export default FloatingActionButton;
