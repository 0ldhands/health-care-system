export default function Loader() {
  const loaderStyles = `
    .loader-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 50%, #ddd6fe 100%);
      font-family: 'Segoe UI', sans-serif;
      z-index: 9999;
    }

    /* ── Icon ── */
    .loader-icon {
      font-size: 40px;
      animation: loader-pulse 1.6s ease-in-out infinite;
    }
    @keyframes loader-pulse {
      0%, 100% { transform: scale(1);   opacity: 1; }
      50%       { transform: scale(1.2); opacity: 0.7; }
    }

    /* ── Ring ── */
    .loader-ring {
      position: relative;
      width: 56px;
      height: 56px;
    }
    .loader-ring-outer {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 3px solid #ddd6fe;
      border-top-color: #7c3aed;
      animation: loader-spin 0.9s linear infinite;
    }
    .loader-ring-inner {
      position: absolute;
      inset: 8px;
      border-radius: 50%;
      border: 3px solid #ede9fe;
      border-bottom-color: #a78bfa;
      animation: loader-spin 0.6s linear infinite reverse;
    }
    @keyframes loader-spin {
      to { transform: rotate(360deg); }
    }

    /* ── Text ── */
    .loader-text {
      font-size: 14px;
      font-weight: 700;
      color: #4c1d95;
      letter-spacing: 0.03em;
    }

    /* ── Dots ── */
    .loader-dots { display: inline-flex; gap: 4px; margin-left: 2px; }
    .loader-dot {
      width: 4px; height: 4px;
      border-radius: 50%;
      background: #7c3aed;
      animation: loader-bounce 1.2s ease-in-out infinite;
    }
    .loader-dot:nth-child(2) { animation-delay: 0.2s; }
    .loader-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes loader-bounce {
      0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
      40%           { transform: translateY(-5px); opacity: 1;   }
    }

    /* ── Bar ── */
    .loader-bar-track {
      width: 140px;
      height: 4px;
      border-radius: 999px;
      background: #ddd6fe;
      overflow: hidden;
    }
    .loader-bar-fill {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #7c3aed, #a78bfa);
      animation: loader-bar 1.6s ease-in-out infinite;
    }
    @keyframes loader-bar {
      0%   { width: 0%;    margin-left: 0%; }
      50%  { width: 70%;   margin-left: 15%; }
      100% { width: 0%;    margin-left: 100%; }
    }
  `;

  return (
    <>
      <style>{loaderStyles}</style>
      <div className="loader-overlay">

        {/* Pulsing icon */}
        <div className="loader-icon">🩺</div>

        {/* Dual ring */}
        <div className="loader-ring">
          <div className="loader-ring-outer" />
          <div className="loader-ring-inner" />
        </div>

        {/* Text + bouncing dots */}
        <p className="loader-text">
          Loading
          <span className="loader-dots">
            <span className="loader-dot" />
            <span className="loader-dot" />
            <span className="loader-dot" />
          </span>
        </p>

        {/* Sliding bar */}
        <div className="loader-bar-track">
          <div className="loader-bar-fill" />
        </div>

      </div>
    </>
  );
}