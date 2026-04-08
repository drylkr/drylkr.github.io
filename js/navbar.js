document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load navbar: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      container.querySelectorAll(".nav-links a").forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
          link.classList.add("active");
        }
      });
    })
    .catch((error) => {
      console.error("Navbar load failed:", error);
      container.innerHTML = "<nav><div class='logo'>DO</div></nav>";
    });
});
