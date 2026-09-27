import React, { useState } from "react";
import { useStore } from "../context/StoreContext.jsx";
import { payoutFor } from "../utils/logic.js";

export default function Supplier() {
  const { state, registerSupplier, addListing } = useStore();
  const { suppliers, listings, requests, pricePerL } = state;

  const [regForm, setRegForm] = useState({ name: "", type: "Cafe", addr: "", phone: "" });
  const [listForm, setListForm] = useState({
    supplierId: suppliers[0]?.id || "",
    qty: "",
    type: "Sunflower (used)",
    ready: "",
  });

  function handleRegister(e) {
    e.preventDefault();
    if (!regForm.name || !regForm.addr || !regForm.phone) return;
    const id = registerSupplier(regForm);
    setListForm((f) => ({ ...f, supplierId: id }));
    setRegForm({ name: "", type: "Cafe", addr: "", phone: "" });
  }

  function handleList(e) {
    e.preventDefault();
    if (!listForm.supplierId || !listForm.qty || !listForm.ready) return;
    addListing(listForm);
    setListForm((f) => ({ ...f, qty: "", ready: "" }));
  }

  return (
    <section className="view active">
      <h2 className="pageTitle">Supplier</h2>
      <div className="grid">
        <div className="card">
          <h2>Register your kitchen</h2>
          <div className="sub">One-time setup. Takes under a minute.</div>
          <form onSubmit={handleRegister}>
            <label>Business name</label>
            <input required value={regForm.name} onChange={(e) => setRegForm({ ...regForm, name: e.target.value })} placeholder="e.g. Green Leaf Cafe" />

            <label>Type</label>
            <select value={regForm.type} onChange={(e) => setRegForm({ ...regForm, type: e.target.value })}>
              <option>Cafe</option>
              <option>Restaurant</option>
              <option>School Canteen</option>
              <option>College Canteen</option>
            </select>

            <label>Address / area</label>
            <input required value={regForm.addr} onChange={(e) => setRegForm({ ...regForm, addr: e.target.value })} placeholder="e.g. Andheri West" />

            <label>Contact number</label>
            <input required value={regForm.phone} onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })} placeholder="10-digit number" />

            <button className="btn" type="submit">Register</button>
          </form>
        </div>

        <div className="card">
          <h2>List used oil</h2>
          <div className="sub">
            {suppliers.length ? `Listing on behalf of any registered kitchen (${suppliers.length} registered).` : "Register first to list oil."}
          </div>
          <form onSubmit={handleList}>
            <label>Supplier</label>
            <select value={listForm.supplierId} onChange={(e) => setListForm({ ...listForm, supplierId: e.target.value })}>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <label>Quantity (litres)</label>
            <input required type="number" min="1" value={listForm.qty} onChange={(e) => setListForm({ ...listForm, qty: e.target.value })} placeholder="e.g. 12" />

            <label>Oil type</label>
            <select value={listForm.type} onChange={(e) => setListForm({ ...listForm, type: e.target.value })}>
              <option>Sunflower (used)</option>
              <option>Palm (used)</option>
              <option>Mixed / blended</option>
            </select>

            <label>Ready for pickup by</label>
            <input required type="date" value={listForm.ready} onChange={(e) => setListForm({ ...listForm, ready: e.target.value })} />

            <button className="btn" type="submit">Add listing</button>
          </form>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>My listings</h2>
        <div className="sub">Status updates as collectors act on your listings.</div>
        <table>
          <thead>
            <tr><th>Supplier</th><th>Qty</th><th>Type</th><th>Ready by</th><th>Status</th><th>Payout</th></tr>
          </thead>
          <tbody>
            {listings.length === 0 && (
              <tr><td colSpan="6" className="empty">No listings yet.</td></tr>
            )}
            {[...listings].reverse().map((l) => {
              const supplier = suppliers.find((s) => s.id === l.supplierId);
              const request = requests.find((r) => r.listingId === l.id);
              const status = request ? request.status : l.status;
              const payout = request?.status === "collected" ? payoutFor(request.qty, pricePerL).supplierShare : null;
              return (
                <tr key={l.id}>
                  <td>{supplier?.name || "—"}</td>
                  <td>{l.qty} L</td>
                  <td>{l.type}</td>
                  <td>{l.ready}</td>
                  <td><span className={`badge ${status}`}>{status}</span></td>
                  <td>{payout !== null ? `₹${Math.round(payout)}` : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
