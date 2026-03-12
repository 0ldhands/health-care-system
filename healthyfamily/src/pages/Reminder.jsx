import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reminder.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Reminder() {
  const [mode, setMode] = useState("health");
  const [reminders, setReminders] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Checkup");
  const [medicine, setMedicine] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    Notification.requestPermission();

    // load reminders from backend
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reminders");
        setReminders(res.data || []);
      } catch (err) {
        console.error("failed to fetch reminders", err);
      }
    };
    load();
  }, []);

  const addOrUpdate = async () => {
    if (!name || !date) return;

    try {
      if (editId) {
        const body = {
          mode,
          personName: name,
          visitFor: type,
          medicine,
          date,
          time
        };
        console.log(body);
        const res = await axios.put(
          `http://localhost:5000/api/reminders/${editId}`,
          body
        );
        setReminders(reminders.map(r => (r._id === editId ? res.data : r)));
        setEditId(null);
      } else {
        const body = {
          mode,
          personName: name,
          visitFor: type,
          medicine,
          date,
          time
        };
        console.log(body);
        const res = await axios.post("http://localhost:5000/api/reminders", body);
        setReminders([...reminders, res.data]);
      }
    } catch (err) {
      console.error("failed to save reminder", err);
    }

    setName("");
    setMedicine("");
    setDate("");
    setTime("");
  };

  const deleteReminder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reminders/${id}`);
      setReminders(reminders.filter((r) => r._id !== id));
    } catch (err) {
      console.error("delete failed", err);
    }
  };

  const editReminder = (r) => {
    setName(r.personName);
    setType(r.visitFor || "Checkup");
    setMedicine(r.medicine || "");
    setDate(r.date);
    setTime(r.time || "");
    setMode(r.mode);
    setEditId(r._id);
  };

  const now = new Date();
  const todayDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0,5); // HH:MM

  return (
  <div>
    <Header/>
    <div className="reminder-page">
    <div className="reminder-card-main">

      <div className="top-bar">
        <h2>
          {mode === "health"
            ? "Health Reminder"
            : "Medicine Reminder"}
        </h2>

        <button
          className="switch-btn"
          onClick={() =>
            setMode(mode === "health" ? "medicine" : "health")
          }
        >
          Switch
        </button>
      </div>

      <div className="form-section">
        <input
          placeholder="Person Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {mode === "health" ? (
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Checkup</option>
            <option>Vaccine</option>
            <option>Lab Test</option>
            <option>Scan</option>
            <option>Dental</option>
            <option>Eye Checkup</option>
            <option>BP Check</option>
            <option>Doctor Visit</option>
          </select>
        ) : (
          <input
            placeholder="Medicine Name"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
          />
        )}

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button className="primary-btn" onClick={addOrUpdate}>
          {editId ? "Update Reminder" : "Add Reminder"}
        </button>
      </div>

      <div className="list-section overflow-auto">
        <h3>Schedule List</h3>

        {reminders
          .filter((r) => r.mode === mode)
          .map((r) => (
            <div
              key={r._id}
              className={`reminder-item ${
                r.date === todayDate && r.time <= currentTime ? "today" : ""
              }`}
            >
              <p><b>Name:</b> {r.personName}</p>
              <p>
                <b>{r.mode === "health" ? "Type" : "Medicine"}:</b>{" "}
                {r.mode === "health" ? r.visitFor : r.medicine}
              </p>
              <p><b>Date:</b> {r.date}</p>
              <p><b>Time:</b> {r.time}</p>

              <div className="btn-group">
                <button onClick={() => editReminder(r)}>Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => deleteReminder(r._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

    </div>
  </div>
  <Footer/>
  </div>
);
}