import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

export default function ActivityForm({ onCreate }) {
  const [formData, setFormData] = useState({
    naziv: "",
    opis: "",
    tip: "",
    pocetak: "",
    kraj: "",
    status: "",
    drustvo_id: "",
  });

  const [kosnice, setKosnice] = useState([]);
  const [drustva, setDrustva] = useState([]);

  useEffect(() => {
    const fetchKosnice = async () => {
      try {
        const response = await axiosClient.get("kosnice"); // prilagodi endpoint ako treba
        setKosnice(response.data.data || []);
        console.log(kosnice);
      } catch (error) {
        console.error("Greška pri učitavanju košnica:", error);
      }
    };

    fetchKosnice();
  }, []);

  useEffect(() => {
    const fetchDrustva = async () => {
    try {
      const res = await axiosClient.get("drustva");
      setDrustva(res.data.data);
    } catch (err) {
      console.error("Greška pri dohvatanju društava:", err);
    }
  };

    fetchDrustva();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Naziv</Form.Label>
        <Form.Control
          type="text"
          name="naziv"
          value={formData.naziv}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Opis</Form.Label>
        <Form.Control
          as="textarea"
          name="opis"
          value={formData.opis}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tip</Form.Label>
        <Form.Select
          name="tip"
          value={formData.tip}
          onChange={handleChange}
          required
        >
          <option value="">Odaberite tip</option>
          <option value="SEZONSKA">Sezonska</option>
          <option value="NESEZONSKA">Nesezonska</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Početak</Form.Label>
        <Form.Control
          type="date"
          name="pocetak"
          value={formData.pocetak}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Kraj</Form.Label>
        <Form.Control
          type="date"
          name="kraj"
          value={formData.kraj}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Status</Form.Label>
        <Form.Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Odaberi status</option>
          <option value="PLANIRANA">Planirano</option>
          <option value="U TOKU">U toku</option>
          <option value="ZAVRŠENO">Završeno</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Društvo</Form.Label>
        <Form.Select
          name="drustvo_id"
          value={formData.drustvo_id}
          onChange={handleChange}
          required
        >
          <option value="">Odaberi društvo</option>
          {drustva.map((d) => (
            <option key={d.id} value={d.id}>
              {`#${d.id} - Formirano: ${d.datum_formiranja}`}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Dodaj aktivnost
      </Button>
    </Form>
  );
}
