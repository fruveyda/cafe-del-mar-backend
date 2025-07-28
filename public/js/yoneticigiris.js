document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const message = document.getElementById("loginMessage");

  loginBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      message.textContent = "Lütfen tüm alanları doldurun!";
      message.style.color = "red";
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        message.textContent = "Giriş başarılı! Yönlendiriliyorsunuz...";
        message.style.color = "green";
        setTimeout(() => {
          window.location.href = "admin.html";
        }, 1500);
      } else {
        message.textContent = data.message;
        message.style.color = "red";
      }
    } catch (error) {
      message.textContent = "Sunucu hatası!";
      message.style.color = "red";
      console.error("Hata:", error);
    }
  });
});



  
  
  