document.addEventListener("DOMContentLoaded", () => {
  const rezervasyonKartlari = document.getElementById("rezervasyonKartlari");
  const menuKartlari = document.getElementById("menuKartlari");
  const yeniUrunForm = document.getElementById("yeniUrunForm");

  async function rezervasyonlariYukle() {
    rezervasyonKartlari.innerHTML = "";
    try {
      const res = await fetch("/api/reservations");
      const data = await res.json();

      data.forEach(r => {
        const div = document.createElement("div");
        div.className = "col-md-4";
        div.innerHTML = `
          <div class="reservation-card">
            <p><strong>Ad:</strong> ${r.name}</p>
            <p><strong>Telefon:</strong> ${r.phone}</p>
            <p><strong>Kişi:</strong> ${r.people}</p>
            <p><strong>Tarih:</strong> ${r.date} - ${r.time}</p>
            <p><strong>Alan:</strong> ${r.area}</p>
            <p><strong>Ürünler:</strong> ${r.products ? r.products.join(", ") : "-"}</p>
            <p><strong>Not:</strong> ${r.note}</p>
            <button class="admin-btn btn-sm" data-id="${r.id}">Sil</button>
          </div>
        `;
        rezervasyonKartlari.appendChild(div);
      });

      
      document.querySelectorAll("#rezervasyonKartlari .admin-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          if (confirm("Bu rezervasyonu silmek istediğinize emin misiniz?")) {
            await fetch(`/api/reservations/${id}`, { method: "DELETE" });
            rezervasyonlariYukle();
          }
        });
      });
    } catch (err) {
      console.error("Rezervasyon yüklenemedi:", err);
    }
  }

  async function menuYukle() {
    menuKartlari.innerHTML = "";
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();

      data.forEach(m => {
        const div = document.createElement("div");
        div.className = "col-md-3";
        div.innerHTML = `
          <div class="reservation-card">
            <p><strong>${m.name}</strong></p>
            <p>Kategori: ${m.category}</p>
            <p>Fiyat: ${m.price} ₺</p>
            <button class="admin-btn btn-sm" data-id="${m.id}">Sil</button>
          </div>
        `;
        menuKartlari.appendChild(div);
      });

      
      document.querySelectorAll("#menuKartlari .admin-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
            await fetch(`/api/menu/${id}`, { method: "DELETE" });
            menuYukle();
          }
        });
      });
    } catch (err) {
      console.error("Menü yüklenemedi:", err);
    }
  }

  
  yeniUrunForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const yeniUrun = {
      name: document.getElementById("urunAdi").value.trim(),
      category: document.getElementById("urunKategori").value.trim(),
      price: parseFloat(document.getElementById("urunFiyat").value)
    };

    try {
      await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(yeniUrun)
      });
      yeniUrunForm.reset();
      menuYukle();
    } catch (err) {
      console.error("Ürün eklenemedi:", err);
    }
  });

  rezervasyonlariYukle();
  menuYukle();
});



  