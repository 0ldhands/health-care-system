import React, { useState, useEffect, useRef } from "react";
import "./YogaPage.css";

export default function YogaPage({ category }) {

  const normalizeCategory = (cat) =>
    cat ? cat.toLowerCase().replace(/\s+/g, "") : "";

  const yogaData = {
    kids: {
      basic: [
        { name: "Sun Salutation", duration: 25, tip: "Warm up your body gently." },
        { name: "Tree Pose", duration: 20, tip: "Improve balance and focus." },
        { name: "Cat-Cow", duration: 20, tip: "Spine mobility exercise." },
        { name: "Child Pose", duration: 25, tip: "Relax and stretch your back." },
        { name: "Butterfly Pose", duration: 20, tip: "Open hips and stretch inner thighs." }
      ],
      normal: [
        { name: "Bridge Pose", duration: 30, tip: "Strengthen back and glutes." },
        { name: "Cobra Pose", duration: 25, tip: "Open chest and strengthen spine." },
        { name: "Seated Twist", duration: 25, tip: "Improve spinal rotation." },
        { name: "Happy Baby", duration: 20, tip: "Stretch lower back and hips." },
        { name: "Leg Raises", duration: 25, tip: "Strengthen core." }
      ],
      advanced: [
        { name: "Crow Pose", duration: 30, tip: "Core and arm strength challenge." },
        { name: "Wheel Pose", duration: 30, tip: "Deep backbend for flexibility." },
        { name: "Flying Crow", duration: 35, tip: "Advanced balance pose." },
        { name: "One-Legged Bridge", duration: 30, tip: "Strengthens glutes and core." },
        { name: "Headstand Prep", duration: 30, tip: "Practice balance safely." }
      ]
    },

    adults: {
      basic: [
        { name: "Mountain Pose", duration: 20, tip: "Posture awareness and balance." },
        { name: "Neck Stretch", duration: 20, tip: "Relieve tension." },
        { name: "Seated Forward Fold", duration: 25, tip: "Stretch hamstrings gently." },
        { name: "Cat-Cow", duration: 20, tip: "Spinal mobility." },
        { name: "Easy Twist", duration: 20, tip: "Gentle spine rotation." }
      ],
      normal: [
        { name: "Warrior I", duration: 30, tip: "Strengthen legs and arms." },
        { name: "Warrior II", duration: 30, tip: "Build stability." },
        { name: "Triangle Pose", duration: 30, tip: "Stretch side body." },
        { name: "Chair Pose", duration: 30, tip: "Leg and core strength." },
        { name: "Bridge Pose", duration: 30, tip: "Open chest and shoulders." }
      ],
      advanced: [
        { name: "Handstand Prep", duration: 30, tip: "Balance training for upper body." },
        { name: "Crow Pose", duration: 30, tip: "Core challenge." },
        { name: "Forearm Stand Prep", duration: 30, tip: "Arm and core strength." },
        { name: "King Pigeon Pose", duration: 35, tip: "Hip opener & back flexibility." },
        { name: "Advanced Backbend", duration: 35, tip: "Deep spine flexibility." }
      ]
    },

    elders: {
      basic: [
        { name: "Seated Forward Bend", duration: 20, tip: "Gentle hamstring stretch." },
        { name: "Neck Stretch", duration: 15, tip: "Relieve neck tension." },
        { name: "Shoulder Rolls", duration: 15, tip: "Loosen shoulders." },
        { name: "Seated Side Stretch", duration: 20, tip: "Stretch side body gently." },
        { name: "Breathing Exercise", duration: 15, tip: "Relax and oxygenate body." }
      ],
      normal: [
        { name: "Chair Pose", duration: 25, tip: "Build leg strength safely." },
        { name: "Tree Pose", duration: 20, tip: "Balance practice." },
        { name: "Gentle Twist", duration: 20, tip: "Spinal mobility." },
        { name: "Bridge Pose Support", duration: 25, tip: "Back and glutes." },
        { name: "Cat-Cow", duration: 20, tip: "Spine flexibility." }
      ],
      advanced: [
        { name: "Wall Plank", duration: 25, tip: "Core strength safely." },
        { name: "Supported Wheel Pose", duration: 25, tip: "Backbend with support." },
        { name: "Forearm Balance Prep", duration: 25, tip: "Gentle balance." },
        { name: "Gentle Backbend", duration: 25, tip: "Spinal flexibility." },
        { name: "Leg Lift Support", duration: 20, tip: "Strengthen legs safely." }
      ]
    }
  };

  const safeCategory = normalizeCategory(category);

  const [level, setLevel] = useState("basic");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const beepSound = useRef(new Audio("/beep.mp3"));

  const exercises = yogaData[safeCategory]?.[level] || [];
  const currentExercise = exercises[currentIndex];

  const totalTime = exercises.reduce((sum, ex) => sum + ex.duration, 0);

  // ⏱ Timer Logic
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      setIsRunning(false);

      // 🔔 Play beep safely
      beepSound.current.play().catch(() => {});

      // Auto move to next pose
      setCurrentIndex((prev) =>
        prev + 1 < exercises.length ? prev + 1 : 0
      );

      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timeLeft, isRunning, exercises.length]);

  const startHandler = () => {
    if (!currentExercise) return;

    // Unlock sound (browser policy fix)
    beepSound.current.play().catch(() => {});
    beepSound.current.pause();
    beepSound.current.currentTime = 0;

    setTimeLeft(currentExercise.duration);
    setIsRunning(true);
  };

  const pauseHandler = () => {
    setIsRunning(false);
  };

  const nextHandler = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setCurrentIndex((prev) =>
      prev + 1 < exercises.length ? prev + 1 : 0
    );
  };

  const levelChangeHandler = (e) => {
    setLevel(e.target.value);
    setCurrentIndex(0);
    setTimeLeft(0);
    setIsRunning(false);
  };

  return (
    <div className="exercise-page yoga-theme">

      <h2>🧘 Yoga – {category}</h2>

      <p className="total-time">
        Total Session Time: {totalTime}s
      </p>

      <div className="level-select">
        <select value={level} onChange={levelChangeHandler}>
          <option value="basic">Basic</option>
          <option value="normal">Normal</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {currentExercise ? (
        <div className="exercise-card">

          <h3>
            {currentExercise.name} ({currentExercise.duration}s)
          </h3>

          <p className="exercise-tip">
            {currentExercise.tip}
          </p>

          {timeLeft > 0 && (
            <div className="timer">
              {timeLeft}s
            </div>
          )}

          <div className="button-group">

            {!isRunning && timeLeft === 0 && (
              <button className="primary-btn" onClick={startHandler}>
                ▶ Start
              </button>
            )}

            {isRunning && (
              <button className="secondary-btn" onClick={pauseHandler}>
                ⏸ Pause
              </button>
            )}

            <button className="outline-btn" onClick={nextHandler}>
              ⏭ Next
            </button>

          </div>

          <p className="progress-text">
            {currentIndex + 1} / {exercises.length}
          </p>

        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          No exercises available for this category.
        </p>
      )}

    </div>
  );
}