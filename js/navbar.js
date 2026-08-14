const themeStorageKey = "site-theme";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
  const button = document.getElementById("theme-toggle");
  if (button) {
    button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme || "light";
  applyTheme(currentTheme === "dark" ? "light" : "dark");
}

function isTypingField(element) {
  return !element ? false : (
    element.tagName === "INPUT" ||
    element.tagName === "TEXTAREA" ||
    element.tagName === "SELECT" ||
    element.isContentEditable
  );
}

function setupThemeToggle() {
  applyTheme(getPreferredTheme());
  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleTheme);
  }
}

function handleThemeKeybind(event) {
  if (event.defaultPrevented) return;
  if (event.key.toLowerCase() !== "d") return;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (isTypingField(document.activeElement)) return;

  toggleTheme();
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", handleThemeKeybind);
  const container = document.getElementById("navbar-container");
  if (!container) {
    applyTheme(getPreferredTheme());
    return;
  }

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

      setupThemeToggle();
    })
    .catch((error) => {
      console.error("Navbar load failed:", error);
      container.innerHTML = "<nav><div class='logo'>DO</div></nav>";
      applyTheme(getPreferredTheme());
    });
});
