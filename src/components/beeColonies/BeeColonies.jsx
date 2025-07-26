import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axios-client";
import Card from "../common/Card";
import EditBeeColonyModal from "./EditBeeColonyModal";
import AddBeeColonyModal from "./AddBeeColonyModal";
import { Button } from "react-bootstrap";

export default function BeeColonies() {
  const [colonies, setColonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColony, setSelectedColony] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Paginacija
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  useEffect(() => {
    fetchColonies();
  }, [selectedColony]);

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
        setCurrentPage(1); // Resetuj na prvu stranu
      } catch (error) {
        console.error("Greška pri brisanju društva:", error);
        alert("Došlo je do greške pri brisanju.");
      }
    }
  };

  // Paginacija - računanje prikazanih kolonija
  const indexOfLastColony = currentPage * itemsPerPage;
  const indexOfFirstColony = indexOfLastColony - itemsPerPage;
  const currentColonies = colonies.slice(indexOfFirstColony, indexOfLastColony);
  const totalPages = Math.ceil(colonies.length / itemsPerPage);

  return (
    <div className="container mt-4">
      {loading && <p>Učitavanje...</p>}
      {!loading && colonies.length === 0 && (
        <p>Nema dostupnih pčelinjih društava.</p>
      )}

      <div>
        {currentColonies.map((colony) => (
          <Card
            key={colony.id}
            value={`ID: ${colony.id} - Košnica: ${colony.kosnica.oznaka}`}
            onEdit={() => handleEdit(colony)}
            onDelete={() => handleDelete(colony)}
          />
        ))}
      </div>

      {/* Paginacija */}
      {!loading && colonies.length > itemsPerPage && (
        <div className="mt-3 d-flex justify-content-center gap-2">
          <Button
            variant="outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prethodna
          </Button>
          <span className="align-self-center">
            Strana {currentPage} od {totalPages}
          </span>
          <Button
            variant="outline-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Sledeća
          </Button>
        </div>
      )}

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
            setCurrentPage(1); // Reset na prvu stranu nakon izmene
            setShowEditModal(false);
          }}
        />
      )}

      <AddBeeColonyModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={() => {
          fetchColonies();
          setCurrentPage(1); // Reset na prvu stranu nakon dodavanja
          setShowAddModal(false);
        }}
      />
    </div>
  );
}
