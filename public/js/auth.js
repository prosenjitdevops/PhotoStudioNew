// Sign Up form
document.getElementById("signupForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Send data to backend
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const result = await response.json();
    if (response.ok) {
      alert("Sign Up Successful! Redirecting to Sign In.");
      window.location.href = "signin.html";
    } else {
      alert(result.message || "Sign Up Failed.");
    }
  } catch (err) {
    console.error("Error connecting to server:", err);
    alert("Error connecting to server.");
  }
});

// Sign In form
document.getElementById("signinForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("signinUsername").value;
  const password = document.getElementById("signinPassword").value;

  try {
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('username', username); // <-- Add this line
      alert("Sign In Successful!");
      window.location.href = "index.html";
    } else {
      alert(result.message || "Invalid credentials. Please try again.");
    }
  } catch (err) {
    console.error("Error connecting to server:", err);
    alert("Error connecting to server.");
  }
});
