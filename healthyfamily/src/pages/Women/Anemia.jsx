import { useState } from "react";
import "./women.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Anemia() {
  const [symptoms, setSymptoms] = useState({
    tired: false,
    dizziness: false,
    paleSkin: false,
    breathless: false,
  });

  const handleChange = (e) => {
    setSymptoms({ ...symptoms, [e.target.name]: e.target.checked });
  };

  const resetAll = () => {
    setSymptoms({
      tired: false,
      dizziness: false,
      paleSkin: false,
      breathless: false,
    });
  };

  const score = Object.values(symptoms).filter(Boolean).length;
  const percent = (score / 4) * 100;

  const getStatus = () => {
    if (score === 0) return null;
    if (score <= 1) return { text: "Low Risk", color: "low", emoji: "😊" };
    if (score <= 3) return { text: "Moderate Risk", color: "medium", emoji: "⚠️" };
    return { text: "High Risk", color: "high", emoji: "🚨" };
  };

  const status = getStatus();

  return (
    <div>
      <Header/>
      <div className="anemia-wrapper">
      <div className="anemia-card overflow-auto">
          <h1 style={{margin:"10px"}} className="text-center bg-violet-300 rounded-4xl text-violet-600">Anemia Risk Checker</h1>
        
        <p className="subtitle">
          Select symptoms you are experiencing
        </p>

        <div className="symptom-list">
          {[
            { name: "tired", label: "Feeling tired often" },
            { name: "dizziness", label: "Dizziness / headache" },
            { name: "paleSkin", label: "Pale skin or lips" },
            { name: "breathless", label: "Shortness of breath" },
          ].map((item) => (
            <label key={item.name} className="symptom">
              <input
                type="checkbox"
                name={item.name}
                checked={symptoms[item.name]}
                onChange={handleChange}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        {status && (
          <>
            <div className="progress-container">
              <div
                className={`progress-bar ${status.color}`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            <div className={`result ${status.color}`}>
              <h3>
                {status.emoji} {status.text}
              </h3>

              {score >= 2 && (
                <ul>
                  <li>Increase iron-rich foods</li>
                  <li>Take Vitamin C daily</li>
                  <li>Consider Hb blood test</li>
                  <li>Consult doctor if symptoms continue</li>
                </ul>
              )}
            </div>
          </>
        )}

        <button className="reset-btn" onClick={resetAll}>
          Reset
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Anemia;
