import React, { useMemo } from "react";
import { useStore } from "../context/StoreContext.jsx";

export default function Impact() {
  const { state } = useStore();
  const { batches, suppliers, pricePerL } = state;

  // ---------------------------------------------------------
  // TOTAL COLLECTION
  // ---------------------------------------------------------
  const totalL = batches.reduce((total, batch) => {
    return total + Number(batch.qty || 0);
  }, 0);

  // ---------------------------------------------------------
  // COLLECTION BY SUPPLIER TYPE
  // ---------------------------------------------------------
  const byType = useMemo(() => {
    const map = {};

    batches.forEach((batch) => {
      const supplier = suppliers.find(
        (supplier) => supplier.id === batch.supplierId
      );

      if (!supplier) return;

      const type = supplier.type || "Other";
      const quantity = Number(batch.qty || 0);

      map[type] = (map[type] || 0) + quantity;
    });

    // Convert object into array and sort highest → lowest
    return Object.entries(map)
      .map(([type, liters]) => ({
        type,
        liters,
      }))
      .sort((a, b) => b.liters - a.liters);
  }, [batches, suppliers]);

  // Highest collection amount
  const maxType = Math.max(
    ...byType.map((item) => item.liters),
    1
  );

  // Highest contributing supplier type
  const highestType = byType.length > 0
    ? byType[0].type
    : "—";

  // Average collection per supplier type
  const averagePerType = byType.length > 0
    ? Math.round(totalL / byType.length)
    : 0;

  // ---------------------------------------------------------
  // DASHBOARD
  // ---------------------------------------------------------
  return (
    <section className="view active">

      {/* =====================================================
          PAGE TITLE
          ===================================================== */}
      <h2 className="pageTitle">
        Impact Dashboard
      </h2>


      {/* =====================================================
          TOP STATISTICS
          ===================================================== */}
      <div className="statgrid">

        <div className="stat">
          <div className="num">
            {totalL} L
          </div>

          <div className="lbl">
            Used oil diverted from drains
          </div>
        </div>


        <div className="stat">
          <div className="num">
            {Math.round(totalL * 2.5)} kg
          </div>

          <div className="lbl">
            Estimated CO₂e avoided
          </div>
        </div>


        <div className="stat">
          <div className="num">
            ₹{Math.round(totalL * pricePerL * 0.3)}
          </div>

          <div className="lbl">
            Paid out to suppliers
          </div>
        </div>


        <div className="stat">
          <div className="num">
            {suppliers.length}
          </div>

          <div className="lbl">
            Active suppliers
          </div>
        </div>

      </div>


      {/* =====================================================
          COLLECTION CHART
          ===================================================== */}
      <section className="impact-chart-card">

        {/* ---------------- HEADER ---------------- */}
        <div className="impact-chart-top">

          <div>

            <div className="impact-eyebrow">
              COLLECTION OVERVIEW
            </div>

            <h2>
              Oil collection by supplier type
            </h2>

            <p>
              Track how much used cooking oil has been
              collected from each supplier category.
            </p>

          </div>


          {/* TOTAL COLLECTION */}
          <div className="impact-total-box">

            <span>
              Total collected
            </span>

            <strong>
              {totalL} L
            </strong>

          </div>

        </div>


        {/* =================================================
            COLLECTION SUMMARY
            ================================================= */}
        {byType.length > 0 && (

          <div className="impact-chart-summary">

            {/* SUPPLIER TYPES */}
            <div className="impact-summary-item">

              <span className="summary-icon">
                ◉
              </span>

              <div>

                <small>
                  Supplier types
                </small>

                <strong>
                  {byType.length}
                </strong>

              </div>

            </div>


            {/* HIGHEST COLLECTION */}
            <div className="impact-summary-item">

              <span className="summary-icon">
                ↗
              </span>

              <div>

                <small>
                  Highest collection
                </small>

                <strong>
                  {highestType}
                </strong>

              </div>

            </div>


            {/* AVERAGE */}
            <div className="impact-summary-item">

              <span className="summary-icon">
                ≈
              </span>

              <div>

                <small>
                  Average per type
                </small>

                <strong>
                  {averagePerType} L
                </strong>

              </div>

            </div>

          </div>

        )}


        {/* =================================================
            CHART
            ================================================= */}
        {byType.length === 0 ? (

          /* ---------------- EMPTY STATE ---------------- */

          <div className="impact-empty">

            <div className="empty-icon">
              ◎
            </div>

            <h3>
              No collection data yet
            </h3>

            <p>
              Once oil is collected from suppliers,
              the breakdown will appear here.
            </p>

          </div>

        ) : (

          /* ---------------- BAR CHART ---------------- */

          <div className="impact-bar-chart">

            {byType.map((item, index) => {

              // Percentage of total collection
              const totalPercentage =
                totalL > 0
                  ? Math.round(
                      (item.liters / totalL) * 100
                    )
                  : 0;

              // Width relative to largest supplier type
              const barWidth =
                maxType > 0
                  ? (item.liters / maxType) * 100
                  : 0;

              return (

                <div
                  className="impact-bar-row"
                  key={item.type}
                >

                  {/* RANK */}
                  <div className="impact-rank">
                    {String(index + 1).padStart(2, "0")}
                  </div>


                  {/* BAR CONTENT */}
                  <div className="impact-bar-content">

                    {/* LABEL + VALUES */}
                    <div className="impact-bar-heading">

                      <div className="impact-type">

                        <span className="impact-dot" />

                        <span>
                          {item.type}
                        </span>

                      </div>


                      <div className="impact-values">

                        <strong>
                          {item.liters} L
                        </strong>

                        <span>
                          {totalPercentage}%
                        </span>

                      </div>

                    </div>


                    {/* BAR */}
                    <div className="impact-track">

                      <div
                        className="impact-fill"
                        style={{
                          width: `${Math.max(
                            5,
                            barWidth
                          )}%`,
                        }}
                      >

                        <span />

                      </div>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        )}


        {/* =================================================
            FOOTER
            ================================================= */}
        <div className="impact-chart-footer">

          <div>

            <span className="footer-dot" />

            <span>
              Used cooking oil recovered
            </span>

          </div>


          <span>
            Live from collection data
          </span>

        </div>

      </section>


      {/* =====================================================
          INFORMATION NOTE
          ===================================================== */}
      <div className="note">

        CO₂e estimate uses ~2.5 kg CO₂-equivalent avoided
        per litre of UCO diverted to biodiesel versus
        landfill/drain disposal — an approximation for
        demo purposes, not a certified figure.

      </div>

    </section>
  );
}