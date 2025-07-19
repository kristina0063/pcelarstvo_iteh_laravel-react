import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

export default function CommentSuggestionModal({
  show,
  onHide,
  type, 
  aktivnostId,
  onSuccess,
}) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload =
      type === "komentar"
        ? {
            sadrzaj: input,
            datum: new Date().toISOString().split("T")[0],
            aktivnost_id: aktivnostId,
          }
        : {
            poruka: input,
            datum_kreiranja: new Date().toISOString().split("T")[0],
            aktivnost_id: aktivnostId,
          };

    try {
      await axiosClient.post(
        type === "komentar" ? "/komentari" : "/sugestije",
        payload
      );
      alert("Uspešno dodato!");
      onSuccess(); 
      onHide();
      setInput("");
    } catch (error) {
      console.error("Greška pri dodavanju:", error);
      alert("Došlo je do greške.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            Dodaj {type === "komentar" ? "komentar" : "sugestiju"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>
              {type === "komentar" ? "Sadržaj komentara" : "Poruka sugestije"}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Otkaži
          </Button>
          <Button variant="primary" type="submit">
            Sačuvaj
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
