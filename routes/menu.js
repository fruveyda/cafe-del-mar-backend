const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dataPath = path.join(__dirname, "../data/menu.json");

router.get("/", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Menü okuma hatası:", err);
      return res.status(500).json({ success: false, message: "Sunucu hatası!" });
    }
    res.json(JSON.parse(data));
  });
});

router.post("/", (req, res) => {
  const { name, category, price } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ success: false, message: "Tüm alanlar zorunlu!" });
  }

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Menü okuma hatası:", err);
      return res.status(500).json({ success: false, message: "Sunucu hatası!" });
    }

    const menu = JSON.parse(data);
    const newItem = {
      id: Date.now(),
      name,
      category,
      price
    };
    menu.push(newItem);

    fs.writeFile(dataPath, JSON.stringify(menu, null, 2), (err) => {
      if (err) {
        console.error("Menü yazma hatası:", err);
        return res.status(500).json({ success: false, message: "Kaydedilemedi!" });
      }
      res.json({ success: true, message: "Ürün eklendi." });
    });
  });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Menü okuma hatası:", err);
      return res.status(500).json({ success: false, message: "Sunucu hatası!" });
    }

    let menu = JSON.parse(data);
    menu = menu.filter(m => m.id !== id);

    fs.writeFile(dataPath, JSON.stringify(menu, null, 2), (err) => {
      if (err) {
        console.error("Menü silme hatası:", err);
        return res.status(500).json({ success: false, message: "Silinemedi!" });
      }
      res.json({ success: true, message: "Ürün silindi." });
    });
  });
});

module.exports = router;

