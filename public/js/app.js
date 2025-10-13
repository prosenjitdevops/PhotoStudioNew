// Fetch and render artworks
async function loadArtworks() {
  const res = await fetch('/api/artworks');
  const list = await res.json();
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  list.forEach(a => {
    gallery.innerHTML += `
      <div class="art-card ${a.medium} ${a.theme} ${getPriceClass(a.price)}">
        <img src="${a.url}" alt="${a.title}" />
        <div class="info">
          <h3>${a.title}</h3>
          <p>${a.medium} | ${a.theme} | ₹${a.price}</p>
          <button class="inquire-btn" data-id="${a.id}">Inquire</button>
        </div>
      </div>`;
  });
  applyFilters();
}
loadArtworks();

// Price category
function getPriceClass(price) {
  if (price < 1000) return 'low';
  if (price <= 5000) return 'mid';
  return 'high';
}

// Filters with LocalStorage
['medium', 'theme', 'price'].forEach(key => {
  const sel = document.getElementById(`${key}Filter`);
  const saved = localStorage.getItem(key) || 'all';
  sel.value = saved;
  sel.addEventListener('change', () => {
    localStorage.setItem(key, sel.value);
    applyFilters();
  });
});
function applyFilters() {
  document.querySelectorAll('.art-card').forEach(c => {
    const mid = document.getElementById('mediumFilter').value;
    const th = document.getElementById('themeFilter').value;
    const pr = document.getElementById('priceFilter').value;
    if ((mid === 'all' || c.classList.contains(mid)) &&
        (th === 'all' || c.classList.contains(th)) &&
        (pr === 'all' || c.classList.contains(pr)))
      c.style.display = 'block';
    else c.style.display = 'none';
  });
}
