import { Routes, Route, useLocation } from "react-router-dom"; // <-- import useLocation
import axios from "axios";
import GlobalError from "./components/GlobalError";

// set base URL from environment or fallback
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.withCredentials = true; // <-- send cookies automatically

// global response interceptor to catch network/server errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // no response means the request never reached the server
    if (!error.response) {
      window.dispatchEvent(
        new CustomEvent("globalError", {
          detail: "Cannot reach backend – server may be down. Please try again later."
        })
      );
    }
    return Promise.reject(error);
  }
);

import SignIn from "./pages/Signin";
import Signup from "./pages/Signup";

import Home from "./pages/Home";

import Profile from "./pages/Profile";
import Bmi from "./pages/Calculator/Bmi";
import BasicHealthChecker from "./pages/Calculator/BasicHealthChecker";
import HealthTools from "./pages/Calculator/HealthTools";

import Nutrition from "./pages/Nutrition";
import Reminder from "./pages/Reminder";
import Notifications from "./pages/Notifications";

import Women from "./pages/Women/Women";
import Menstrual from "./pages/Women/Menstrual";
import PCOS from "./pages/Women/PCOS";
import MentalHealth from "./pages/Women/MentalHealth";
import Anemia from "./pages/Women/Anemia";

import PhysicalHealthHome from "./pages/PhysicalHealth/PhysicalHealthHome";
import ExercisePage from "./pages/PhysicalHealth/ExercisePage";
import YogaPage from "./pages/PhysicalHealth/YogaPage";


import ReportSaver from "./pages/ReportSaver";
import Foodies from "./pages/foodie";
import SymptomsPage from "./pages/SymptomsPage";

import HealthChatbot from "./components/HealthChatbot";
import { createContext, useState } from "react";

import About from "./pages/About";
import Contact from "./pages/Contact";

export const GlobalState=createContext()


function App() {
  const location = useLocation(); // get current route

  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    try {
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const[notificationbtn,setNotificationbtn]=useState(false)

  // Pages where chatbot should NOT appear
  const hideChatbotOn = ["/signin", "/signup"];

  return (
    <GlobalState.Provider value={{showProfile,setShowProfile, user, setUser,notificationbtn,setNotificationbtn}}>
      {/* component that displays any uncaught network/server errors */}
      <GlobalError />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/calculator" element={<HealthTools />} />
        <Route path="/basic-checker" element={<BasicHealthChecker />} />
        
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="/women" element={<Women />} />
        <Route path="/women/menstrual" element={<Menstrual />} />
        <Route path="/women/pcos" element={<PCOS />} />
        <Route path="/women/mental" element={<MentalHealth />} />
        <Route path="/women/anemia" element={<Anemia />} />

        <Route path="/physical" element={<PhysicalHealthHome />} />
        <Route path="/physical/exercise" element={<ExercisePage />} />
        <Route path="/physical/yoga" element={<YogaPage />} />
        
        <Route path="/reports" element={<ReportSaver />} />

        <Route path="/symptoms" element={<SymptomsPage />} />
        <Route path="/foodie" element={<Foodies />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Only render chatbot if current page is NOT in hideChatbotOn */}
      {!hideChatbotOn.includes(location.pathname) && <HealthChatbot />}
    </GlobalState.Provider>
  );
}

export default App;
