import React, { useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  Form,
  Row,
  Col,
  Alert,
  Button,
} from "react-bootstrap";
import ActivityCalendar from "./ActivityCalendar";
import ActivityForm from "./ActivityForm";
import CommentSuggestionModal from "./CommentSuggestionModal";
import axiosClient from "../../axios/axios-client";
import ApiCarousel from "../api/ApiCarousel";
import { useStateContext } from "../../context/Context";

export const Activities = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [activityData, setActivityData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("komentar");
  const [selectedAktivnostId, setSelectedAktivnostId] = useState(null);

  const [selectedTip, setSelectedTip] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDrustvo, setSelectedDrustvo] = useState(null);
  const [drustva, setDrustva] = useState([]);
  const [filterParam, setFilterParam] = useState("");

  const { user } = useStateContext();

  const toLocalDateString = (date) => date.toLocaleDateString("sv-SE"); // YYYY-MM-DD u lokalnom vremenu

  const fetchAktivnosti = async (query = "") => {
    try {
      const url = query ? `aktivnosti?${query}` : "aktivnosti";
      const response = await axiosClient.get(url);
      const data = response.data.data;
      setActivityData(data);
      const datumi = data.map((a) => toLocalDateString(new Date(a.pocetak)));
      setActivities(datumi);
    } catch (err) {
      console.error("Greška pri dohvatanju aktivnosti", err);
    }
  };

  const fetchDrustva = async () => {
    try {
      const res = await axiosClient.get("drustva");
      setDrustva(res.data.data);
    } catch (err) {
      console.error("Greška pri dohvatanju društava:", err);
    }
  };

  const handlePretraga = () => {
    let temp = [];

    if (selectedTip) temp.push(`tip=${selectedTip}`);
    if (selectedStatus) temp.push(`status=${selectedStatus}`);
    if (selectedDrustvo) temp.push(`drustvo_id=${selectedDrustvo}`);

    const query = temp.length > 0 ? temp.join("&") : "";
    setFilterParam(query);
    fetchAktivnosti(query);
  };

  const handleReset = () => {
    setSelectedTip(null);
    setSelectedStatus(null);
    setSelectedDrustvo(null);
    setFilterParam("");
    fetchAktivnosti();
  };

  useEffect(() => {
    fetchAktivnosti();
    fetchDrustva();
  }, []);

  const selectedDateStr = toLocalDateString(selectedDate);

  const filteredActivities = activityData.filter((x) => {
    const activityDate = toLocalDateString(new Date(x.pocetak));
    return activityDate === selectedDateStr;
  });

  const downloadComment = async (id) => {
    try {
      const response = await axiosClient(`download/${id}`);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `komentar_${id}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download greška:", error);
    }
  };

  const handleCreateActivity = async (formData) => {
    try {
      var response;
      if (user.role !== "admin") {
        response = await axiosClient.post("aktivnosti", formData);
      } else {
        response = await axiosClient.post("createActivities", formData);
        alert("Aktivnost uspešno kreirana!");
        return;
      }
      alert("Aktivnost uspešno kreirana!");
      setActivityData((prev) => [...prev, response.data.model]);
      const datumStr = toLocalDateString(new Date(formData.pocetak));
      if (!activities.includes(datumStr)) {
        setActivities((prev) => [...prev, datumStr]);
      }
    } catch (error) {
      console.error("Greška pri dodavanju aktivnosti:", error);
      alert("Greška pri dodavanju aktivnosti. Proveri unos.");
    }
  };

  const handleOpenModal = (type, aktivnostId) => {
    setModalType(type);
    setSelectedAktivnostId(aktivnostId);
    setShowModal(true);
  };

  return (
    <div className="activity-wrapper">
      <Row className="p-4 w-100">
        <Col md={6} sm={12}>
          <Card>
            <Card.Header>Kalendar aktivnosti</Card.Header>
            <Card.Body>
              <ActivityCalendar
                selectedDate={selectedDate}
                onChange={setSelectedDate}
                activities={activities}
              />
            </Card.Body>
          </Card>

          <Card className="mt-2">
            <Card.Header>Nova aktivnost</Card.Header>
            <Card.Body>
              <ActivityForm onCreate={handleCreateActivity} />
            </Card.Body>
          </Card>

          <ApiCarousel />
        </Col>

        <Col md={6} sm={12}>
          <div className="mb-3 border rounded p-3 d-flex flex-wrap gap-3">
            <Form.Select
              value={selectedTip || ""}
              onChange={(e) => setSelectedTip(e.target.value || null)}
              style={{ width: "200px" }}
            >
              <option value="">Izaberi tip</option>
              <option value="SEZONSKA">SEZONSKA</option>
              <option value="NESEZONSKA">NESEZONSKA</option>
            </Form.Select>

            <Form.Select
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              style={{ width: "200px" }}
            >
              <option value="">Izaberi status</option>
              <option value="PLANIRANA">PLANIRANA</option>
              <option value="U TOKU">U TOKU</option>
              <option value="ZAVRSENA">ZAVRSENA</option>
            </Form.Select>

            <Form.Select
              value={selectedDrustvo || ""}
              onChange={(e) => setSelectedDrustvo(e.target.value || null)}
              style={{ width: "200px" }}
            >
              <option value="">Izaberi društvo</option>
              {drustva.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.id}
                </option>
              ))}
            </Form.Select>

            <div className="d-flex gap-3">
              <Button variant="primary" onClick={handlePretraga}>
                Pretraga
              </Button>
              <Button variant="outline-secondary" onClick={handleReset}>
                Resetuj
              </Button>
            </div>
          </div>

          {filteredActivities.length === 0 && (
            <Alert variant="warning">Nema aktivnosti za izabrani dan.</Alert>
          )}

          {filteredActivities.map((x, y) => (
            <Card key={y} className="mb-3">
              <Card.Header>Detalji aktivnosti</Card.Header>
              <Card.Body>
                <p>
                  <strong>Naziv:</strong> {x.naziv}
                </p>
                <p>
                  <strong>Opis:</strong> {x.opis}
                </p>
                <p>
                  <strong>Tip:</strong> {x.tip}
                </p>
                <p>
                  <strong>Početak:</strong> {x.pocetak}
                </p>
                <p>
                  <strong>Kraj:</strong> {x.kraj}
                </p>
                <p>
                  <strong>Status:</strong> {x.status}
                </p>

                <hr />
                <h6>Komentari:</h6>
                <ListGroup className="mb-2">
                  {x.komentars?.map((kom, idx) => (
                    <React.Fragment key={idx}>
                      <ListGroup.Item>{kom.sadrzaj}</ListGroup.Item>
                      <ListGroup.Item variant="light">
                        {kom.datum}
                      </ListGroup.Item>
                      <Button
                        className="w-25 m-2"
                        onClick={() => downloadComment(kom.id)}
                      >
                        Preuzmi
                      </Button>
                    </React.Fragment>
                  ))}
                </ListGroup>

                <h6>Sugestije:</h6>
                <ListGroup>
                  {x.sugestijas?.map((sug, idx) => (
                    <React.Fragment key={idx}>
                      <ListGroup.Item>{sug.poruka}</ListGroup.Item>
                      <ListGroup.Item variant="light">
                        {sug.datum_kreiranja}
                      </ListGroup.Item>
                    </React.Fragment>
                  ))}
                </ListGroup>

                <div className="mt-3 d-flex gap-2">
                  {user.role === "pcelar" && (
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleOpenModal("komentar", x.id)}
                    >
                      Dodaj komentar
                    </Button>
                  )}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleOpenModal("sugestija", x.id)}
                  >
                    Dodaj sugestiju
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      <CommentSuggestionModal
        show={showModal}
        onHide={() => setShowModal(false)}
        type={modalType}
        aktivnostId={selectedAktivnostId}
        onSuccess={() => fetchAktivnosti(filterParam)}
      />
    </div>
  );
};
