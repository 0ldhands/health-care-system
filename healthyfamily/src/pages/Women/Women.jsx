import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./women.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MdBloodtype } from "react-icons/md";
import { PiDnaLight } from "react-icons/pi";
import { CiMedicalCase } from "react-icons/ci";
import { PiBrainThin } from "react-icons/pi";

export default function Women() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [newMember, setNewMember] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("womenMembers")) || [];
    setMembers(saved);
    if (saved.length > 0) setSelectedMember(saved[0]);
  }, []);

  const addMember = () => {
    if (!newMember) return;
    const updated = [...members, newMember];
    setMembers(updated);
    localStorage.setItem("womenMembers", JSON.stringify(updated));
    setSelectedMember(newMember);
    setNewMember("");
    setShowPopup(false);
  };

  const modules = [
    { title: "Menstrual Tracker", path: "/women/menstrual", icon:<MdBloodtype size={50}/>  },
    { title: "PCOS Risk Check", path: "/women/pcos", icon:<PiDnaLight size={50}/> },
    { title: "Mental Health", path: "/women/mental", icon: <PiBrainThin size={50}/> },
    { title: "Anemia Check", path: "/women/anemia", icon:<CiMedicalCase size={50}/> },
  ];

  return (
   <div>
    <Header/>
     <div className="women-container">

      {/* HEADER */}
      <div className="women-header">
        <h1 className="women-title">Women Health Care</h1>

        
      </div>

      {/* MODULE GRID */}
      <div className="women-grid">
        {modules.map((m) => (
          <div
            key={m.title}
            className="women-card flex justify-center items-center gap-4 text-violet-800"
            onClick={() => navigate(m.path, { state: { member: selectedMember } })}
          >
            <span className="women-icon">{m.icon}</span>
            <h3>{m.title}</h3>
           
          </div>
        ))}
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="member-popup">
          <div className="member-popup-card">
            <h3>Add Member</h3>
            <input
              placeholder="Enter Name"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
            <button className="add-member-btn" onClick={addMember}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer/>
   </div>
  );
}
