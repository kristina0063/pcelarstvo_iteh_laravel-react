import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

const strengthOptions = ["jako", "slabo", "srednje"];

export default function AddBeeColonyModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    kosnica_id: "",
    matica_starost: 0,
    jacina: "jako",
    datum_formiranja: "",
  });

  const [beehives, setBeehives] = useState([]);

  useEffect(() => {
    if (show) {
      axiosClient
        .get("kosnice")
        .then((res) => setBeehives(res.data.data || []))
        .catch((err) => console.error("Greška pri učitavanju košnica:", err));
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "matica_starost" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("drustva", formData);
      alert("Pčelinje društvo uspešno dodato!");
      onSuccess();
      onHide();
      setFormData({
        kosnica_id: "",
        matica_starost: 0,
        jacina: "jako",
        datum_formiranja: "",
      });
    } catch (error) {
      console.error("Greška pri dodavanju društva:", error);
      alert("Greška pri dodavanju društva, proverite unete podatke.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj novo pčelinje društvo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formKosnica" className="mb-3">
            <Form.Label>Košnica</Form.Label>
            <Form.Select
              name="kosnica_id"
              value={formData.kosnica_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Izaberite košnicu --</option>
              {beehives.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.oznaka}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formMaticaStarost" className="mb-3">
            <Form.Label>Starost matice (godine)</Form.Label>
            <Form.Control
              type="number"
              min={0}
              name="matica_starost"
              value={formData.matica_starost}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formJacina" className="mb-3">
            <Form.Label>Jačina društva</Form.Label>
            <Form.Select
              name="jacina"
              value={formData.jacina}
              onChange={handleChange}
              required
            >
              {strengthOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formDatumFormiranja" className="mb-3">
            <Form.Label>Datum formiranja</Form.Label>
            <Form.Control
              type="date"
              name="datum_formiranja"
              value={formData.datum_formiranja}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Odustani
          </Button>
          <Button variant="primary" type="submit">
            Dodaj društvo
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
