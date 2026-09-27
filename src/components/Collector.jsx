import React, { useMemo } from "react";
import { useStore } from "../context/StoreContext.jsx";
import { urgencyScore, buildRoute, predictAvailability } from "../utils/logic.js";

export default function Collector() {
  const { state, acceptListing, completeRequest } = useStore();
  const { listings, suppliers, requests } = state;

  const pending = useMemo(
    () =>
      listings
        .filter((l) => l.status === "pending")
        .map((l) => ({ listing: l, score: urgencyScore(l) }))
        .sort((a, b) => b.score - a.score),
    [listings]
  );

  const activeRequests = useMemo(() => requests.filter((r) => r.status === "requested"), [requests]);
  const route = useMemo(() => buildRoute(activeRequests, suppliers), [activeRequests, suppliers]);
  const predictions = useMemo(() => predictAvailability(suppliers), [suppliers]);
  const maxPred = Math.max(...predictions.map((p) => p.avg), 1);

  return (
    <section className="view active">
      <h2 className="pageTitle" style={{ marginBottom: 4 }}>Smart Collection Dashboard</h2>
      <div className="sub" style={{ marginBottom: 16 }}>Ranked by urgency and volume — the core of OilLoop.</div>

      <div className="grid">
        <div className="card">
          <div className="flex">
            <h2>Pending pickups</h2>
            <span className="right pill">{pending.length} open</span>
          </div>
          <table>
            <thead><tr><th>Supplier</th><th>Qty</th><th>Score</th><th>Ready by</th><th></th></tr></thead>
            <tbody>
              {pending.length === 0 && <tr><td colSpan="5" className="empty">Nothing pending — all caught up.</td></tr>}
              {pending.map(({ listing, score }) => {
                const supplier = suppliers.find((s) => s.id === listing.supplierId);
                return (
                  <tr key={listing.id}>
                    <td>{supplier?.name || "—"}</td>
                    <td>{listing.qty} L</td>
                    <td>{score}</td>
                    <td>{listing.ready}</td>
                    <td><button className="btn small" onClick={() => acceptListing(listing.id)}>Accept</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="prediction-card">
  <div className="prediction-header">
    <div>
      <div className="prediction-eyebrow">
        DEMAND & SUPPLY FORECAST
      </div>

      <h2>Future availability prediction</h2>

      <p>
        Projected oil availability based on each supplier's
        collection history.
      </p>
    </div>

    <div className="prediction-badge">
      <span>Next 7 days</span>
      <strong>
        {predictions.reduce((sum, p) => sum + p.avg, 0).toFixed(0)} L
      </strong>
    </div>
  </div>

  {predictions.length === 0 ? (
    <div className="prediction-empty">
      <div className="prediction-empty-icon">📈</div>
      <strong>Not enough collection data</strong>
      <span>
        Collect a few batches to generate future availability predictions.
      </span>
    </div>
  ) : (
    <div className="prediction-chart">
      {predictions.map((p) => {
        const percentage = Math.max(
          8,
          (p.avg / maxPred) * 100
        );

        return (
          <div className="prediction-column" key={p.name}>
            <div className="prediction-value">
              {p.avg.toFixed(0)} L
            </div>

            <div className="prediction-bar-area">
              <div
                className="prediction-bar"
                style={{
                  height: `${percentage}%`
                }}
              >
                <div className="prediction-glow"></div>
              </div>
            </div>

            <div className="prediction-label">
              {p.name}
            </div>
          </div>
        );
      })}
    </div>
  )}

  {predictions.length > 0 && (
    <div className="prediction-footer">
      <div>
        <span className="forecast-dot"></span>
        Historical collection trend
      </div>

      <span>
        Forecast updates automatically
      </span>
    </div>
  )}
</div>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>

        <div className="card">
          <h2>Active collection requests</h2>
          <div className="sub">Mark collected once oil is picked up — this creates a batch for the biodiesel partner.</div>
          <table>
            <thead><tr><th>Supplier</th><th>Qty</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {requests.length === 0 && <tr><td colSpan="4" className="empty">No requests yet — accept a pickup above.</td></tr>}
              {[...requests].reverse().map((r) => {
                const supplier = suppliers.find((s) => s.id === r.supplierId);
                return (
                  <tr key={r.id}>
                    <td>{supplier?.name || "—"}</td>
                    <td>{r.qty} L</td>
                    <td><span className={`badge ${r.status}`}>{r.status}</span></td>
                    <td>
                      {r.status === "requested" && (
                        <button className="btn small" onClick={() => completeRequest(r.id)}>Mark collected</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
