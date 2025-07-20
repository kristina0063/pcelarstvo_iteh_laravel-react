import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

export default function EditApiaryModal({ show, onHide, apiary, onSuccess }) {
  const [formData, setFormData] = useState({
    naziv: "",
    lokacija: "",
  });

  useEffect(() => {
    if (apiary) {
      setFormData({
        naziv: apiary.naziv || "",
        lokacija: apiary.lokacija || "",
      });
    }
  }, [apiary]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pretpostavljam da update endpoint ide na /pcelinjaci/:id PUT ili PATCH
      await axiosClient.put(`pcelinjaci/${apiary.id}`, formData);
      alert("Apiary successfully updated!");
      onSuccess();
      onHide();
    } catch (error) {
      console.error("Error updating apiary:", error);
      alert("Error updating apiary. Please check your input.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Izmeni pčelinjak</Modal.Title>
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
            Sačuvaj izmene
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
