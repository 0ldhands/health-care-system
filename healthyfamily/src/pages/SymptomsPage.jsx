import { useState } from "react";
import SymptomInput from "../components/SymptomInput";
import DiseaseList from "../components/DiseaseList";
import { diseaseData } from "../data/diseases";
import "./SymptomsPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function SymptomsPage() {

  const [matchedDiseases, setMatchedDiseases] = useState([]);

  const handleSearch = (userSymptoms) => {
    const results = diseaseData.filter(disease =>
      disease.symptoms.some(symptom =>
        userSymptoms.includes(symptom)
      )
    );

    setMatchedDiseases(results);
  };

  return (
    <div>
      <Header />
      <div className="symptoms-page">


        <SymptomInput onSearch={handleSearch} />

        <DiseaseList diseases={matchedDiseases} />
      </div>
      <Footer />
    </div>
  );
}
