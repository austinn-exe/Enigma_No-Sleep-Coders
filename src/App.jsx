import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Supplier from "./components/Supplier.jsx";
import Collector from "./components/Collector.jsx";
import Partner from "./components/Partner.jsx";
import Impact from "./components/Impact.jsx";

export default function App() {
  const [view, setView] = useState("home");

  return (
    <>
      <Navbar view={view} setView={setView} />
      <div className="wrap">
        {view === "home" && <Home setView={setView} />}
        {view === "supplier" && <Supplier />}
        {view === "collector" && <Collector />}
        {view === "partner" && <Partner />}
        {view === "impact" && <Impact />}
      </div>
    </>
  );
}
