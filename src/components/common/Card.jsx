import React from "react";

export default function Card({ value, onEdit, onDelete }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between">
        <h5 className="card-title">{value}</h5>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => onEdit()}>
            Izmeni
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete()}>
            Obriši
          </button>
        </div>
      </div>
    </div>
  );
}