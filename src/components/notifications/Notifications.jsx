import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axios-client";
import { Card, Button, Spinner } from "react-bootstrap";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("notifikacije"); // prilagodi endpoint ako treba
      console.log(response);
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Greška pri učitavanju notifikacija:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axiosClient.post(`notifikacije/${id}`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n
        )
      );
    } catch (error) {
      console.error("Greška pri označavanju kao pročitano:", error);
    }
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <Spinner animation="border" />
      ) : notifications.length === 0 ? (
        <p>Nema notifikacija.</p>
      ) : (
        notifications.map((n) => (
          <Card
            key={n.id}
            className={`mb-3 ${n.read_at ? "bg-light" : "bg-warning-subtle"}`}
          >
            <Card.Body>
              <Card.Title>{n.data.naziv}</Card.Title>
              <Card.Text>
                <strong>Poruka:</strong> {n.data.poruka}
                <br />
                <strong>Status:</strong> {n.data.status}
                <br />
                <strong>Tip:</strong> {n.data.tip}
                <br />
                <strong>Početak:</strong> {n.data.pocetak}
                <br />
                <strong>Kraj:</strong> {n.data.kraj}
              </Card.Text>
              {n.read_at ? (
                <small className="text-success">Pročitano</small>
              ) : (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => markAsRead(n.id)}
                >
                  Pročitano
                </Button>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}
