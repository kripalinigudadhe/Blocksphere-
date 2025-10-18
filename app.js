const API_URL = "http://localhost:5000/api"; // Backend URL

// ===== DOM ELEMENTS =====
const registerDiv = document.getElementById("register");
const loginDiv = document.getElementById("login");
const authSection = document.getElementById("auth");
const createSection = document.getElementById("create");
const postsSection = document.getElementById("post-list");
const nav = document.getElementById("nav");

// ===== TOKEN HANDLING =====
let token = localStorage.getItem("token");

// ===== INITIAL PAGE LOAD =====
window.addEventListener("DOMContentLoaded", () => {
  if (token) {
    showCreateSection();
  } else {
    showRegisterForm();
  }
  loadPosts();
});

// ====== UTILITIES ======
function showMessage(message, type = "info") {
  const msgDiv = document.createElement("div");
  msgDiv.textContent = message;
  msgDiv.style.position = "fixed";
  msgDiv.style.bottom = "20px";
  msgDiv.style.right = "20px";
  msgDiv.style.background =
    type === "error"
      ? "linear-gradient(90deg, #ff5252, #ff1744)"
      : "linear-gradient(90deg, #8a2be2, #6a11cb)";
  msgDiv.style.color = "#fff";
  msgDiv.style.padding = "10px 16px";
  msgDiv.style.borderRadius = "8px";
  msgDiv.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  msgDiv.style.zIndex = "1000";
  msgDiv.style.fontSize = "14px";
  msgDiv.classList.add("fade-in");

  document.body.appendChild(msgDiv);
  setTimeout(() => msgDiv.remove(), 2500);
}

// ====== DISPLAY CONTROL ======
function showRegisterForm() {
  authSection.style.display = "flex";
  registerDiv.style.display = "flex";
  loginDiv.style.display = "none";
  createSection.style.display = "none";
  nav.innerHTML = `
    <ul>
      <li><a href="#" class="active">Register</a></li>
      <li><a href="#" onclick="showLoginForm()">Login</a></li>
    </ul>
  `;
}

function showLoginForm() {
  authSection.style.display = "flex";
  registerDiv.style.display = "none";
  loginDiv.style.display = "flex";
  createSection.style.display = "none";
  nav.innerHTML = `
    <ul>
      <li><a href="#" onclick="showRegisterForm()">Register</a></li>
      <li><a href="#" class="active">Login</a></li>
    </ul>
  `;
}

function showCreateSection() {
  authSection.style.display = "none";
  createSection.style.display = "block";
  nav.innerHTML = `
    <ul>
      <li><a href="#" class="active">Create Post</a></li>
      <li><a href="#" id="logout-btn">Logout</a></li>
    </ul>
  `;
  document.getElementById("logout-btn").addEventListener("click", logout);
}

// ====== AUTH ======
document.getElementById("btn-register").addEventListener("click", async () => {
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const confirm = document.getElementById("reg-confirm").value.trim();

  if (!username || !email || !password || !confirm)
    return showMessage("Please fill all fields", "error");
  if (password !== confirm)
    return showMessage("Passwords do not match", "error");

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      showMessage("Registration successful! Please login.", "success");
      showLoginForm();
    } else {
      showMessage(data.error || "Registration failed", "error");
    }
  } catch (err) {
    console.error(err);
    showMessage("Server connection error", "error");
  }
});

document.getElementById("btn-login").addEventListener("click", async () => {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password)
    return showMessage("Please fill all fields", "error");

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      token = data.token;
      localStorage.setItem("token", data.token);
      showMessage("Login successful!", "success");
      showCreateSection();
      loadPosts();
    } else {
      showMessage(data.error || "Login failed", "error");
    }
  } catch (err) {
    console.error(err);
    showMessage("Error connecting to server", "error");
  }
});

function logout() {
  localStorage.removeItem("token");
  token = null;
  showMessage("Logged out successfully!", "success");
  showLoginForm();
}

// ====== POSTS ======
document.getElementById("btn-create").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content)
    return showMessage("Please fill all fields", "error");
  if (!token)
    return showMessage("You must be logged in to create posts", "error");

  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();

    if (res.ok) {
      showMessage("Post created successfully!", "success");
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      loadPosts();
    } else {
      showMessage(data.error || "Failed to create post", "error");
    }
  } catch (err) {
    console.error(err);
    showMessage("Error creating post", "error");
  }
});

async function loadPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();
    postsSection.innerHTML = "";

    if (!posts || posts.length === 0) {
      postsSection.innerHTML =
        "<p class='no-posts'>No posts yet. Start writing your first blog!</p>";
      return;
    }

    posts.forEach((p) => {
      const div = document.createElement("div");
      div.className = "post fade-in";
      div.innerHTML = `
        <h4>${p.title}</h4>
        <p>${p.content}</p>
        <small style="color:#666;">✍️ By <b>${p.User?.username || "Unknown"}</b></small>
      `;
      postsSection.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    postsSection.innerHTML =
      "<p class='no-posts'>⚠️ Error loading posts. Please try again later.</p>";
  }
}
