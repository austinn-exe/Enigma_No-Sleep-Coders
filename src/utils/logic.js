// Core "Smart Collection" logic. Kept framework-free on purpose so you can
// lift these straight into an Express controller later without rewriting them.

export function uid(prefix) {
  return prefix + Math.random().toString(36).slice(2, 7);
}

// Ranks a listing by urgency (days until "ready by") + volume.
export function urgencyScore(listing) {
  const days = (new Date(listing.ready) - new Date()) / 86400000;
  const urgency = days <= 0 ? 40 : Math.max(0, 40 - days * 6);
  return Math.round(listing.qty * 1.2 + urgency);
}

export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Nearest-neighbour route from a depot at (0,0) through all accepted stops.
// Swap in real lat/lng + a maps API distance matrix for production.
export function buildRoute(activeRequests, suppliers) {
  const stops = activeRequests
    .map((r) => ({ request: r, supplier: suppliers.find((s) => s.id === r.supplierId) }))
    .filter((o) => o.supplier);

  const depot = { x: 0, y: 0 };
  const remaining = [...stops];
  const order = [];
  let current = depot;
  let total = 0;

  while (remaining.length) {
    remaining.sort((a, b) => distance(current, a.supplier) - distance(current, b.supplier));
    const next = remaining.shift();
    const leg = distance(current, next.supplier);
    total += leg;
    order.push({ ...next, leg });
    current = next.supplier;
  }

  return { order, total };
}

// Simple average-of-history forecast per supplier.
export function predictAvailability(suppliers) {
  return suppliers
    .filter((s) => s.history && s.history.length)
    .map((s) => ({
      name: s.name,
      avg: s.history.reduce((a, b) => a + b, 0) / s.history.length,
    }));
}

export function payoutFor(qty, pricePerL, sharePct = 0.3) {
  const value = qty * pricePerL;
  return { value, supplierShare: value * sharePct };
}
