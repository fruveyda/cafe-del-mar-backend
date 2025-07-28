document.addEventListener("DOMContentLoaded", () => {
  const ekipUyeleri = [
    { ad: "Ahmet Yılmaz", pozisyon: "Barista", resim: "images/barista.png" },
    { ad: "Elif Demir", pozisyon: "Tatlı Şefi", resim: "images/tatlisefi.png" },
    { ad: "Mehmet Kaya", pozisyon: "Mutfak Şefi", resim: "images/mutfaksefi.png" }
  ];

  const ekipDiv = document.getElementById("ekip");
  ekipUyeleri.forEach(kişi => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card h-100 shadow">
        <img src="${kişi.resim}" class="card-img-top" alt="${kişi.ad}">
        <div class="card-body">
          <h5 class="card-title">${kişi.ad}</h5>
          <p class="card-text">${kişi.pozisyon}</p>
        </div>
      </div>
    `;
    ekipDiv.appendChild(col);
  });
});

  