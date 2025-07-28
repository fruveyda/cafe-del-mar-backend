const express = require("express");
const fs = require("fs");
const router = express.Router();

// ✅ RAM'deki rezervasyonlara erişim
router.get("/", (req, res) => {
  res.json(req.reservations);
});

// ✅ Rezervasyon ekleme
router.post("/", (req, res) => {
  const { name, phone, people, date, time, area, reservationType, note, products } = req.body;

  if (!name || !phone || !people || !date || !time || !area || !reservationType) {
    return res.status(400).json({ success: false, message: "Zorunlu alanlar eksik!" });
  }

  const newReservation = {
    id: Date.now(),
    name,
    phone,
    people,
    date,
    time,
    area,
    reservationType,
    note: note || "",
    products: products || []
  };

  req.reservations.push(newReservation);

  // ✅ JSON dosyasına yaz (Render yazmasına izin verirse)
  try {
    fs.writeFileSync(req.reservationsPath, JSON.stringify(req.reservations, null, 2), "utf-8");
  } catch (err) {
    console.warn("⚠️ JSON dosyasına yazılamadı ama RAM'de kayıt başarılı:", err.message);
  }

  console.log("✅ Yeni rezervasyon RAM'e kaydedildi:", newReservation);
  res.status(201).json({ success: true, data: newReservation });
});

// ✅ Rezervasyon silme
router.delete("/:id", (req, res) => {
  const id = String(req.params.id);
  const index = req.reservations.findIndex(r => String(r.id) === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Rezervasyon bulunamadı" });
  }

  req.reservations.splice(index, 1);

  // ✅ JSON dosyasına yeniden yaz
  try {
    fs.writeFileSync(req.reservationsPath, JSON.stringify(req.reservations, null, 2), "utf-8");
  } catch (err) {
    console.warn("⚠️ Silme RAM'de yapıldı ama dosyaya yazılamadı:", err.message);
  }

  console.log(`🗑️ Rezervasyon silindi: ${id}`);
  res.json({ success: true, message: "Rezervasyon silindi" });
});

module.exports = router;

