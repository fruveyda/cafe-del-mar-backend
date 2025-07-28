const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/reservations.json");

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

router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const reservations = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = reservations.findIndex(r => String(r.id) === String(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Rezervasyon bulunamadı" });
    }

    reservations.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(reservations, null, 2), "utf-8");

    console.log(`🗑️ Rezervasyon silindi: ${id}`);
    res.json({ success: true, message: "Rezervasyon silindi" });
  } catch (err) {
    console.error("❌ Rezervasyon silinirken hata:", err);
    res.status(500).json({ success: false, message: "Silme işlemi sırasında hata oluştu" });
  }
});

module.exports = router;
