import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axios-client";
import Card from "../common/Card";
import EditBeeColonyModal from "./EditBeeColonyModal";
import AddBeeColonyModal from "./AddBeeColonyModal";
import { Button, Form } from "react-bootstrap";

export default function BeeColonies() {
  const [colonies, setColonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColony, setSelectedColony] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [beehives, setBeehives] = useState([]);
  const [selectedBeehiveId, setSelectedBeehiveId] = useState("");

  // Učitaj društva
  const fetchColonies = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("drustva");
      setColonies(response.data.data || []);
    } catch (error) {
      console.error("Greška pri učitavanju društava:", error);
      setColonies([]);
    }
    setLoading(false);
  };

  // Učitaj kosnice
  const fetchBeehives = async () => {
    try {
      const response = await axiosClient.get("kosnice");
      setBeehives(response.data.data || []);
    } catch (error) {
      console.error("Greška pri učitavanju košnica:", error);
    }
  };

  useEffect(() => {
    fetchColonies();
    fetchBeehives();
  }, []);

  const handleEdit = (colony) => {
    setSelectedColony(colony);
    setShowEditModal(true);
  };

  const handleDelete = async (colony) => {
    if (
      window.confirm(
        `Da li ste sigurni da želite da obrišete pčelinje društvo ID: ${colony.id}?`
      )
    ) {
      try {
        await axiosClient.delete(`drustva/${colony.id}`);
        alert("Pčelinje društvo uspešno obrisano.");
        fetchColonies();
      } catch (error) {
        console.error("Greška pri brisanju društva:", error);
        alert("Došlo je do greške pri brisanju.");
      }
    }
  };

  const handleSearch = () => {
    // Ovdje implementiraš filtriranje po selectedBeehiveId
    console.log("Izabrana košnica ID:", selectedBeehiveId);
  };

  return (
    <div className="container mt-4">
      {/* FILTER BAR */}
      <div className="mb-3 border rounded p-3 d-flex flex-wrap gap-3">
        <Form.Select
          value={selectedBeehiveId}
          onChange={(e) => setSelectedBeehiveId(e.target.value)}
          style={{ maxWidth: "300px" }}
        >
          <option value="">-- Izaberite košnicu --</option>
          {beehives.map((b) => (
            <option key={b.id} value={b.id}>
              {b.oznaka}
            </option>
          ))}
        </Form.Select>
        <Button variant="primary" onClick={handleSearch} className="ms-auto">
          Pretraži
        </Button>
      </div>

      {loading && <p>Učitavanje...</p>}
      {!loading && colonies.length === 0 && (
        <p>Nema dostupnih pčelinjih društava.</p>
      )}
      <div>
        {colonies.map((colony) => (
          <Card
            key={colony.id}
            value={`ID: ${colony.id} - Košnica: ${colony.kosnica.oznaka}`}
            onEdit={() => handleEdit(colony)}
            onDelete={() => handleDelete(colony)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Dodaj novo društvo
        </Button>
      </div>

      {selectedColony && (
        <EditBeeColonyModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          colony={selectedColony}
          onSuccess={() => {
            fetchColonies();
            setShowEditModal(false);
          }}
        />
      )}

      <AddBeeColonyModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={() => {
          fetchColonies();
          setShowAddModal(false);
        }}
      />
    </div>
  );
}
