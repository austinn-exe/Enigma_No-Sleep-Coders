// Demo data so every dashboard has something to show immediately.
// In the MERN version, this shape mirrors what your /api/suppliers and
// /api/listings endpoints should return.

export const seedSuppliers = [
  { id: "s1", name: "Starbucks", type: "Cafe", addr: "Andheri West", phone: "9800000001", x: 20, y: 30, history: [8, 10, 9, 11, 7, 12, 10] },
  { id: "s2", name: "Gupta sandwich", type: "Cafe", addr: "Andheri East", phone: "9800000002", x: 60, y: 25, history: [14, 16, 15, 13, 17, 15, 18] },
  { id: "s3", name: "SIES Canteen", type: "College Canteen", addr: "Dadar", phone: "9800000003", x: 80, y: 60, history: [20, 22, 19, 24, 21, 23, 25] },
  { id: "s4", name: "Rangoli restaurant", type: "Restaurant", addr: "Bandra", phone: "9800000004", x: 40, y: 70, history: [6, 7, 5, 8, 6, 9, 7] },
];

export const seedListings = [
  { id: "l1", supplierId: "s1", qty: 11, type: "Sunflower (used)", ready: "2026-10-02", status: "pending" },
  { id: "l2", supplierId: "s2", qty: 18, type: "Mixed / blended", ready: "2026-09-29", status: "pending" },
  { id: "l3", supplierId: "s3", qty: 24, type: "Palm (used)", ready: "2026-09-28", status: "pending" },
];
