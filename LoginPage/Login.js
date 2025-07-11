let users = JSON.parse(localStorage.getItem('users')) || {};

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}

if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const rePassword = document.getElementById('regRePassword').value;
    const msg = document.getElementById('registerMsg');

    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(username);
    const hasNumber = /\d/.test(username);

    if (!hasSpecial || !hasNumber) {
      msg.textContent = "Username must include at least one number and one special character.";
      msg.style.color = "red";
      return;
    }

    if (password !== rePassword) {
      msg.textContent = "Passwords do not match.";
      msg.style.color = "red";
      return;
    }

    if (users[username]) {
      msg.textContent = "username already exists.";
      msg.style.color = "orange";
    } else {
      users[username] = password;
      localStorage.setItem('users', JSON.stringify(users));
      msg.textContent = "You are successfully registered!";
      msg.style.color = "green";
    }

    this.reset();
  });
}

if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const msg = document.getElementById('loginMsg');

    if (users[username] && users[username] === password) {
      msg.textContent = "Login successful. Redirecting...";
      msg.style.color = "green";
      setTimeout(() => {
        window.location.href = "Secured.html";
      }, 1000);
    } else {
      msg.textContent = "Invalid username or password.";
      msg.style.color = "red";
    }

    this.reset();
  });
}
function logout() {
  window.location.href = "Login.html";
}