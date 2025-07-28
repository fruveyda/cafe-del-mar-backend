const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ RAM'de rezervasyonları tutmak için değişken
const reservationsPath = path.join(__dirname, "data/reservations.json");
let reservations = [];

// 🚀 Uygulama ilk çalıştığında JSON dosyasından oku
if (fs.existsSync(reservationsPath)) {
  try {
    reservations = JSON.parse(fs.readFileSync(reservationsPath, "utf-8"));
    console.log("✅ Rezervasyonlar RAM'e yüklendi");
  } catch (err) {
    console.error("❌ JSON okuma hatası:", err);
  }
}

// ✅ Middleware ile RAM'deki veriyi route'lara aktar
app.use((req, res, next) => {
  req.reservations = reservations;
  req.reservationsPath = reservationsPath;
  next();
});

// 🔗 Route'lar
const reservationRoutes = require("./routes/reservations");
app.use("/api/reservations", reservationRoutes);

const menuRoutes = require("./routes/menu");
app.use("/api/menu", menuRoutes);

const loginRoutes = require("./routes/login");
app.use("/api/login", loginRoutes);

// 🌐 Sayfa Yönlendirmeleri
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/rezervasyon-form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "rezervasyon-form.html"));
});
app.get("/hakkimizda", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hakkimizda.html"));
});
app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "menu.html"));
});
app.get("/yonetici-giris", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "yonetici-giris.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// 🚀 Sunucu çalıştır
app.listen(PORT, () => {
  console.log(`✅ Server çalışıyor: http://localhost:${PORT}`);
});





