import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

export default function EditBeehiveModal({ show, onHide, beehive, onSuccess }) {
  const [formData, setFormData] = useState({
    oznaka: "",
    tip: "",
    status: "aktivna",
    pcelinjak_id: "",
  });

  const [apiaries, setApiaries] = useState([]);

  useEffect(() => {
    const fetchApiaries = async () => {
      try {
        const response = await axiosClient.get("pcelinjaci");
        setApiaries(response.data.data);
      } catch (error) {
        console.error("Greška pri učitavanju pčelinjaka:", error);
      }
    };

    if (show) {
      fetchApiaries();
    }
  }, [show]);

  useEffect(() => {
    if (beehive) {
      setFormData({
        oznaka: beehive.oznaka || "",
        tip: beehive.tip || "",
        status: beehive.status || "aktivna",
        pcelinjak_id: beehive.pcelinjak_id || "",
      });
    }
  }, [beehive]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`kosnice/${beehive.id}`, formData);
      alert("Beehive successfully updated!");
      onSuccess();
      onHide();
    } catch (error) {
      console.error("Error updating beehive:", error);
      alert("Error updating beehive. Please check your input.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Izmeni košnicu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formOznaka">
            <Form.Label>Oznaka</Form.Label>
            <Form.Control
              type="text"
              name="oznaka"
              value={formData.oznaka}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTip">
            <Form.Label>Tip</Form.Label>
            <Form.Control
              type="text"
              name="tip"
              value={formData.tip}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="aktivna">AKTIVNA</option>
              <option value="neaktivna">NEAKTIVNA</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPcelinjakId">
            <Form.Label>Apiary</Form.Label>
            <Form.Select
              name="pcelinjak_id"
              value={formData.pcelinjak_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Izaberite pčelinjak --</option>
              {apiaries.map((apiary) => (
                <option key={apiary.id} value={apiary.id}>
                  {apiary.naziv}
                </option>
              ))}
            </Form.Select>
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
