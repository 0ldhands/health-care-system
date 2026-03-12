export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer  style={{ background: "linear-gradient(135deg, #2e1065, #4c1d95)", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Wave top */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "50px" }}>
          <path d="M0,25 C360,55 1080,0 1440,25 L1440,0 L0,0 Z" fill="#ede9fe" />
        </svg>
      </div>

      <div className="flex justify-center gap-10 px-6 py-10 max-w-5xl mx-auto">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl font-black text-white">Health<span style={{ color: "#a78bfa" }}>Hub</span></span>
          </div>
          <p className="text-sm" style={{ color: "#c4b5fd" }}>
            Your all-in-one wellness companion
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mb-8 mx-auto max-w-xs"
          style={{ background: "linear-gradient(to right, transparent, rgba(167,139,250,0.4), transparent)" }} />


        {/* Divider */}
        <div className="h-px mb-6"
          style={{ background: "linear-gradient(to right, transparent, rgba(167,139,250,0.3), transparent)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: "#9d8ec7" }}>
          <p>© {currentYear} <span className="font-bold text-white">HealthHub</span>. All rights reserved.</p>
          <p>Made with <span style={{ color: "#f472b6" }}>❤️</span> for a healthier you</p>
        </div>
      </div>
    </footer>
  );
}
