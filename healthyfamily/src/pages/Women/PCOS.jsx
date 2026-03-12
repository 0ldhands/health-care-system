import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./women.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function PCOS() {
  const [answers, setAnswers] = useState({
    irregular: false,
    weight: false,
    acne: false,
    hairfall: false,
    facialHair: false,
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pcosHistory")) || [];
    setHistory(saved);
  }, []);

  const handleChange = (key) => setAnswers({ ...answers, [key]: !answers[key] });

  const calculateRisk = () => {
    const score = Object.values(answers).filter(Boolean).length;

    let level = "";
    let suggestion = "";

    if (score <= 1) {
      level = "Low Risk";
      suggestion = "Maintain healthy lifestyle & regular exercise.";
    } else if (score <= 3) {
      level = "Medium Risk";
      suggestion = "Improve diet, reduce sugar, manage stress & monitor cycles.";
    } else {
      level = "High Risk";
      suggestion = "Consult gynecologist. Regular checkups & hormonal tests recommended.";
    }

    const record = {
      date: new Date().toLocaleDateString(),
      score,
      level,
    };

    const updatedHistory = [record, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("pcosHistory", JSON.stringify(updatedHistory));

    setResult({ level, suggestion, score });
  };

  const deleteRecord = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("pcosHistory", JSON.stringify(updatedHistory));
  };

  const deleteAllRecords = () => {
    setHistory([]);
    localStorage.removeItem("pcosHistory");
  };

  // Data for score trend chart
  const scoreData = {
    labels: history.map((h) => h.date).reverse(),
    datasets: [
      {
        label: "Score",
        data: history.map((h) => h.score).reverse(),
        backgroundColor: history
          .map((h) =>
            h.level === "Low Risk"
              ? "#4caf50"
              : h.level === "Medium Risk"
              ? "#ff9800"
              : "#f44336"
          )
          .reverse(),
      },
    ],
  };

  // Data for pie chart
  const riskCounts = { Low: 0, Medium: 0, High: 0 };
  history.forEach((h) => {
    if (h.level === "Low Risk") riskCounts.Low += 1;
    else if (h.level === "Medium Risk") riskCounts.Medium += 1;
    else riskCounts.High += 1;
  });

  const pieData = {
    labels: ["Low Risk", "Medium Risk", "High Risk"],
    datasets: [
      {
        data: [riskCounts.Low, riskCounts.Medium, riskCounts.High],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  return (
   <div>
    <Header/>
     <div className="module-container overflow-auto">
      <h1 style={{margin:"10px"}} className="text-center bg-violet-300 rounded-4xl text-violet-600">PCOS Risk Assessment</h1>

      <div className="question-box">
        {Object.keys(answers).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={answers[key]}
              onChange={() => handleChange(key)}
            />
            {key.replace(/([A-Z])/g, " $1")}
          </label>
        ))}
      </div>

      <button className="action-btn" onClick={calculateRisk}>
        Analyze
      </button>

      {result && (
        <div
          className={`result-card ${result.level.replace(" ", "").toLowerCase()}`}
        >
          <h3>{result.level}</h3>
          <p>Score: {result.score}/5</p>
          <p>{result.suggestion}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="charts-history-container">
          {/* Charts */}
          <div className="charts-container">
            <div className="chart-box small-bar">
              <h5>Score Trend</h5>
              <Bar
                data={scoreData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { beginAtZero: true, max: 5, ticks: { stepSize: 1, font: { size: 10 } } },
                    x: { ticks: { font: { size: 10 } } },
                  },
                }}
                height={260}
                width={300}
              />
            </div>

            <div className="chart-box small-pie">
              <h5>Risk Distribution</h5>
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom", labels: { font: { size: 10 } } } },
                }}
                height={260}
                width={300}
              />
            </div>
          </div>

          {/* History */}
          <div className="history-section">
            <h3>Previous Records</h3>
            <button className="delete-all-btn" onClick={deleteAllRecords}>
              Delete All
            </button>
            {history.map((h, i) => (
              <div key={i} className="history-card">
                <div className="history-info">
                  <span className="level">{h.level}</span>
                  <span className="score">Score: {h.score}</span>
                  <span className="date">{h.date}</span>
                </div>
                <button className="delete-btn" onClick={() => deleteRecord(i)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    <Footer/>
   </div>
  );
}