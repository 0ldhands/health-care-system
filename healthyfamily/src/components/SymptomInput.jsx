import React, { useState } from "react";
import axios from "axios";

export default function SymptomInput({ onSearch }) {
  const [symptoms, setSymptoms] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!symptoms.trim()) return;

    const parsed = symptoms
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (onSearch && typeof onSearch === "function") {
      onSearch(parsed);
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.get(
        "https://healthwise.p.rapidapi.com/disease-symptoms",
        {
          params: { symptoms: symptoms },
          headers: {
            "X-RapidAPI-Key": "81c6b54672msh61822435faf24e4p1c2d41jsn4990ea0168d7",
            "X-RapidAPI-Host": "healthwise.p.rapidapi.com",
          },
        }
      );

      setResults(response.data.diseases || []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="symptoms-input-container">
      <h1>Symptoms Finder </h1>
      <p>Enter your symptoms (comma separated)</p>
      <input
        type="text"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="e.g., fever, headache"
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
        Search
      </button>

      {loading && <p>Searching for possible conditions...⏳ </p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Possible Conditions:</h2>
          <ul>
            {results.map((item, idx) => (
              <li key={idx}>{item.name || item.condition}</li>
            ))}
          </ul>
        </div>
      )}

      {results.length === 0 && !loading && !error && (
        <p>Enter symptoms above and click Search to see possible conditions.</p>
      )}
    </div>
  );
}


