import React, { useState } from "react";
import ExercisePage from "./ExercisePage";
import YogaPage from "./YogaPage";
import "./PhysicalHealthHome.css";

const categories = [
  { title: "Kids", path: "kids" },
  { title: "Adults", path: "adults" },
  { title: "Elders", path: "elders" },
];

const modules = [
  { title: "Exercise", key: "exercise" },
  { title: "Yoga", key: "yoga" },
];

export default function PhysicalHealthHome() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBack = () => {
    if (selectedCategory) setSelectedCategory(null);
    else if (selectedModule) setSelectedModule(null);
  };

  return (
    <div className="ph-home">
      <h1>Physical Health</h1>

      {/* Module Selection */}
      {!selectedModule && (
        <div className="category-cards">
          {modules.map((mod) => (
            <div
              key={mod.key}
              className="category-card"
              onClick={() => setSelectedModule(mod.key)}
            >
              <h3>{mod.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Category Selection */}
      {selectedModule && !selectedCategory && (
        <div className="category-cards">
          {categories.map((cat) => (
            <div
              key={cat.path}
              className="category-card"
              onClick={() => setSelectedCategory(cat.path)}
            >
              <h3>{cat.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Render Pages */}
      {selectedModule === "exercise" && selectedCategory && (
        <ExercisePage category={selectedCategory} />
      )}
      {selectedModule === "yoga" && selectedCategory && (
        <YogaPage category={selectedCategory} />
      )}

      {/* Back Button */}
      {(selectedModule || selectedCategory) && (
        <button className="back-btn" onClick={handleBack}>
          ⬅ Back
        </button>
      )}
    </div>
  );
}