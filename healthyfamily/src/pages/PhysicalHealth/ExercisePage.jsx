import React, { useState, useEffect, useRef } from "react";
import "./ExercisePage.css"; // lite purple CSS

export default function ExercisePage({ category }) {
const exerciseData = {
  kids: [
    { name: "Jumping Jacks", duration: "30s", youtube: "https://www.youtube.com/watch?v=c4DAnQ6DtF8" },
    { name: "Mini Squats", duration: "20s", youtube: "https://www.youtube.com/watch?v=aclHkVaku9U" },
    { name: "Arm Circles", duration: "15s", youtube: "https://www.youtube.com/watch?v=ebYRIzH16yY" },
    { name: "Hopscotch Jumps", duration: "25s", youtube: "https://www.youtube.com/watch?v=3o9Q5X8L6eM" },
    { name: "Toy Reach Stretch", duration: "20s", youtube: "https://www.youtube.com/watch?v=V9QlO-6wYc4" },
    { name: "Side Steps", duration: "30s", youtube: "https://www.youtube.com/watch?v=xQ-5gY5sL7g" },
    { name: "High Knees", duration: "25s", youtube: "https://www.youtube.com/watch?v=8opcQdC-V-U" },
    { name: "Wall Push-Ups", duration: "20s", youtube: "https://www.youtube.com/watch?v=H0YyHgvQ8Ns" },
    { name: "Bear Crawls", duration: "30s", youtube: "https://www.youtube.com/watch?v=4X9DhHu0J6s" },
    { name: "Frog Jumps", duration: "25s", youtube: "https://www.youtube.com/watch?v=2DywOHr6i9U" },
    { name: "Skipping Rope", duration: "30s", youtube: "https://www.youtube.com/watch?v=2s8FSx-8zY0" },
    { name: "Balance Beam Walk", duration: "20s", youtube: "https://www.youtube.com/watch?v=3R_RqN0rK_c" },
    { name: "Crab Walk", duration: "25s", youtube: "https://www.youtube.com/watch?v=F_B5ox-JxuE" },
    { name: "Knee Hugs", duration: "20s", youtube: "https://www.youtube.com/watch?v=apX8xQXYh_Q" },
    { name: "Side Lunges", duration: "25s", youtube: "https://www.youtube.com/watch?v=Z2n58m2i4jg" },
  ],
  adults: [
    { name: "Push Ups", duration: "40s", youtube: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
    { name: "Lunges", duration: "30s", youtube: "https://www.youtube.com/watch?v=COKYKgQ8KR0" },
    { name: "Plank", duration: "45s", youtube: "https://www.youtube.com/watch?v=pSHjTRCQxIw" },
    { name: "Mountain Climbers", duration: "40s", youtube: "https://www.youtube.com/watch?v=nmwgirgXLYM" },
    { name: "Burpees", duration: "35s", youtube: "https://www.youtube.com/watch?v=TU8QYVW0gDU" },
    { name: "Tricep Dips", duration: "30s", youtube: "https://www.youtube.com/watch?v=0326dy_-CzM" },
    { name: "Bicycle Crunches", duration: "40s", youtube: "https://www.youtube.com/watch?v=9FGilxCbdz8" },
    { name: "Jump Squats", duration: "35s", youtube: "https://www.youtube.com/watch?v=U4s4mEQ5VqU" },
    { name: "Side Plank", duration: "30s", youtube: "https://www.youtube.com/watch?v=K2VljzCC16g" },
    { name: "Glute Bridges", duration: "40s", youtube: "https://www.youtube.com/watch?v=m2V6QHbbJ4s" },
    { name: "Russian Twists", duration: "35s", youtube: "https://www.youtube.com/watch?v=wkD8rjkodUI" },
    { name: "Wall Sit", duration: "45s", youtube: "https://www.youtube.com/watch?v=-cdph8hv0O0" },
    { name: "Calf Raises", duration: "30s", youtube: "https://www.youtube.com/watch?v=YMmgqO8Jo-k" },
    { name: "Standing Side Crunch", duration: "35s", youtube: "https://www.youtube.com/watch?v=9V9dLwK3UOQ" },
    { name: "Hip Circles", duration: "30s", youtube: "https://www.youtube.com/watch?v=x2zKtt6J1Ck" },
  ],
  elders: [
    { name: "Neck Stretch", duration: "20s", youtube: "https://www.youtube.com/watch?v=3tXk8L0pxFw" },
    { name: "Seated Leg Raises", duration: "25s", youtube: "https://www.youtube.com/watch?v=0rK8x2S5joI" },
    { name: "Arm Raises", duration: "20s", youtube: "https://www.youtube.com/watch?v=kBq99oHDBhY" },
    { name: "Ankle Circles", duration: "20s", youtube: "https://www.youtube.com/watch?v=Z0uXj9mMn9I" },
    { name: "Seated Marching", duration: "25s", youtube: "https://www.youtube.com/watch?v=5bGl8s_jn3Y" },
    { name: "Shoulder Rolls", duration: "20s", youtube: "https://www.youtube.com/watch?v=U7UqVQo3yOI" },
    { name: "Heel Raises", duration: "25s", youtube: "https://www.youtube.com/watch?v=nv5CFFPNF9Q" },
    { name: "Gentle Side Bends", duration: "20s", youtube: "https://www.youtube.com/watch?v=IQ2sZd51FjQ" },
    { name: "Toe Taps", duration: "20s", youtube: "https://www.youtube.com/watch?v=OjVpmg8GBF8" },
    { name: "Chair Squats", duration: "25s", youtube: "https://www.youtube.com/watch?v=aclHkVaku9U" },
    { name: "Wrist Stretch", duration: "20s", youtube: "https://www.youtube.com/watch?v=Gb0d3Lz8nLk" },
    { name: "Seated Side Twists", duration: "25s", youtube: "https://www.youtube.com/watch?v=2pGm1Vb1m7c" },
    { name: "Finger Flexes", duration: "15s", youtube: "https://www.youtube.com/watch?v=1aj5ehx0Z3I" },
    { name: "Shoulder Shrugs", duration: "20s", youtube: "https://www.youtube.com/watch?v=0fzyjZf2kjc" },
    { name: "Seated Hip Stretch", duration: "25s", youtube: "https://www.youtube.com/watch?v=5LqQts_T7nQ" },
  ],
};

  const safeCategory = category?.toLowerCase().trim();
  const exercises = exerciseData[safeCategory] || [];

  const [level, setLevel] = useState("Beginner");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);

  const beepSound = useRef(new Audio("/beep.mp3"));

  const currentExercise = exercises[currentIndex];

  const getBaseDuration = (str) => parseInt(str.replace("s", ""));

  const getDuration = (base) => {
    if (level === "Beginner") return base;
    if (level === "Intermediate") return base + 10;
    if (level === "Advanced") return base + 20;
    return base;
  };

  const startTimer = () => {
    if (!currentExercise) return;
    const duration = getDuration(getBaseDuration(currentExercise.duration));
    setTimeLeft(duration);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      setIsRunning(false);

      // 🔔 Play beep
      beepSound.current.play().catch(() => {});

      if (!isResting && currentIndex < exercises.length - 1) {
        setIsResting(true);
        setTimeLeft(5);
        setIsRunning(true);
      } else if (isResting) {
        setIsResting(false);
        setCurrentIndex((prev) => prev + 1);
      }

      return;
    }
       
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timeLeft, isRunning, isResting, currentIndex, exercises.length]);

  if (!exercises.length) {
    return <h2 style={{ textAlign: "center" }}>No exercises found</h2>;
  }

  const progressPercent =
    ((currentIndex + 1) / exercises.length) * 100;

  return (
    <div className="exercise-page">
      <h2>{safeCategory?.toUpperCase()} Workout</h2>

      <div className="level-select">
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="exercise-card">
        <h3>{isResting ? "Rest Time" : currentExercise.name}</h3>

        <div className="timer">
          {timeLeft > 0 ? `${timeLeft}s` : "Ready"}
        </div>

        {!isResting && (
          <button
            className="secondary-btn"
            onClick={() => window.open(currentExercise.youtube, "_blank")}
          >
            View Demo
          </button>
        )}

        <div className="button-group">
          {!isRunning && !isResting && (
            <button
              className="primary-btn"
              onClick={() => {
                beepSound.current.play().catch(() => {});
                beepSound.current.pause();
                beepSound.current.currentTime = 0;
                startTimer();
              }}
            >
              Start
            </button>
          )}
        </div>
      </div>

      <p className="progress-text">
        Exercise {currentIndex + 1} of {exercises.length}
      </p>
    </div>
  );
}