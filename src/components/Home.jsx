import React from "react";

export default function Home({ setView }) {
  const roles = [
    { v: "supplier", tag: "For kitchens", title: "Supplier", desc: "List used oil, get picked up, get paid 30% of resale value." },
    { v: "collector", tag: "For collectors", title: "Collection dashboard", desc: "See what's ready, in what order, and what's coming next." },
    { v: "partner", tag: "For biodiesel plants", title: "Partner intake", desc: "Track incoming batches, set price, review supply." },
    { v: "impact", tag: "For everyone", title: "Impact", desc: "Total oil diverted, CO2 avoided, money returned to suppliers." },
  ];

  return (
    <section className="view active">
      <div className="hero">
        <h1>Turn used cooking oil into paid pickups.</h1>
        <p>
          OilLoop connects cafes, restaurants and canteens with local collectors and biodiesel
          plants — so oil that used to go down the drain now earns everyone a share.
        </p>
      </div>
      <div className="roles">
        {roles.map((r) => (
          <button key={r.v} className="rolecard" onClick={() => setView(r.v)}>
            <div className="tag">{r.tag}</div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
