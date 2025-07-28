const menuContainer = document.getElementById("menuContainer");

async function getMenu(category = "") {
  let url = "/api/menu";
  if (category) url += `/kategori/${category}`;

  const res = await fetch(url);
  const data = await res.json();
  renderMenu(data);
}

function renderMenu(items) {
  menuContainer.innerHTML = "";

  if (items.length === 0) {
    menuContainer.innerHTML = "<p class='text-center'>Ürün bulunamadı.</p>";
    return;
  }

  items.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm menu-card";

    const img = document.createElement("img");
    img.src = item.image;
    img.className = "card-img-top";
    img.alt = item.name;

    const body = document.createElement("div");
    body.className = "card-body text-center";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = item.name;

    const price = document.createElement("p");
    price.className = "card-text fw-bold";
    price.textContent = `${item.price} ₺`;

    body.appendChild(title);
    body.appendChild(price);
    card.appendChild(img);
    card.appendChild(body);
    col.appendChild(card);
    menuContainer.appendChild(col);
  });
}

getMenu();

