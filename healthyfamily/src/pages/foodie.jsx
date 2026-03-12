import { useEffect, useState } from "react";
import "./foodie.css";

function Foodies() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Load random meal on start
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Search meal
  const searchMeal = () => {
    if (!query.trim()) return;

    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="food-container">
      <h1 className="title">RECIPE's Finder</h1>
       
      <div className="search-box">
       <input
  type="text"
  placeholder="Search recipe..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && searchMeal()}
/>
        <button onClick={searchMeal}>🔎︎</button>
      </div>

      {loading && <p className="loading">Loading recipes...</p>}
      {!loading && meals.length === 0 && (
        <p className="loading">No recipes found</p>
      )}

      <div className="recipe-list">
        {meals.map((meal) => (
          <div className="card" key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />

            <div className="card-header">
              <h3>{meal.strMeal}</h3>
              <button
                className="view-btn"
                onClick={() => setSelectedMeal(meal)}
              >
                ▶ View
              </button>
            </div>

            <p><b>Category:</b> {meal.strCategory}</p>
            <p><b>Area:</b> {meal.strArea}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMeal && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setSelectedMeal(null)}
            >
              ✖
            </button>

            <h2>{selectedMeal.strMeal}</h2>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
            />

            <h4>🍽 Ingredients</h4>
            <ul>
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient =
                  selectedMeal[`strIngredient${i + 1}`];
                const measure =
                  selectedMeal[`strMeasure${i + 1}`];

                return (
                  ingredient &&
                  ingredient.trim() !== "" && (
                    <li key={i}>
                      {ingredient} - {measure}
                    </li>
                  )
                );
              })}
            </ul>

            <h4>📝 Instructions</h4>
            <p className="instructions">
              {selectedMeal.strInstructions}
            </p>

            {selectedMeal.strYoutube && (
              <>
                <h4>📺 Recipe Video</h4>
                <iframe
                  width="100%"
                  height="315"
                  src={selectedMeal.strYoutube.replace(
                    "watch?v=",
                    "embed/"
                  )}
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Foodies;