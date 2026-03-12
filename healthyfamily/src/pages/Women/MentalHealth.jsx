import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./women.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MentalHealth() {
  const [answers, setAnswers] = useState({
    stress: 0,
    anxiety: 0,
    sleep: 0,
    mood: 0,
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mentalHistory")) || [];
    setHistory(saved);
  }, []);

  const handleChange = (key, value) => setAnswers({ ...answers, [key]: Number(value) });

  const calculate = () => {
    const score = Object.values(answers).reduce((a, b) => a + b, 0);

    let level, suggestion;
    if (score <= 4) {
      level = "Calm";
      suggestion = "Good mental balance. Maintain healthy routine.";
    } else if (score <= 7) {
      level = "Mild Stress";
      suggestion = "Try breathing, yoga & reduce screen time.";
    } else {
      level = "High Stress";
      suggestion = "Consult professional. Practice mindfulness daily.";
    }

    const record = {
      date: new Date().toLocaleDateString(),
      score,
      level,
    };

    const updated = [record, ...history];
    setHistory(updated);
    localStorage.setItem("mentalHistory", JSON.stringify(updated));
    setResult({ level, score, suggestion });
  };

  const deleteRecord = (index) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem("mentalHistory", JSON.stringify(updated));
  };

  const deleteAllRecords = () => {
    setHistory([]);
    localStorage.removeItem("mentalHistory");
  };

  const chartData = {
    labels: history.map((h) => h.date).reverse(),
    datasets: [
      {
        label: "Stress Score",
        data: history.map((h) => h.score).reverse(),
        fill: true,
        backgroundColor: "rgba(233, 30, 99, 0.2)",
        borderColor: "#e91e63",
        tension: 0.4,
      },
    ],
  };

  return (
   <div>
    <Header/>
     <div className="module-container overflow-auto">
      <h1 style={{margin:"10px"}} className="text-center bg-violet-300 rounded-4xl text-violet-600">Mental Health Assessment</h1>

      {/* QUESTIONS */}
      {[
        { key: "stress", label: "Stress level today" },
        { key: "anxiety", label: "Anxiety level" },
        { key: "sleep", label: "Sleep quality" },
        { key: "mood", label: "Mood stability" },
      ].map((q) => (
        <div key={q.key} className="question-row">
          <label>{q.label}</label>
          <input
            type="range"
            min="0"
            max="3"
            onChange={(e) => handleChange(q.key, e.target.value)}
          />
        </div>
      ))}

      <button className="action-btn" onClick={calculate}>
        Analyze Mind
      </button>

      {/* RESULT */}
      {result && (
        <div className={`result-card ${result.level.replace(" ", "").toLowerCase()}`}>
          <h3>{result.level}</h3>
          <p>Score: {result.score}/12</p>
          <p>{result.suggestion}</p>

          {result.level !== "Calm" && (
            <div className="breathing-box">
              <h4>🌬 Breathing Exercise</h4>
              <p>Inhale 4 sec → Hold 4 sec → Exhale 6 sec</p>
            </div>
          )}
        </div>
      )}

      {/* CHART */}
      {history.length > 1 && (
        <div className="chart-box">
          <h3>Stress Trend</h3>
          <Line data={chartData} />
        </div>
      )}

      {/* HISTORY */}
      <div className="history-section">
        <h3>Wellness Records</h3>
        {history.length > 0 && (
          <button className="delete-all-btn" onClick={deleteAllRecords}>
            Delete All
          </button>
        )}
        {history.length === 0 && <p>No records yet</p>}

        {history.map((h, i) => (
          <div key={i} className="history-card">
            <div className="history-info">
              <span>{h.date}</span>
              <span>{h.level}</span>
              <span>{h.score}</span>
            </div>
            <button className="delete-btn" onClick={() => deleteRecord(i)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
   </div>
  );
}