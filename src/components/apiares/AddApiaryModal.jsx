import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

export default function AddApiaryModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    naziv: "",
    lokacija: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("pcelinjaci", formData);
      alert("Novi pčelinjak je uspešno dodat!");
      onSuccess();
      onHide();
      setFormData({ naziv: "", lokacija: "" });
    } catch (error) {
      console.error("Greška pri dodavanju pčelinjaka:", error);
      alert("Došlo je do greške. Proveri podatke.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj novi pčelinjak</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formNaziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control
              type="text"
              name="naziv"
              value={formData.naziv}
              onChange={handleChange}
              maxLength={255}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLokacija">
            <Form.Label>Lokacija</Form.Label>
            <Form.Control
              type="text"
              name="lokacija"
              value={formData.lokacija}
              onChange={handleChange}
              maxLength={255}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Odustani
          </Button>
          <Button variant="primary" type="submit">
            Sačuvaj
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
