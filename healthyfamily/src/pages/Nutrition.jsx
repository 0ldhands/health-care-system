import React, { useState, useEffect } from 'react';
import { Search, Clock, Loader2 } from 'lucide-react';
import "./Nutri.css";
import Footer from '../components/Footer';
import Header from '../components/Header';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function FoodNutritionApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);

  const API_URL = 'http://localhost:5000/api/nutrition';

  // Fetch search history on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {

    try {
      const res = await fetch(`${API_URL}/history`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setNutritionData(null);

    try {
      const res = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ foodName: searchTerm })
      });

      if (!res.ok) {
        throw new Error('Food not found');
      }

      const result = await res.json();
      setNutritionData(result.data);
      setSource(result.source);
      fetchHistory(); // Refresh history
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleHistoryClick = (query) => {
    setSearchTerm(query);
  };

  return (
    <div>
      <Header/>
      <div className="app">
      <div className="container">

        <div className="header">
          <h1>Food Nutrition Finder</h1>
          <p>Search for any dish to get instant nutrition insights</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter food name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="spin" /> : <Search />}
          </button>
        </div>
          {history.length > 0 && (
          <div className="card history-card">
            <h3><Clock size={18}/> Recent Searches</h3>
            <div className="history-list">
              {history.map((item, idx) => (
                <button key={idx} onClick={() => setSearchTerm(item.query)}>
                  {item.query}
                </button>
              ))}
            </div>
          </div>
        )}
        {error && <div className="error">{error}</div>}

        {nutritionData && (
          <div className="card result-card">
            <h2>{nutritionData.foodName}</h2>

            <div className="grid">
              <Nutrient label="Calories" value={nutritionData.calories} unit="kcal" />
              <Nutrient label="Protein" value={nutritionData.protein} unit="g" />
              <Nutrient label="Carbs" value={nutritionData.carbs} unit="g" />
              <Nutrient label="Fat" value={nutritionData.fat} unit="g" />
              <Nutrient label="Fiber" value={nutritionData.fiber} unit="g" />
              <Nutrient label="Sugar" value={nutritionData.sugar} unit="g" />
            </div>
          </div>
        )}

      

      </div>
    </div>
    <Footer/>
    </div>
  );
}

function Nutrient({ label, value, unit }) {
  return (
    <div className="nutrient-card">
      <span className="label">{label}</span>
      <h3>{value || 0} <span>{unit}</span></h3>
    </div>
  );
}