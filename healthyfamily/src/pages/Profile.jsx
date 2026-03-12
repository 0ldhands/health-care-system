import { useState, useEffect } from "react";
import "./Profile.css";

import { useContext } from "react";
import { GlobalState } from "../App";

export default function Profile({ closeProfile }) {
  const { user, setUser } = useContext(GlobalState);
  // ensure user has defaults
  const localUser = {
    name: user.name || "",
    healthScore: user.healthScore || 75,
    image: user.image || user.profileImage || ""
  };

  const [editMode, setEditMode] = useState(false);

  // no longer need loadUser here as context holds it


  // Upload new image to backend and persist in DB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile-image", {
        method: "PUT",
        credentials: "include",
        body: formData
      });
      const data = await res.json();
      if (data.success && data.user) {
        const updated = { ...user, profileImage: data.user.profileImage };
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
      } else {
        console.error("Upload failed", data);
      }
    } catch (err) {
      console.error("Image upload error", err);
    }
  };

  // Delete image from backend
  const deleteImage = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile-image", {
        method: "DELETE",
        credentials: "include"
      });
      const data = await res.json();
      if (data.success && data.user) {
        const updated = { ...user, profileImage: data.user.profileImage || "" };
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
      }
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    window.location.href = "/";
  };

  // Close profile
  const handleClose = () => {
    closeProfile();
  };

  return (
    <>
      <div className="profile-overlay" onClick={handleClose}></div>

      <div className="profile-container">

        <div className="profile-header">
          <h2>Profile</h2>
          <button className="close-btn" onClick={handleClose}>✖</button>
        </div>

        <div className="profile-card">

          <img
            src={
              localUser.image
                ? `http://localhost:5000/uploads/${localUser.image}`
                : "https://via.placeholder.com/120"
            }
            alt="profile"
            className="profile-img"
          />

          <h3>{localUser.name || "Guest User"}</h3>

          <div className="health-section">
            <p>Health Score</p>
            <progress value={localUser.healthScore} max="100"></progress>
            <span>{localUser.healthScore}%</span>
          </div>

          {/* Edit Profile Button */}
          {!editMode && (
            <button onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}

          {/* Edit Mode */}
          {editMode && (
            <div className="edit-section">

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {localUser.image && (
                <button onClick={deleteImage}>
                  Delete Image
                </button>
              )}

              <button onClick={() => setEditMode(false)}>
                Save
              </button>

            </div>
          )}

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </>
  );
}