import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import "./Home.css";

import { GlobalState } from "../App";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Healthcalculator from "../assets/health-calculator.jpg"
import Nutrition from "../assets/nutrition.jpg"
import Physical from "../assets/physical.jpg"
import Recepies from "../assets/recepies.jpg"
import Reminder from "../assets/reminder.jpg"
import Report from "../assets/report.jpg"
import Symptoms from "../assets/symptoms.jpg"
import Women from "../assets/women.jpg"
import Notification from "./Notifications.jsx"



export default function Home() {

  const {showProfile, setShowProfile,notificationbtn,setNotificationbtn}=useContext(GlobalState)

  const navigate = useNavigate(); 
  

  const buttons = [
    { title: "Health Calculator", icon: "⚖️", path: "/calculator", img: Healthcalculator },
    { title: "Nutrition", icon: "🥗", path: "/nutrition", img: Nutrition },
    { title: "Reminder", icon: "⏰", path: "/reminder", img: Reminder },
    { title: "Women Health", icon: "🌸", path: "/women", img: Women },
    { title: "Physical Health", icon: "🏋️", path: "/physical", img: Physical },
    { title: "Report Saver", icon: "📄", path: "/reports", img: Report },
    { title: "Recipes", icon: "🍲", path: "/foodie", img: Recepies },
    { title: "Symptoms Finder", icon: "🩺", path: "/symptoms", img: Symptoms }
  ];

  return (
    <div className="home-container">

      {/* HEADER */}
    
    <Header/>
      <h1 className="home-title">Health Dashboard</h1>

      {notificationbtn && (
        <div>
       <Notification/>
        </div>
      )}

      {/* MODULE CARDS */}
      <div className="card-grid">
        {buttons.map((btn, i) => (
          <div
            key={i}
            className="home-card"
            onClick={() => navigate(btn.path)}   // ✅ navigation added
          >
            <img src={btn.img} alt={btn.img} className="rounded-2xl" />
            <div className="home-text">{btn.title}</div>
           
          </div>
        ))}
      </div>

      {/* PROFILE SLIDE */}
      {showProfile && (
        <Profile closeProfile={() => setShowProfile(false)} />
      )}
    <Footer/>
    </div>
  );
}