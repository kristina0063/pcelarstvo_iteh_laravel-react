import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateContext } from '../../context/Context';

export default function Navigation() {
  let {user,setUser, setToken } = useStateContext();

  const onLogout = () => {
    setUser(null);
    setToken(null);
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <span className="navbar-text fw-bold fs-4 text-black">
        Korisnik: {user?.name || 'Nepoznat korisnik'}
      </span>

      <div className="ms-auto">
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}