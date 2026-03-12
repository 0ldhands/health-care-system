import { useState } from "react";
import Bmi from "./Bmi";
import BasicHealthChecker from "./BasicHealthChecker";
import "./HealthTools.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function HealthTools() {
  const [activeTab, setActiveTab] = useState("bmi");

  return (
   <div>
    <Header/>
     <div className="calculator-wrapper">

      <div className="header-section">
        <h2 className="calculator-title">Health Calculator</h2>
        <p className="calculator-subtitle">
          Monitor your health using BMI and Health checker tools.
        </p>
      </div>

      <div className="toggle-container">
        <button
          className={`toggle-btn ${activeTab === "bmi" ? "active" : ""}`}
          onClick={() => setActiveTab("bmi")}
        >
           BMI
        </button>

        <button
          className={`toggle-btn ${activeTab === "checker" ? "active" : ""}`}
          onClick={() => setActiveTab("checker")}
        >
          Health Check
        </button>
      </div>

      <div className="content-section">
        <div className="fade-animation" key={activeTab}>
          {activeTab === "bmi" && <Bmi />}
          {activeTab === "checker" && <BasicHealthChecker />}
        </div>
      </div>

    </div>
    <Footer/>
   </div>
  );
}