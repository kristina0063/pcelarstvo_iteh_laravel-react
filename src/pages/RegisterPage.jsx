import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="login_wrapper">
      <div className="login_form">
        <h2>Registracija</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Ime i prezime</Form.Label>
            <Form.Control required type="text" placeholder="Unesite ime i prezime" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="Unesite email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control required type="password" placeholder="Unesite lozinku" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
            <Form.Label>Potvrda lozinke</Form.Label>
            <Form.Control required type="password" placeholder="Potvrdite lozinku" />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Potvrdi
          </Button>
          <p className="mt-3">
            Već imate nalog? <Link className="text-warning" to="/login">Prijavite se</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
