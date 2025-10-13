function setDisplay(element, display) {
  if (element) element.style.display = display;
}

function showWelcomeUser(welcomeUser, username) {
  if (welcomeUser) {
    welcomeUser.textContent = `Welcome ${username}`;
    welcomeUser.style.display = 'inline';
  }
}

function updateAuthUI() {
  const username = localStorage.getItem('username');
  const signinBtn = document.getElementById('signinBtn');
  const signupBtn = document.getElementById('signupBtn');
  const welcomeUser = document.getElementById('welcomeUser');
  const signOutBtn = document.getElementById('signOutBtn');

  if (username) {
    setDisplay(signinBtn, 'none');
    setDisplay(signupBtn, 'none');
    showWelcomeUser(welcomeUser, username);
    setDisplay(signOutBtn, 'inline');
  } else {
    setDisplay(signinBtn, 'inline');
    setDisplay(signupBtn, 'inline');
    setDisplay(welcomeUser, 'none');
    setDisplay(signOutBtn, 'none');
  }
}

// Sign out logic
document.getElementById('signOutBtn')?.addEventListener('click', function() {
  localStorage.removeItem('username');
  updateAuthUI();
  window.location.href = 'index.html';
});

// On page load
window.addEventListener('DOMContentLoaded', updateAuthUI);

// Function to update the cart counter display
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCountElement.textContent = cart.length;
}

// Example of adding an item to the cart and updating counter
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Call updateCartCount on page load to refresh the counter
window.addEventListener('DOMContentLoaded', updateCartCount);

