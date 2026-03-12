import { useState, useEffect } from "react";
import "./women.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Menstrual() {
  const [lastDate, setLastDate] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [periodGraph, setPeriodGraph] = useState([]);
  const [history, setHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load history
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("menstrualHistory")) || [];
    setHistory(saved);
  }, []);

  // Generate month days without mutating start date
  const generateMonthDays = (start, days) => {
    const arr = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(start.getTime());
      d.setDate(d.getDate() + i);
      arr.push(d);
    }
    return arr;
  };

  const calculateGraph = () => {
    if (!lastDate || !cycleLength) return;

    let start = new Date(lastDate);
    const graph = [];

    for (let i = 0; i < 3; i++) {
      const periodStart = new Date(start);
      const periodDays = 5;
      const ovulation = new Date(start);
      ovulation.setDate(ovulation.getDate() + Number(cycleLength) - 14);

      const fertileStart = new Date(ovulation);
      fertileStart.setDate(fertileStart.getDate() - 3);
      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(ovulation.getDate() + 3);

      graph.push({ periodStart, periodDays, ovulation, fertileStart, fertileEnd });

      start.setDate(start.getDate() + Number(cycleLength));
    }

    setPeriodGraph(graph);

    // Save to history
    const record = {
      lastDate,
      cycleLength,
      date: new Date().toLocaleDateString(),
    };

    if (editingIndex !== null) {
      const updatedHistory = [...history];
      updatedHistory[editingIndex] = record;
      setHistory(updatedHistory);
      localStorage.setItem("menstrualHistory", JSON.stringify(updatedHistory));
      setEditingIndex(null);
    } else {
      const updatedHistory = [record, ...history];
      setHistory(updatedHistory);
      localStorage.setItem("menstrualHistory", JSON.stringify(updatedHistory));
    }
  };

  const editRecord = (index) => {
    const record = history[index];
    setLastDate(record.lastDate);
    setCycleLength(record.cycleLength);
    setEditingIndex(index);
  };

  const deleteRecord = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem("menstrualHistory", JSON.stringify(updated));
  };

  return (
   <div>
    <Header/>
     <div className="module-container overflow-auto">
      <h1 style={{margin:"10px"}} className="text-center bg-violet-300 rounded-4xl text-violet-600">Menstrual Cycle Tracker</h1>

      <div className="input-group">
        <label>Last Period Date</label>
        <input
          type="date"
          value={lastDate}
          onChange={(e) => setLastDate(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Cycle Length (days)</label>
        <input
          type="number"
          value={cycleLength}
          placeholder="e.g. 28"
          onChange={(e) => setCycleLength(e.target.value)}
        />
      </div>

      <button className="action-btn" onClick={calculateGraph}>
        {editingIndex !== null ? "Save Update" : "Calculate & Show Graph"}
      </button>

      {/* Legend */}
      <div className="legend-box">
        <span className="legend-item period-day">Period (Red)</span>
        <span className="legend-item fertile-day">Fertile (Pink)</span>
        <span className="legend-item ovulation-day">Ovulation (Blue)</span>
      </div>

      {/* Calendar Graph */}
      {periodGraph.length > 0 &&
        periodGraph.map((cycle, idx) => {
          const monthDays = generateMonthDays(cycle.periodStart, 30);
          const endPeriod = new Date(cycle.periodStart.getTime() + 5 * 86400000 - 1);
          return (
            <div key={idx} className="month-graph">
              <h4>
                Cycle {idx + 1}: {cycle.periodStart.toDateString()} →{" "}
                {endPeriod.toDateString()}
              </h4>
              <div className="days-row">
                {monthDays.map((day, i) => {
                  const isPeriod = day >= cycle.periodStart && day <= endPeriod;
                  const isFertile = day >= cycle.fertileStart && day <= cycle.fertileEnd;
                  const isOvulation = day.toDateString() === cycle.ovulation.toDateString();
                  return (
                    <div
                      key={i}
                      className={`day-box ${
                        isPeriod
                          ? "period-day"
                          : isOvulation
                          ? "ovulation-day"
                          : isFertile
                          ? "fertile-day"
                          : ""
                      }`}
                      title={
                        isPeriod
                          ? `Period Day: ${day.toDateString()}`
                          : isOvulation
                          ? `Ovulation Day: ${day.toDateString()}`
                          : isFertile
                          ? `Fertile Window: ${day.toDateString()}`
                          : day.toDateString()
                      }
                    >
                      {day.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      {/* History */}
      <div className="history-section">
        <h3>Previous Records</h3>
        {history.length === 0 && <p>No records yet</p>}
        {history.map((h, i) => (
          <div key={i} className="history-card">
            <div className="history-info">
              <span>{h.date}</span>
              <span>Last Period: {h.lastDate}</span>
              <span>Cycle: {h.cycleLength} days</span>
            </div>
            <div className="history-actions">
              <button className="update-btn" onClick={() => editRecord(i)}>
                Update
              </button>
              <button className="delete-btn" onClick={() => deleteRecord(i)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
}
