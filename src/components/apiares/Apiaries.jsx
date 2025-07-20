import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axios-client";
import Card from "../common/Card";
import EditApiaryModal from "./EditApiaryModal";
import { Button, Form } from "react-bootstrap";
import AddApiaryModal from "./AddApiaryModal";

export default function Apiaries() {
  const [apiaries, setApiaries] = useState([]);
  const [selectedApiary, setSelectedApiary] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [location, setLocation] = useState("");
  const [param, setParam] = useState("");

  const fetchApiaries = async (query = "") => {
    try {
      const url = query ? `pcelinjaci?${query}` : `pcelinjaci`;
      const response = await axiosClient.get(url);
      setApiaries(response.data.data);
    } catch (error) {
      console.error(
        "Došlo je do greške prilikom učitavanja pčelinjaka.",
        error
      );
    }
  };

  const handlePretraga = () => {
    let temp = [];

    if (location && location.trim() !== "") {
      temp.push(`lokacija=${encodeURIComponent(location.trim())}`);
    }

    const query = temp.length > 0 ? temp.join("&") : "";
    setParam(query);
    fetchApiaries(query);
  };

  const handleReset = () => {
    setLocation("");
    setParam("");
    fetchApiaries(); // učitaj sve bez filtera
  };

  useEffect(() => {
    fetchApiaries();
  }, []);

  const handleEdit = (apiary) => {
    setSelectedApiary(apiary);
    setShowEditModal(true);
  };

  const handleDelete = async (apiary) => {
    if (
      window.confirm(
        `Da li ste sigurni da želite da obrišete pčelinjak "${apiary.naziv}"?`
      )
    ) {
      try {
        await axiosClient.delete(`pcelinjaci/${apiary.id}`);
        alert("Pčelinjak je uspešno obrisan.");
        fetchApiaries(param); // osveži sa aktivnim filterom
      } catch (error) {
        console.error("Greška prilikom brisanja pčelinjaka:", error);
        alert("Došlo je do greške prilikom brisanja.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center gap-3 p-3 border rounded mb-3">
        {/* Input za lokaciju */}
        <Form.Control
          type="text"
          placeholder="Unesite lokaciju"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "200px" }}
        />

        <div className="ms-auto gap-3 d-flex">
          <Button variant="primary" onClick={handlePretraga}>
            Pretraga
          </Button>
          <Button variant="outline-secondary" onClick={handleReset}>
            Resetuj
          </Button>
        </div>
      </div>

      {apiaries.length === 0 && <p>Nema dostupnih pčelinjaka.</p>}
      <div>
        {apiaries.map((p) => (
          <Card
            key={p.id}
            value={p.naziv}
            onEdit={() => handleEdit(p)}
            onDelete={() => handleDelete(p)}
          />
        ))}
      </div>

      {selectedApiary && (
        <EditApiaryModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          apiary={selectedApiary}
          onSuccess={() => {
            fetchApiaries(param);
            setShowEditModal(false);
          }}
        />
      )}

      <div className="mt-4">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Dodaj novi pčelinjak
        </Button>
      </div>

      <AddApiaryModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={() => {
          fetchApiaries(param);
          setShowAddModal(false);
        }}
      />
    </div>
  );
}
