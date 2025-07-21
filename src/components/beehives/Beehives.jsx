import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axios-client";
import Card from "../common/Card";
import EditBeehiveModal from "./EditBeehivesModal";
import AddBeehiveModal from "./AddBeehivesModal";
import { Dropdown, DropdownButton, Form, Button } from "react-bootstrap";

export default function Beehives() {
  const [beehives, setBeehives] = useState([]);
  const [selectedBeehive, setSelectedBeehive] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [pcelinjaci, setPcelinjaci] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); // bolje null nego []
  const status = ["AKTIVNA", "NEAKTIVNA"];
  const [tip, setTip] = useState("");
  const [selectedPcelinjak, setSelectedPcelinjak] = useState(null);
  const [param, setParam] = useState("");

  const handlePretraga = () => {
    let temp = [];

    // selectedPcelinjak je sada string naziv, ne objekat sa id - zato pushuj naziv
    if (selectedPcelinjak) {
      temp.push(`pcelinjak=${encodeURIComponent(selectedPcelinjak)}`);
    }
    if (selectedStatus) {
      temp.push(`status=${encodeURIComponent(selectedStatus)}`);
    }
    if (tip && tip.length > 0) {
      temp.push(`tip=${encodeURIComponent(tip)}`);
    }

    const query = temp.length > 0 ? temp.join("&") : "";
    setParam(query);
    fetchBeehives(query); // proslediti query param
  };

  const handleReset = () => {
    setSelectedPcelinjak(null);
    setSelectedStatus(null);
    setTip("");
    setParam("");
    fetchBeehives(); // učitaj sve bez filtera
  };

  // Sada fetchBeehives prima query string i koristi ga u pozivu
  const fetchApiaries = async () => {
    try {
      const response = await axiosClient.get("pcelinjaci");
      setPcelinjaci(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(
        "Došlo je do greške prilikom učitavanja pčelinjaka.",
        error
      );
    }
  };

  const fetchBeehives = async (query = "") => {
    try {
      // Ako postoji query string, dodaj ga
      const url = query ? `kosnice?${query}` : "kosnice";
      const response = await axiosClient.get(url);
      setBeehives(response.data.data);
    } catch (error) {
      console.error("Greška pri učitavanju košnica:", error);
    }
  };

  useEffect(() => {
    fetchBeehives();
    fetchApiaries();
  }, []);

  const handleEdit = (beehive) => {
    setSelectedBeehive(beehive);
    setShowEditModal(true);
  };

  const handleDelete = async (beehive) => {
    if (
      window.confirm(
        `Da li ste sigurni da želite da obrišete košnicu "${beehive.oznaka}"?`
      )
    ) {
      try {
        await axiosClient.delete(`kosnice/${beehive.id}`);
        alert("Košnica je uspešno obrisana.");
        fetchBeehives(param); // osveži sa trenutnim filterom
      } catch (error) {
        console.error("Greška pri brisanju košnice:", error);
        alert("Došlo je do greške pri brisanju.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center gap-3 p-3 border rounded mb-3">
        {/* Dropdown za Pčelinjak */}
        <Form.Select
          value={selectedPcelinjak || ""}
          onChange={(e) => setSelectedPcelinjak(e.target.value || null)}
          style={{ width: "200px" }}
        >
          <option value="">Izaberi pčelinjak</option>
          {pcelinjaci.map((d) => (
            <option key={d.id} value={d.naziv}>
              {d.naziv}
            </option>
          ))}
        </Form.Select>

        {/* Dropdown za Status */}
        <Form.Select
          value={selectedStatus || ""}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          style={{ width: "200px" }}
        >
          <option value="">Izaberi status</option>
          {status.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Form.Select>

        {/* Text input za Tip */}
        <Form.Control
          type="text"
          placeholder="Unesite tip"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          style={{ width: "150px" }}
        />
        <div className="d-flex ms-auto gap-3">
          <Button
            variant="primary"
            onClick={handlePretraga}
            className="ms-auto"
          >
            Pretraga
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleReset}
            className="ms-auto"
          >
            Resetuj
          </Button>
        </div>

        {/* Dugme za pretragu */}
      </div>

      {beehives.length === 0 && <p>Nema dostupnih košnica.</p>}

      <div>
        {beehives.map((k) => (
          <Card
            key={k.id}
            value={k.oznaka}
            onEdit={() => handleEdit(k)}
            onDelete={() => handleDelete(k)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Dodaj novu košnicu
        </Button>
      </div>

      {selectedBeehive && (
        <EditBeehiveModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          beehive={selectedBeehive}
          onSuccess={() => {
            fetchBeehives(param);
            setShowEditModal(false);
          }}
        />
      )}

      <AddBeehiveModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={() => {
          fetchBeehives(param);
          setShowAddModal(false);
        }}
      />
    </div>
  );
}
