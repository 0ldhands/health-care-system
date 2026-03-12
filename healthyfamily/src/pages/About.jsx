import { useState, useEffect } from "react";
import Header from "../components/Header";
import { FaHandHoldingMedical } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { GiWorld } from "react-icons/gi";
import { PiDnaLight } from "react-icons/pi";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { CiCalculator2 } from "react-icons/ci";
import { IoNutritionOutline } from "react-icons/io5";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { RiWomenLine } from "react-icons/ri";
import { MdSportsGymnastics } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { PiBowlFood } from "react-icons/pi";
import { RiPhoneFindLine } from "react-icons/ri";

const aboutStyles = `
  .about-page * { box-sizing: border-box; margin: 0; padding: 0; }

  .about-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 50%, #ddd6fe 100%);
    font-family: 'Segoe UI', sans-serif;
  }

  /* ── Hero ── */
  .about-hero {
    position: relative;
    overflow: hidden;
    padding: 96px 16px 64px;
    text-align: center;
  }

  .about-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(60px);
  }
  .about-blob-1 { top: 40px; left: 25%; width: 288px; height: 288px; background: #7c3aed; opacity: 0.2; }
  .about-blob-2 { bottom: 0; right: 25%; width: 224px; height: 224px; background: #a78bfa; opacity: 0.15; }
  .about-blob-3 { top: 80px; right: 40px; width: 128px; height: 128px; background: #6d28d9; opacity: 0.1; }

  .about-fade {
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .about-fade.hidden { opacity: 0; transform: translateY(30px); }
  .about-fade.visible { opacity: 1; transform: translateY(0); }

  .about-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 999px;
    margin-bottom: 20px;
    background: rgba(124,58,237,0.1);
    color: #7c3aed;
    border: 1px solid rgba(124,58,237,0.2);
  }

  .about-hero-title {
    font-size: clamp(32px, 6vw, 56px);
    font-weight: 900;
    color: #4c1d95;
    line-height: 1.15;
    margin-bottom: 20px;
  }
  .about-hero-title span { color: #7c3aed; }

  .about-hero-sub {
    font-size: 15px;
    color: #6b21a8;
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Stats */
  .about-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-top: 48px;
    transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
  }
  .about-stats.hidden { opacity: 0; transform: translateY(30px); }
  .about-stats.visible { opacity: 1; transform: translateY(0); }

  .about-stat-card {
    padding: 16px 24px;
    border-radius: 16px;
    text-align: center;
    min-width: 110px;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(167,139,250,0.3);
    box-shadow: 0 4px 20px rgba(124,58,237,0.1);
  }
  .about-stat-card p:first-child { font-size: 24px; font-weight: 900; color: #4c1d95; }
  .about-stat-card p:last-child { font-size: 11px; font-weight: 600; color: #6b21a8; margin-top: 2px; }

  /* ── Section Wrapper ── */
  .about-section {
    padding: 56px 16px;
    max-width: 1000px;
    margin: 0 auto;
  }
  .about-section-sm { padding: 16px 16px 56px; max-width: 1000px; margin: 0 auto; }

  .about-section-header { text-align: center; margin-bottom: 40px; }
  .about-section-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7c3aed;
    margin-bottom: 8px;
  }
  .about-section-title { font-size: clamp(22px, 4vw, 30px); font-weight: 900; color: #4c1d95; }
  .about-section-sub { font-size: 13px; color: #6b21a8; margin-top: 8px; max-width: 420px; margin-left: auto; margin-right: auto; }

  /* ── Mission Banner ── */
  .about-mission {
    border-radius: 28px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #4c1d95, #7c3aed);
    box-shadow: 0 20px 60px rgba(124,58,237,0.3);
  }
  @media (min-width: 600px) { .about-mission { flex-direction: row; } }

  .about-mission-text { flex: 1; padding: 40px 32px; }
  .about-mission-label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #c4b5fd; margin-bottom: 12px; }
  .about-mission-title { font-size: clamp(20px, 3.5vw, 28px); font-weight: 900; color: white; margin-bottom: 16px; line-height: 1.3; }
  .about-mission-body { font-size: 13px; color: #ddd6fe; line-height: 1.7; }
  .about-mission-icon { display: flex; align-items: center; justify-content: center; padding: 32px 40px; background: rgba(255,255,255,0.07); flex-shrink: 0; font-size: 80px; }

  /* ── Values Grid ── */
  .about-values-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
  @media (min-width: 600px) { .about-values-grid { grid-template-columns: 1fr 1fr; } }

  .about-value-card {
    display: flex;
    gap: 16px;
    padding: 24px;
    border-radius: 24px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(167,139,250,0.25);
    box-shadow: 0 4px 20px rgba(124,58,237,0.08);
    transition: transform 0.3s ease;
  }
  .about-value-card:hover { transform: translateY(-4px); }

  .about-icon-box {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  }
  .about-icon-box-lg { width: 52px; height: 52px; font-size: 24px; border-radius: 16px; }

  .about-value-title { font-size: 13px; font-weight: 900; color: #4c1d95; margin-bottom: 4px; }
  .about-value-desc { font-size: 12px; color: #6b21a8; line-height: 1.6; }

  /* ── Modules Grid ── */
  .about-modules-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (min-width: 600px) { .about-modules-grid { grid-template-columns: repeat(4, 1fr); } }

  .about-module-card {
    padding: 20px 16px;
    border-radius: 24px;
    text-align: center;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(167,139,250,0.2);
    box-shadow: 0 4px 16px rgba(124,58,237,0.08);
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  .about-module-card:hover { transform: translateY(-8px); }
  .about-module-card:hover .about-module-icon { transform: scale(1.1); }

  .about-module-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    margin: 0 auto 12px;
    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
    transition: transform 0.3s ease;
  }
  .about-module-title { font-size: 11px; font-weight: 900; color: #4c1d95; margin-bottom: 6px; line-height: 1.3; }
  .about-module-desc { font-size: 11px; color: #7c3aed; line-height: 1.5; }

  /* ── Team Grid ── */
  .about-team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (min-width: 600px) { .about-team-grid { grid-template-columns: repeat(4, 1fr); } }

  .about-team-card {
    padding: 24px 16px;
    border-radius: 24px;
    text-align: center;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(167,139,250,0.2);
    box-shadow: 0 4px 16px rgba(124,58,237,0.08);
    transition: transform 0.3s ease;
  }
  .about-team-card:hover { transform: translateY(-4px); }

  .about-team-avatar {
    width: 56px; height: 56px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    margin: 0 auto 12px;
    background: linear-gradient(135deg, #ede9fe, #c4b5fd);
  }
  .about-team-name { font-size: 13px; font-weight: 900; color: #4c1d95; }
  .about-team-role { font-size: 11px; font-weight: 600; color: #7c3aed; margin-top: 4px; }

  /* ── CTA Banner ── */
  .about-cta {
    position: relative;
    border-radius: 28px;
    overflow: hidden;
    padding: 48px 32px;
    text-align: center;
    background: linear-gradient(135deg, #4c1d95, #7c3aed);
    box-shadow: 0 20px 60px rgba(124,58,237,0.3);
  }
  .about-cta-blob1 { top: 0; right: 0; width: 192px; height: 192px; background: #a78bfa; }
  .about-cta-blob2 { bottom: 0; left: 0; width: 128px; height: 128px; background: #ddd6fe; }
  .about-cta-emoji { font-size: 40px; display: block; margin-bottom: 16px; }
  .about-cta-title { font-size: clamp(20px, 3.5vw, 28px); font-weight: 900; color: white; margin-bottom: 12px; }
  .about-cta-sub { font-size: 13px; color: #ddd6fe; max-width: 420px; margin: 0 auto 28px; line-height: 1.6; }

  .about-cta-btns { display: flex; flex-direction: column; gap: 12px; justify-content: center; align-items: center; }
  @media (min-width: 500px) { .about-cta-btns { flex-direction: row; } }

  .about-btn-ghost {
    padding: 12px 28px;
    border-radius: 14px;
    font-size: 13px;
    font-weight: 900;
    color: white;
    text-decoration: none;
    background: rgba(255,255,255,0.2);
    border: 1.5px solid rgba(255,255,255,0.35);
    backdrop-filter: blur(8px);
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  .about-btn-ghost:hover { transform: scale(1.05); }

  .about-btn-solid {
    padding: 12px 28px;
    border-radius: 14px;
    font-size: 13px;
    font-weight: 900;
    color: #7c3aed;
    text-decoration: none;
    background: white;
    border: none;
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  .about-btn-solid:hover { transform: scale(1.05); }

  /* ── Footer ── */
  .about-footer { background: linear-gradient(135deg, #2e1065, #4c1d95); }
  .about-footer-wave { display: block; width: 100%; height: 40px; line-height: 0; }
  .about-footer-inner {
    padding: 24px 24px;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #9d8ec7;
  }
  @media (min-width: 600px) { .about-footer-inner { flex-direction: row; justify-content: space-between; } }
  .about-footer-inner span { color: white; font-weight: 700; }
  .about-footer-heart { color: #f472b6; }
`;

export default function About() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const modules = [
    { icon: <CiCalculator2/>, title: "Health Calculator", desc: "BMI, BMR, calories and more at your fingertips." },
    { icon: <IoNutritionOutline/>, title: "Nutrition", desc: "Track meals and get detailed nutritional insights." },
    { icon: <HiOutlineBellAlert/>, title: "Reminder", desc: "Never miss medications or wellness routines." },
    { icon: <RiWomenLine/>, title: "Women Health", desc: "Cycle tracking and women-specific health tools." },
    { icon: <MdSportsGymnastics/>, title: "Physical Health", desc: "Workout plans and fitness progress tracking." },
    { icon: <TbReportAnalytics/>, title: "Report Saver", desc: "Store and access your health reports anytime." },
    { icon: <PiBowlFood/>, title: "Recipes", desc: "Discover healthy recipes from around the world." },
    { icon: <RiPhoneFindLine/>, title: "Symptoms Finder", desc: "Identify symptoms and understand your health." },
  ];

  const stats = [
    { value: "8+", label: "Health Modules" },
    { value: "1000+", label: "Recipes" },
    { value: "24/7", label: "Available" },
    { value: "100%", label: "Free to Use" },
  ];

  const team = [
    { name: "Dr. Sarah Chen", role: "Medical Advisor", emoji: "S" },
    { name: "Alex Kumar", role: "Lead Developer", emoji: "A" },
    { name: "Priya Nair", role: "Nutrition Expert", emoji: "P" },
    { name: "James Liu", role: "UX Designer", emoji: "J" },
  ];

  const values = [
    { icon: <CiLock/>, title: "Privacy First", desc: "Your health data stays on your device. We never sell or share your personal information." },
    { icon:<GiWorld/>,  title: "Accessible to All", desc: "Designed for everyone regardless of age, background, or tech experience." },
    { icon:<PiDnaLight/>, title: "Science Backed", desc: "Every feature is built on verified medical research and expert guidance." },
    { icon: <FaHeartCircleCheck/>, title: "Built with Care", desc: "Crafted by a team passionate about making healthcare simple and personal." },
  ];

  return (
    <>
     <Header/>
      <style>{aboutStyles}</style>

      <div className="about-page">
       
        {/* ── Hero ── */}
        <div className="about-hero">
          <div className="about-blob about-blob-1" />
          <div className="about-blob about-blob-2" />
          <div className="about-blob about-blob-3" />

          <div className={`about-fade ${visible ? "visible" : "hidden"}`}>
            <span className="about-badge">✦ About HealthHub</span>
            <h1 className="about-hero-title">
              Your Wellness,<br /><span>Reimagined</span>
            </h1>
            <p className="about-hero-sub">
              HealthHub is a free, all-in-one health companion that brings together everything you need to live a healthier, more informed life — in one beautiful app.
            </p>
          </div>

          <div className={`about-stats ${visible ? "visible" : "hidden"}`}>
            {stats.map(({ value, label }) => (
              <div key={label} className="about-stat-card">
                <p>{value}</p>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mission ── */}
        <div className="about-section">
          <div className="about-mission">
            <div className="about-mission-text">
              <span className="about-mission-label">Our Mission</span>
              <h2 className="about-mission-title">Making healthcare simple, personal & accessible</h2>
              <p className="about-mission-body">
                We believe everyone deserves easy access to health tools that were once only available to a few. HealthHub was built to break that barrier — giving you hospital-grade insights right from your pocket, for free.
              </p>
            </div>
            <div className="about-mission-icon">
                <FaHandHoldingMedical className="text-white" size={100}/>
            </div>
          </div>
        </div>

        {/* ── Values ── */}
        <div className="about-section-sm">
          <div className="about-section-header">
            <span className="about-section-label">What We Stand For</span>
            <h2 className="about-section-title">Our Core Values</h2>
          </div>
          <div className="about-values-grid">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="about-value-card">
                <div className="about-icon-box text-violet-800">{icon}</div>
                <div>
                  <p className="about-value-title">{title}</p>
                  <p className="about-value-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Modules ── */}
        <div className="about-section">
          <div className="about-section-header">
            <span className="about-section-label">Everything You Need</span>
            <h2 className="about-section-title">8 Powerful Modules</h2>
            <p className="about-section-sub">Each module is purpose-built to tackle a specific aspect of your health journey.</p>
          </div>
          <div className="about-modules-grid">
            {modules.map(({ icon, title, desc }) => (
              <div key={title} className="about-module-card">
                <div className="about-module-icon text-violet-800">{icon}</div>
                <p className="about-module-title">{title}</p>
                <p className="about-module-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team ── */}
        <div className="about-section-sm">
          <div className="about-section-header">
            <span className="about-section-label">The People Behind It</span>
            <h2 className="about-section-title">Meet the Team</h2>
          </div>
          <div className="about-team-grid">
            {team.map(({ name, role, emoji }) => (
              <div key={name} className="about-team-card">
                <div className="about-team-avatar text-white">{emoji}</div>
                <p className="about-team-name">{name}</p>
                <p className="about-team-role">{role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="about-section">
          <div className="about-cta">
            <div className="about-blob about-cta-blob1" style={{ opacity: 0.1, filter: "blur(60px)" }} />
            <div className="about-blob about-cta-blob2" style={{ opacity: 0.1, filter: "blur(40px)" }} />
            <span className="about-cta-emoji">💜</span>
            <h2 className="about-cta-title">Ready to take charge of your health?</h2>
            <p className="about-cta-sub">Join thousands of users who trust HealthHub as their daily wellness companion.</p>
            <div className="about-cta-btns">
              <a href="/home" className="about-btn-ghost">Explore Features →</a>
              <a href="/contact" className="about-btn-solid">Contact Us</a>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="about-footer">
          <svg className="about-footer-wave" viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,25 C360,55 1080,0 1440,25 L1440,0 L0,0 Z" fill="#ddd6fe" />
          </svg>
          <div className="about-footer-inner">
            <p>© {new Date().getFullYear()} <span>HealthHub</span>. All rights reserved.</p>
            <p>Made with <span className="about-footer-heart">❤️</span> for a healthier you</p>
          </div>
        </footer>

      </div>
    </>
  );
}