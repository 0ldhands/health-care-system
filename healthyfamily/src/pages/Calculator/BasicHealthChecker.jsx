import { useState, useEffect } from "react";
import "./Checker.css";

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function BasicHealthChecker() {
  const [sugar, setSugar] = useState("");
  const [sysBP, setSysBP] = useState("");
  const [diaBP, setDiaBP] = useState("");
  const [temp, setTemp] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [allData, setAllData] = useState([]);
  const [error, setError] = useState("");

  const checkHealth = () => {
    let feedback = {};
    setError("");

    if (!sugar && !sysBP && !diaBP && !temp) {
      setError("Please enter at least one value!");
      return;
    }

    const s = parseFloat(sugar);
    const sys = parseFloat(sysBP);
    const dia = parseFloat(diaBP);
    const t = parseFloat(temp);

    // 🩸 Blood Sugar
    if (sugar) {
      if (s < 70) feedback.sugar = { text: "Low Blood Sugar", type: "low" };
      else if (s <= 99) feedback.sugar = { text: "Normal Blood Sugar", type: "normal" };
      else if (s <= 125) feedback.sugar = { text: "Pre-Diabetic Range", type: "warning" };
      else feedback.sugar = { text: "High Blood Sugar", type: "high" };
    }

    // ❤️ Blood Pressure
    if (sysBP && diaBP) {
      if (sys < 120 && dia < 80)
        feedback.bp = { text: "Normal Blood Pressure", type: "normal" };
      else if (sys < 140 || dia < 90)
        feedback.bp = { text: "Elevated Blood Pressure", type: "warning" };
      else feedback.bp = { text: "High Blood Pressure", type: "high" };
    }

    // 🌡 Temperature
    if (temp) {
      if (t < 36) feedback.temp = { text: "Below Normal Temperature", type: "low" };
      else if (t <= 37.5) feedback.temp = { text: "Normal Temperature", type: "normal" };
      else feedback.temp = { text: "Fever Detected", type: "high" };
    }

    setResult(feedback);
    saveCalculation({ sugar: s, sysBP: sys, diaBP: dia, temp: t }, feedback);
  };

  const clearAll = () => {
    setSugar("");
    setSysBP("");
    setDiaBP("");
    setTemp("");
    setResult(null);
    setError("");
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/calculator/history`, { credentials: 'include' });
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const fetchAll = async () => {
    try {
      const res = await fetch(`${API_URL}/api/calculator/all`, { credentials: 'include' });
      const data = await res.json();
      setAllData(data);
    } catch (err) {
      console.error('Failed to fetch all data', err);
    }
  };

  async function saveCalculation(input, result) {
    try {
      await fetch(`${API_URL}/api/calculator/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ input, result })
      });
    } catch (err) {
      console.error('Failed to save calculation', err);
    }
  }

  // helper — maps type string → badge element
  const Badge = ({ type, text }) => {
    if (!text || text === '-') return <span className="badge-neutral">—</span>;
    return <span className={`badge badge-${type}`}>{text}</span>;
  };

  return (
    <div className="card">
      <h3 className="checker-title">Basic Health Check</h3>
      <p className="disclaimer">Educational purpose only. Not a medical diagnosis.</p>

      {error && <p className="error">{error}</p>}

      <label>Blood Sugar (mg/dL)</label>
      <input
        type="number"
        value={sugar}
        onChange={(e) => setSugar(e.target.value)}
        placeholder="Eg: 95"
      />

      <label>Blood Pressure (mmHg)</label>
      <div className="bp-row">
        <input
          type="number"
          placeholder="Systolic"
          value={sysBP}
          onChange={(e) => setSysBP(e.target.value)}
        />
        <input
          type="number"
          placeholder="Diastolic"
          value={diaBP}
          onChange={(e) => setDiaBP(e.target.value)}
        />
      </div>

      <label>Body Temperature (°C)</label>
      <input
        type="number"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        placeholder="Eg: 36.8"
      />

      <div className="btn-group">
        <button onClick={checkHealth}>Check</button>
        <button className="clear-btn" onClick={clearAll}>Clear</button>
      </div>

      {result && (
        <div className="result">
          {result.sugar && <p className={result.sugar.type}>🩸 {result.sugar.text}</p>}
          {result.bp    && <p className={result.bp.type}>❤️ {result.bp.text}</p>}
          {result.temp  && <p className={result.temp.type}>🌡 {result.temp.text}</p>}
        </div>
      )}

      {/* ── HISTORY TABLE ── */}
      {history.length > 0 && (
        <div className="history-table">
          <h4>Calculation History</h4>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>🩸 Sugar</th>
                  <th>❤️ Sys</th>
                  <th>❤️ Dia</th>
                  <th>🌡 Temp</th>
                  <th>Sugar Result</th>
                  <th>BP Result</th>
                  <th>Temp Result</th>
                </tr>
              </thead>
              <tbody>
                {history.map((rec, idx) => (
                  <tr key={idx}>
                    <td className="td-date">
                      {new Date(rec.createdAt).toLocaleString()}
                    </td>
                    <td className="td-val">{isNaN(rec.input.sugar) ? '—' : rec.input.sugar}</td>
                    <td className="td-val">{isNaN(rec.input.sysBP) ? '—' : rec.input.sysBP}</td>
                    <td className="td-val">{isNaN(rec.input.diaBP) ? '—' : rec.input.diaBP}</td>
                    <td className="td-val">{isNaN(rec.input.temp)  ? '—' : rec.input.temp}</td>
                    <td><Badge type={rec.result?.sugar?.type} text={rec.result?.sugar?.text} /></td>
                    <td><Badge type={rec.result?.bp?.type}    text={rec.result?.bp?.text} /></td>
                    <td><Badge type={rec.result?.temp?.type}  text={rec.result?.temp?.text} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button className="load-all-btn" onClick={fetchAll}>Load all records</button>

      {/* ── ALL DATA TABLE ── */}
      {allData.length > 0 && (
        <div className="history-table">
          <h4>All Calculations</h4>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>🩸 Sugar</th>
                  <th>❤️ Sys</th>
                  <th>❤️ Dia</th>
                  <th>🌡 Temp</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((rec, idx) => (
                  <tr key={idx}>
                    <td className="td-date">
                      {new Date(rec.createdAt).toLocaleString()}
                    </td>
                    <td className="td-val">{isNaN(rec.input.sugar) ? '—' : rec.input.sugar}</td>
                    <td className="td-val">{isNaN(rec.input.sysBP) ? '—' : rec.input.sysBP}</td>
                    <td className="td-val">{isNaN(rec.input.diaBP) ? '—' : rec.input.diaBP}</td>
                    <td className="td-val">{isNaN(rec.input.temp)  ? '—' : rec.input.temp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}