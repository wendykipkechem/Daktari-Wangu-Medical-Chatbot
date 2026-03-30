function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function register() {
  const name = regName.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();
  const msg = regMsg;

  if (!name || !email || !password) {
    msg.textContent = "All fields required";
    return;
  }

  if (!isValidEmail(email)) {
    msg.textContent = "Invalid email format";
    return;
  }

  if (password.length < 6) {
    msg.textContent = "Password too short";
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  localStorage.setItem("loggedIn", "true");
  location.href = "index.html";
}

function login() {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();
  const msg = loginMsg;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || email !== user.email || password !== user.password) {
    msg.textContent = "Invalid login details";
    return;
  }

  localStorage.setItem("loggedIn", "true");
  location.href = "index.html";
}

function logout() {
  localStorage.removeItem("loggedIn");
  location.href = "login.html";
}
