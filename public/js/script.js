document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  const mediumFilter = document.getElementById('mediumFilter');
  const themeFilter = document.getElementById('themeFilter');
  const priceFilter = document.getElementById('priceFilter');

// js/script.js

function addArtworkToCart(title, price, description) {
  const item = { title, price, description };
  let cart = JSON.parse(localStorage.getItem('artCart')) || [];
  cart.push(item);
  localStorage.setItem('artCart', JSON.stringify(cart));
  alert(`${title} has been added to your cart.`);
    window.location.href = 'cart.html'; // Redirect after adding

}

window.addArtworkToCart = addArtworkToCart;

  function filterGallery() {
    const medium = mediumFilter?.value || 'all';
    const theme = themeFilter?.value || 'all';
    const price = priceFilter?.value || 'all';

    document.querySelectorAll('.art-card').forEach(card => {
      const classes = card.className;
      const matchMedium = medium === 'all' || classes.includes(medium);
      const matchTheme = theme === 'all' || classes.includes(theme);
      const matchPrice = price === 'all' || classes.includes(price);

      card.style.display = (matchMedium && matchTheme && matchPrice) ? 'block' : 'none';
    });
  }

  if (mediumFilter && themeFilter && priceFilter) {
    mediumFilter.addEventListener('change', filterGallery);
    themeFilter.addEventListener('change', filterGallery);
    priceFilter.addEventListener('change', filterGallery);
  }

  document.getElementById('commission-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch('/api/commission', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (result.success) {
      alert('Inquiry sent!');
      form.reset();
    } else {
      alert('Failed to send inquiry.');
    }
  });
});
