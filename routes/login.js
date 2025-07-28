const express = require("express");
const router = express.Router();

const adminUser = {
  username: "admin",
  password: "ruveyda1303"
};

router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username === adminUser.username && password === adminUser.password) {
    res.status(200).json({ success: true, message: "Giriş başarılı!" });
  } else {
    res.status(401).json({ success: false, message: "Hatalı kullanıcı adı veya şifre!" });
  }
});

module.exports = router;



