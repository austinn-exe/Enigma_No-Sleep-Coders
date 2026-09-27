import React, { useState } from "react";
import { useStore } from "../context/StoreContext.jsx";

const SUPPLIER_SHARE = 0.40;

export default function Partner() {
  const { state, setPrice } = useStore();

  const {
    batches,
    suppliers,
    pricePerL,
  } = state;

  const [priceInput, setPriceInput] = useState(pricePerL);

  // ---------------------------------------------------------
  // TOTAL OIL RECEIVED
  // ---------------------------------------------------------
  const totalL = batches.reduce(
    (total, batch) => total + Number(batch.qty || 0),
    0
  );

  // ---------------------------------------------------------
  // TOTAL VALUE OF ALL OIL
  // ---------------------------------------------------------
  const totalValue = totalL * pricePerL;

  // ---------------------------------------------------------
  // SUPPLIER GETS 40% OF TOTAL VALUE
  // ---------------------------------------------------------
  const totalSupplierPayout =
    totalValue * SUPPLIER_SHARE;

  // ---------------------------------------------------------
  // UPDATE PRICE
  // ---------------------------------------------------------
  function handleUpdate() {
    const newPrice = Number(priceInput);

    if (newPrice > 0) {
      setPrice(newPrice);
    }
  }

  return (
    <section className="view active">

      {/* =====================================================
          PAGE TITLE
          ===================================================== */}
      <h2 className="pageTitle">
        Biodiesel Partner Dashboard
      </h2>


      <div className="grid">

        {/* ===================================================
            PRICE + SUPPLIER PAYMENT
            =================================================== */}
        <div className="card">

          <h2>
            Set intake price
          </h2>

          <div className="sub">
            Set the value paid per litre of collected
            used cooking oil. Suppliers receive 40%
            of the total oil value.
          </div>


          {/* PRICE INPUT */}
          <label>
            Price per litre (₹)
          </label>

          <div className="flex">

            <input
              type="number"
              min="1"
              step="0.5"
              value={priceInput}
              onChange={(e) =>
                setPriceInput(e.target.value)
              }
              style={{
                maxWidth: 140,
              }}
            />

            <button
              className="btn small"
              onClick={handleUpdate}
            >
              Update
            </button>

          </div>


          {/* SUPPLIER SHARE */}
          <div
            style={{
              marginTop: 20,
              padding: "16px 18px",
              borderRadius: 12,
              background:
                "rgba(30, 120, 80, 0.12)",
              border:
                "1px solid rgba(60, 180, 120, 0.2)",
            }}
          >

            <div
              style={{
                fontSize: 13,
                color: "#7892b0",
                marginBottom: 5,
              }}
            >
              Supplier share
            </div>

            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#4fd18b",
              }}
            >
              40%
            </div>

            <div
              style={{
                marginTop: 5,
                fontSize: 12,
                color: "#7189a5",
              }}
            >
              Suppliers receive 40% of the oil value.
            </div>

          </div>


          {/* =================================================
              STATS
              ================================================= */}
          <div
            className="statgrid"
            style={{
              marginTop: 20,
            }}
          >

            {/* LITRES */}
            <div className="stat">

              <div className="num">
                {totalL} L
              </div>

              <div className="lbl">
                Litres received
              </div>

            </div>


            {/* TOTAL VALUE */}
            <div className="stat">

              <div className="num">
                ₹{Math.round(totalValue)}
              </div>

              <div className="lbl">
                Total oil value
              </div>

            </div>


            {/* SUPPLIER PAYOUT */}
            <div className="stat">

              <div className="num">
                ₹{Math.round(totalSupplierPayout)}
              </div>

              <div className="lbl">
                Paid to suppliers (40%)
              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            INCOMING BATCHES
            =================================================== */}
        <div className="card">

          <h2>
            Incoming batches
          </h2>

          <div className="sub">
            Each completed collection appears here
            with its calculated supplier payout.
          </div>


          <table>

            <thead>

              <tr>
                <th>Batch</th>
                <th>Supplier</th>
                <th>Litres</th>
                <th>Oil value</th>
                <th>Supplier payout</th>
              </tr>

            </thead>


            <tbody>

              {/* EMPTY STATE */}
              {batches.length === 0 && (

                <tr>

                  <td
                    colSpan="5"
                    className="empty"
                  >
                    No batches received yet.
                  </td>

                </tr>

              )}


              {/* BATCHES */}
              {[...batches]
                .reverse()
                .map((batch, index) => {

                  const supplier =
                    suppliers.find(
                      (supplier) =>
                        supplier.id === batch.supplierId
                    );

                  const litres =
                    Number(batch.qty || 0);

                  const batchValue =
                    litres * pricePerL;

                  const supplierPayout =
                    batchValue * SUPPLIER_SHARE;

                  return (

                    <tr key={batch.id}>

                      <td>
                        #{batches.length - index}
                      </td>

                      <td>
                        {supplier?.name || "—"}
                      </td>

                      <td>
                        {litres} L
                      </td>

                      <td>
                        ₹{Math.round(batchValue)}
                      </td>

                      <td
                        style={{
                          fontWeight: 700,
                          color: "#4fd18b",
                        }}
                      >
                        ₹{Math.round(
                          supplierPayout
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