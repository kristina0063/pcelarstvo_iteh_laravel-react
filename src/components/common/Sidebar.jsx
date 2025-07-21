import React from "react";
import { Nav, Button, Collapse } from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Sidebar = () => { 

  return (
    <div className="sidebar_wrapper">
      <div className="w-100 text-center">
        <Nav
          className="flex-column"
        >
          <Nav.Link as={NavLink} eventKey="aktivnosti" to="/aktivnosti">Aktivnosti</Nav.Link>
          <Nav.Link as={NavLink}  eventKey="pcelinjaci" to="/pcelinjaci">Pčelinjaci</Nav.Link>

          <Nav.Link as={NavLink}  eventKey="kosnice" to="/kosnice">Košnice</Nav.Link>
          <Nav.Link as={NavLink}  eventKey="drustva" to="/drustva">Pčelinja društva</Nav.Link>

          <Nav.Link as={NavLink}  eventKey="notifikacije" to="/notifikacije">Notifikacije</Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
