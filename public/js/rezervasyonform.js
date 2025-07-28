document.addEventListener("DOMContentLoaded", () => {
  async function menuYukle() {
    const BASE_URL = "https://cafe-del-mar-backend.onrender.com";
    const productsDiv = document.getElementById("products");
    try {
      const res = await fetch(`${BASE_URL}/api/menu`);
      const data = await res.json();

      productsDiv.innerHTML = ""; 
      data.forEach(item => {
        const wrapper = document.createElement("div");
        wrapper.className = "form-check";
        wrapper.innerHTML = `
          <input class="form-check-input" type="checkbox" value="${item.name}" id="product-${item.id}">
          <label class="form-check-label" for="product-${item.id}">
            ${item.name} - <strong>${item.price} ₺</strong>
          </label>
        `;
        productsDiv.appendChild(wrapper);
      });
    } catch (err) {
      console.error("❌ Menü yüklenemedi:", err);
    }
  }
  menuYukle();

  document.getElementById("reservationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const people = document.getElementById("people").value;
    const dateEl = document.getElementById("date");
    const timeEl = document.getElementById("time");
    const area = document.getElementById("area").value;
    const reservationType = document.getElementById("reservationType").value;
    const note = document.getElementById("note").value;
    const date = dateEl.value;
    const time = timeEl.value;

    let isValid = true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    if (selectedDate < today) {
      document.getElementById("dateWarning").classList.remove("d-none");
      isValid = false;
    } else {
      document.getElementById("dateWarning").classList.add("d-none");
    }

    const hour = parseInt(time.split(":")[0]);
    if (hour < 10 || hour > 22) {
      document.getElementById("timeWarning").classList.remove("d-none");
      isValid = false;
    } else {
      document.getElementById("timeWarning").classList.add("d-none");
    }

    if (!isValid) return;

    const modal = new bootstrap.Modal(document.getElementById("reservationModal"));
    const modalSpinner = document.getElementById("modal-spinner");
    const modalCheck = document.getElementById("modal-check");
    const modalText = document.getElementById("modal-text");

    modalSpinner.style.display = "block";
    modalCheck.style.display = "none";
    modalText.textContent = "Rezervasyon oluşturuluyor...";
    modal.show();

    try {
      const response = await fetch(`${BASE_URL}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          people,
          date,
          time,
          area,
          reservationType,
          note,
          products: Array.from(document.querySelectorAll("#products input:checked"))
            .map(cb => cb.value)
        })
      });
    
      const result = await response.json();
    
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Sunucu hatası");
      }
    
      modalSpinner.style.display = "none";
      modalCheck.style.display = "block";
      modalText.textContent = "✅ Rezervasyon başarıyla oluşturuldu!";
      setTimeout(() => modal.hide(), 2000);
    
      document.getElementById("reservationForm").reset();
    } catch (err) {
      console.error("❌ Rezervasyon hatası:", err);
      modalSpinner.style.display = "none";
      modalCheck.style.display = "none";
      modalText.textContent = "❌ Rezervasyon sırasında bir hata oluştu!";
      setTimeout(() => modal.hide(), 2000);
    }
    
  });
});

