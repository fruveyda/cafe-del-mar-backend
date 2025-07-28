const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/reservations.json");

// ✅ Rezervasyonları getir
router.get("/", (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]), "utf-8");
    }
    const reservations = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.json(reservations);
  } catch (err) {
    console.error("❌ Rezervasyonlar okunamadı:", err);
    res.status(500).json({ success: false, message: "Rezervasyonlar okunamadı" });
  }
});

// ✅ Yeni rezervasyon ekle
router.post("/", (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]), "utf-8");
    }

    const reservations = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");

    const newReservation = {
      id: Date.now(),
      name: req.body.name,
      phone: req.body.phone,
      people: req.body.people,
      date: req.body.date,
      time: req.body.time,
      area: req.body.area,
      reservationType: req.body.reservationType,
      note: req.body.note || "",
      products: req.body.products || []
    };

    reservations.push(newReservation);

    fs.writeFileSync(filePath, JSON.stringify(reservations, null, 2), "utf-8");

    console.log("✅ Yeni rezervasyon kaydedildi:", newReservation);
    res.status(201).json({ success: true, data: newReservation });
  } catch (err) {
    console.error("❌ Rezervasyon eklenirken hata:", err);
    res.status(500).json({ success: false, message: "Rezervasyon eklenemedi" });
  }
});

module.exports = router;


