import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useStateContext } from "../context/Context";
import axiosClient from "../axios/axios-client";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState('');
  const { setUser, setToken } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post("/login", { email, password });
      setUser(response.data);
      setToken(response.data.token);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login_wrapper">
      <div className="login_form">
        <h2>Prijava</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Unesite email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Unesite lozinku"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>          
          <Button className="w-100" variant="primary" type="submit">
            Potvrdi
          </Button>
          <p className="mt-3">
            Nemate nalog? <Link className="text-warning" to="/register">Registrujte se</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
