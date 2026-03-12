import { useState, useEffect } from "react";
import "./Bmi.css";

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Bmi() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [cm, setCm] = useState("");
  const [kg, setKg] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [allData, setAllData] = useState([]);
  const [error, setError] = useState("");

  const calculateBMI = () => {
    setError("");

    if (!cm || !kg) {
      setError("Please fill all fields!");
      return;
    }

    const height = parseFloat(cm) / 100;
    const weight = parseFloat(kg);
    const a = parseInt(age, 10);

    if (height <= 0 || weight <= 0 || a <= 0) {
      setError("Enter valid positive values for age, height and weight!");
      return;
    }

    const bmi = weight / (height * height);

    let status, type;
    if (bmi < 18.5)      { status = "Underweight"; type = "low";     }
    else if (bmi < 25)   { status = "Normal";      type = "normal";  }
    else if (bmi < 30)   { status = "Overweight";  type = "warning"; }
    else                 { status = "Obese";        type = "high";    }

    // BMR — Mifflin-St Jeor
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * (height * 100) - 5 * a + 5;
    } else {
      bmr = 10 * weight + 6.25 * (height * 100) - 5 * a - 161;
    }

    const factors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very: 1.9 };
    const calories = Math.round(bmr * (factors[activityLevel] || 1));

    const bmiResult = {
      bmi: parseFloat(bmi.toFixed(2)),
      status,
      type,
      healthyRange: "18.5 - 24.9",
      bmr: Math.round(bmr),
      calories,
    };

    setResult(bmiResult);
    saveCalculation(
      { age: parseInt(age, 10), gender, height: parseFloat(cm), weight: parseFloat(kg), activityLevel },
      bmiResult
    );
  };

  const clearAll = () => {
    setCm("");
    setKg("");
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

  // Badge component — same color meaning as .normal/.warning/.high/.low
  const Badge = ({ type, text }) => {
    if (!text || text === '-') return <span className="badge-neutral">—</span>;
    return <span className={`badge badge-${type}`}>{text}</span>;
  };

  // Map activity value → readable label
  const activityLabel = {
    sedentary: 'Sedentary',
    light:     'Light',
    moderate:  'Moderate',
    active:    'Active',
    very:      'Very Active',
  };

  // Resolve badge type from status text
  const statusType = (status) => {
    if (!status) return null;
    const map = { Underweight: 'low', Normal: 'normal', Overweight: 'warning', Obese: 'high' };
    return map[status] || null;
  };

  return (
    <div className="calc-card">
      <h3 className="bmi-title">BMI Calculator</h3>

      {error && <p className="error">{error}</p>}

      <label>Age</label>
      <input type="number" placeholder="Eg: 25" value={age} onChange={(e) => setAge(e.target.value)} />

     {/* ── GENDER ── */}
      <label>Gender</label>
      <div className="toggle-group">
        {[
          { value: 'male',   label: '♂ Male'   },
          { value: 'female', label: '♀ Female' },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`toggle-btn ${gender === opt.value ? 'toggle-active' : ''}`}
            onClick={() => setGender(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── ACTIVITY LEVEL ── */}
      <label>Activity Level</label>
      <div className="toggle-group toggle-group--wrap">
        {[
          { value: 'sedentary', label: '🪑 Sedentary'   },
          { value: 'light',     label: '🚶 Light'        },
          { value: 'moderate',  label: '🏃 Moderate'     },
          { value: 'active',    label: '💪 Active'       },
          { value: 'very',      label: '🔥 Very Active'  },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`toggle-btn ${activityLevel === opt.value ? 'toggle-active' : ''}`}
            onClick={() => setActivityLevel(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <label>Height (cm)</label>
      <input type="number" placeholder="Eg: 170" value={cm} onChange={(e) => setCm(e.target.value)} />

      <label>Weight (kg)</label>
      <input type="number" placeholder="Eg: 65" value={kg} onChange={(e) => setKg(e.target.value)} />

      <div className="btn-group">
        <button onClick={calculateBMI}>Calculate</button>
        <button className="clear-btn" onClick={clearAll}>Clear</button>
      </div>

      {result && (
        <div className="result-box">
          <p><strong>BMI:</strong> {result.bmi}</p>
          <p className={result.type}><strong>Status:</strong> {result.status}</p>
          <p><strong>Healthy Range:</strong> {result.healthyRange}</p>
          {result.bmr     && <p><strong>BMR:</strong> {result.bmr} kcal/day</p>}
          {result.calories && <p><strong>Calories (est.):</strong> {result.calories} kcal/day</p>}
          <div className="bmi-bar">
            <div
              className={`bmi-progress ${result.type}`}
              style={{ width: `${Math.min(result.bmi * 2, 100)}%` }}
            />
          </div>
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
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Activity</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>BMI</th>
                  <th>Status</th>
                  <th>BMR</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {history.map((rec, idx) => (
                  <tr key={idx}>
                    <td className="td-date">{new Date(rec.createdAt).toLocaleString()}</td>
                    <td className="td-val">{rec.input.age        || '—'}</td>
                    <td className="td-val" style={{ textTransform: 'capitalize' }}>{rec.input.gender || '—'}</td>
                    <td className="td-val">{activityLabel[rec.input.activityLevel] || rec.input.activityLevel || '—'}</td>
                    <td className="td-val">{rec.input.height ? `${rec.input.height} cm` : '—'}</td>
                    <td className="td-val">{rec.input.weight ? `${rec.input.weight} kg` : '—'}</td>
                    <td className="td-val td-bmi">{rec.result?.bmi ?? '—'}</td>
                    <td>
                      <Badge
                        type={statusType(rec.result?.status)}
                        text={rec.result?.status}
                      />
                    </td>
                    <td className="td-val">{rec.result?.bmr     ? `${rec.result.bmr} kcal`     : '—'}</td>
                    <td className="td-val">{rec.result?.calories ? `${rec.result.calories} kcal` : '—'}</td>
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
                  <th>Height</th>
                  <th>Weight</th>
                  <th>BMI</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((rec, idx) => (
                  <tr key={idx}>
                    <td className="td-date">{new Date(rec.createdAt).toLocaleString()}</td>
                    <td className="td-val">{rec.input.height ? `${rec.input.height} cm` : '—'}</td>
                    <td className="td-val">{rec.input.weight ? `${rec.input.weight} kg` : '—'}</td>
                    <td className="td-val td-bmi">{rec.result?.bmi ?? '—'}</td>
                    <td>
                      <Badge
                        type={statusType(rec.result?.status)}
                        text={rec.result?.status}
                      />
                    </td>
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