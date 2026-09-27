import React from "react";
import { useStore } from "../context/StoreContext";

const VIEWS = ["home", "supplier", "collector", "partner", "impact"];

export default function Navbar({ view, setView }) {
  const { resetAllData } = useStore();

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset EVERYTHING? All OilLoop data will be deleted."
    );

    if (confirmed) {
      resetAllData();
    }
  };

  return (
    <header className="header">
      <div className="headbar">
        <div className="brand">
          <span className="drop" />
          OilLoop AI
        </div>

        <nav>
          {VIEWS.map((v) => (
            <button
              key={v}
              className={v === view ? "active" : ""}
              onClick={() => setView(v)}
            >
              {v[0].toUpperCase() + v.slice(1)}
            </button>
          ))}

          {/* RESET BUTTON */}
          <button
            className="reset-button"
            onClick={handleReset}
          >
            Reset Everything
          </button>
        </nav>
      </div>
    </header>
  );
}