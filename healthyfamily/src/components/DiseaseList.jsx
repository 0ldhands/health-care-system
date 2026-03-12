import React from "react";

export default function DiseaseList({ diseases }) {
  if (!diseases.length) return <p>No disease matched your symptoms.</p>;

  return (
    <div>
      {diseases.map((disease, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
          <h3>{disease.name}</h3>
          <p><strong>Symptoms:</strong> {disease.symptoms.join(", ")}</p>
          <p><strong>Info:</strong> {disease.info}</p>
        </div>
      ))}
    </div>
  );
}
