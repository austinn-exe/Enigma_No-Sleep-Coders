import React, { createContext, useContext, useEffect, useState } from "react";
import { seedSuppliers, seedListings } from "../data/seedData.js";
import { uid } from "../utils/logic.js";

const STORAGE_KEY = "oilloop_state_v1";
const StoreContext = createContext(null);

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore corrupt storage */
  }

  return {
    suppliers: seedSuppliers,
    listings: seedListings,
    requests: [],
    batches: [],
    pricePerL: 45,
  };
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadInitialState);

  // Save application data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage full or unavailable — non-fatal for a demo */
    }
  }, [state]);

  // ---- Actions -----------------------------------------------------------

  function registerSupplier({ name, type, addr, phone }) {
    const supplier = {
      id: uid("s"),
      name,
      type,
      addr,
      phone,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      history: [],
    };

    setState((s) => ({
      ...s,
      suppliers: [...s.suppliers, supplier],
    }));

    return supplier.id;
  }

  function addListing({ supplierId, qty, type, ready }) {
    const listing = {
      id: uid("l"),
      supplierId,
      qty: Number(qty),
      type,
      ready,
      status: "pending",
    };

    setState((s) => ({
      ...s,
      listings: [...s.listings, listing],
    }));
  }

  function acceptListing(listingId) {
    setState((s) => {
      const listing = s.listings.find((l) => l.id === listingId);

      if (!listing) return s;

      const request = {
        id: uid("r"),
        listingId,
        supplierId: listing.supplierId,
        qty: listing.qty,
        status: "requested",
      };

      return {
        ...s,
        listings: s.listings.map((l) =>
          l.id === listingId
            ? { ...l, status: "requested" }
            : l
        ),
        requests: [...s.requests, request],
      };
    });
  }

  function completeRequest(requestId) {
    setState((s) => {
      const request = s.requests.find((r) => r.id === requestId);

      if (!request) return s;

      const batch = {
        id: uid("b"),
        supplierId: request.supplierId,
        qty: request.qty,
      };

      return {
        ...s,

        requests: s.requests.map((r) =>
          r.id === requestId
            ? { ...r, status: "collected" }
            : r
        ),

        listings: s.listings.map((l) =>
          l.id === request.listingId
            ? { ...l, status: "collected" }
            : l
        ),

        suppliers: s.suppliers.map((sup) =>
          sup.id === request.supplierId
            ? {
                ...sup,
                history: [...sup.history, request.qty],
              }
            : sup
        ),

        batches: [...s.batches, batch],
      };
    });
  }

  function updateBatchTesting(batchId, testResults) {
    setState((s) => ({
      ...s,

      batches: s.batches.map((batch) =>
        batch.id === batchId
          ? {
              ...batch,

              testing: {
                ...testResults,
                ffa: Number(testResults.ffa),
                moisture: Number(testResults.moisture),
                impurities: Number(testResults.impurities),
                testedAt: new Date().toISOString(),
              },
            }
          : batch
      ),
    }));
  }

  function setPrice(pricePerL) {
    setState((s) => ({
      ...s,
      pricePerL: Number(pricePerL),
    }));
  }

  // ---- RESET EVERYTHING --------------------------------------------------
  // Returns the application to its original starting state.
  function resetAllData() {
    try {
      // Remove the saved OilLoop data
      localStorage.removeItem(STORAGE_KEY);

      // Also clear any other localStorage data created by the app
      localStorage.clear();
    } catch (e) {
      console.error("Failed to clear localStorage:", e);
    }

    // Restore the original seed data immediately
    setState({
      suppliers: seedSuppliers,
      listings: seedListings,
      requests: [],
      batches: [],
      pricePerL: 45,
    });

    // Reload so every component starts completely fresh
    window.location.reload();
  }

  const value = {
    state,

    registerSupplier,
    addListing,
    acceptListing,
    completeRequest,
    updateBatchTesting,
    setPrice,

    // Make reset available to every component
    resetAllData,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);

  if (!ctx) {
    throw new Error(
      "useStore must be used inside <StoreProvider>"
    );
  }

  return ctx;
}