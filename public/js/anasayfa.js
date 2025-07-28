document.addEventListener("DOMContentLoaded", () => {
  const kahveler = [
    { ad: "Latte", aciklama: "Yumuşak içimli, süt köpüğü ile zenginleşen lezzet." },
    { ad: "Espresso", aciklama: "Yoğun aromalı, güçlü kahve deneyimi." },
    { ad: "Mocha", aciklama: "Çikolata ile kahvenin eşsiz uyumu." },
    { ad: "Cappuccino", aciklama: "Bol köpüklü, klasik İtalyan kahvesi." }
  ];

  const rastgeleKahve = kahveler[Math.floor(Math.random() * kahveler.length)];
  document.querySelector(".coffee-name").textContent = rastgeleKahve.ad;
  document.querySelector(".coffee-desc").textContent = rastgeleKahve.aciklama;

  
  const oneCikanUrunler = [
    { ad: "Cheesecake", aciklama: "New York usulü, taze orman meyveli.", resim: "images/cheesecake.png" },
    { ad: "Soğuk Latte", aciklama: "Buzlu serinlik ve kahve keyfi.", resim: "images/icelatte.png" },
    { ad: "Tiramisu", aciklama: "Kahve aromalı İtalyan tatlısı.", resim: "images/tiramisu.png" }
  ];

  const oneCikanlarDiv = document.getElementById("oneCikanlar");
  oneCikanUrunler.forEach(urun => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${urun.resim}" class="card-img-top" alt="${urun.ad}">
        <div class="card-body text-center">
          <h5 class="card-title">${urun.ad}</h5>
          <p class="card-text">${urun.aciklama}</p>
        </div>
      </div>
    `;
    oneCikanlarDiv.appendChild(col);
  });
});
