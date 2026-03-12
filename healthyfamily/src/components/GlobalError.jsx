import { useEffect, useState } from "react";
import "./GlobalError.css";

export default function GlobalError() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (e) => {
      setMessage(e.detail);
    };
    window.addEventListener("globalError", handler);
    return () => window.removeEventListener("globalError", handler);
  }, []);

  if (!message) return null;

  return (
    <div className="global-error-banner">
      <span>{message}</span>
      <button onClick={() => setMessage("")} className="close-btn">
        ×
      </button>
    </div>
  );
}
