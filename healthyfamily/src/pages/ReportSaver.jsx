import { useState, useEffect } from "react";
import axios from "axios";
import "./ReportSaver.css";

export default function ReportSaver() {
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("{}");

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports", { withCredentials: true });
      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const upload = async () => {
    if (!title.trim()) return alert("Enter report title");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("data", data);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("http://localhost:5000/api/reports", formData, { withCredentials: true });
      setTitle("");
      setDescription("");
      setData("{}");
      setFile(null);
      fetchReports();
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reports/${id}`, { withCredentials: true });
      fetchReports();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="report-saver">

      <h2>📄 Report Saver</h2>

      {/* Upload Section */}
      <div className="upload-panel">

        <input
          placeholder="Report title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          placeholder="Data (JSON)"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={upload}>
          Upload Report
        </button>

      </div>

      {/* Reports Header */}
      <div className="report-header">
        <h3>Saved Reports</h3>
        <span className="report-count">{reports.length}</span>
      </div>

      {/* Empty State */}
      {reports.length === 0 && (
        <div className="empty-state">
          No reports uploaded yet.
        </div>
      )}

      {/* Report Cards */}
      {reports.map((r) => (
        <div key={r._id} className="report-item">

          <div className="report-top">
            <strong>{r.title}</strong>
          </div>

          {r.description && <p>{r.description}</p>}

          <div className="report-actions">
            {r.file && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
                href={`http://localhost:5000/api/reports/viewReports/${r._id}`}
              >
                View File
              </a>
            )}

            <button
              onClick={() => remove(r._id)}
              className="delete-btn">
              Delete
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}