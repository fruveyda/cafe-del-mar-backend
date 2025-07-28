const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// ✅ Orta katmanlar
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

// ✅ Rotalar
const reservationRoutes = require("./routes/reservations");
app.use("/api/reservations", reservationRoutes);

const menuRoutes = require("./routes/menu");
app.use("/api/menu", menuRoutes);

const loginRoutes = require("./routes/login");
app.use("/api/login", loginRoutes);

// ✅ Sayfa yönlendirmeleri
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "anasayfa.html"));
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

// ✅ Sunucuyu çalıştır
app.listen(PORT, () => {
  console.log(`✅ Server çalışıyor: http://localhost:${PORT}`);
});




