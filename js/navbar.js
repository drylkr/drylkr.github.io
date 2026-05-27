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

const experiencePath = "experience.html";

// Hi there! Yes, I know this is not secure at all. It's just for funsies.
const experiencePassword = "xp"; 

const experienceAuthKey = "experienceUnlocked";
const experienceExpiryKey = "experienceUnlockedExpires";
const experienceTimeoutMs = 3 * 60 * 1000;

function isExperienceUnlocked() {
  const expiresAt = Number(sessionStorage.getItem(experienceExpiryKey));
  if (!expiresAt || Number.isNaN(expiresAt) || Date.now() > expiresAt) {
    sessionStorage.removeItem(experienceAuthKey);
    sessionStorage.removeItem(experienceExpiryKey);
    return false;
  }
  return sessionStorage.getItem(experienceAuthKey) === "true";
}

function unlockExperience() {
  sessionStorage.setItem(experienceAuthKey, "true");
  sessionStorage.setItem(experienceExpiryKey, String(Date.now() + experienceTimeoutMs));
}

function getExperienceExpiryMs() {
  const expiresAt = Number(sessionStorage.getItem(experienceExpiryKey));
  return expiresAt && !Number.isNaN(expiresAt) ? expiresAt - Date.now() : 0;
}

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function updateExperienceTooltip(link) {
  const tooltip = link.querySelector(".nav-lock-tooltip");
  if (!tooltip) return;

  if (isExperienceUnlocked()) {
    const remainingMs = getExperienceExpiryMs();
    tooltip.textContent = remainingMs > 0 ? formatCountdown(remainingMs) : "Password protected";
  } else {
    tooltip.textContent = "Password protected";
  }
}

function setupThemeToggle() {
  applyTheme(getPreferredTheme());
  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleTheme);
  }
}

function createPasswordPromptModal(onSuccess, onCancel) {
  if (document.getElementById("password-prompt-backdrop")) return;

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.id = "password-prompt-backdrop";
  backdrop.setAttribute("aria-hidden", "false");

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <h3>Enter password</h3>
    <p>Please enter the password to continue.</p>
    <p>Hint: It's somewhere in the website.</p>
    <label for="password-prompt-input">Password</label>
    <input id="password-prompt-input" type="password" autocomplete="off" />
    <div class="modal-actions">
      <button type="button" class="btn btn-primary" id="password-prompt-submit">Submit</button>
      <button type="button" class="btn btn-ghost" id="password-prompt-cancel">Cancel</button>
    </div>
  `;

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  const input = modal.querySelector("#password-prompt-input");
  const submitButton = modal.querySelector("#password-prompt-submit");
  const cancelButton = modal.querySelector("#password-prompt-cancel");

  const closePrompt = () => {
    backdrop.remove();
    document.removeEventListener("keydown", handleKeydown);
    if (typeof onCancel === "function") onCancel();
  };

  const submitPrompt = () => {
    if (!input) return;
    const value = input.value.trim();
    if (value === experiencePassword) {
      backdrop.remove();
      document.removeEventListener("keydown", handleKeydown);
      if (typeof onSuccess === "function") onSuccess();
      return;
    }
    input.value = "";
    input.focus();
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePrompt();
    }
    if (event.key === "Enter") {
      event.preventDefault();
      submitPrompt();
    }
  };

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      closePrompt();
    }
  });

  if (submitButton) submitButton.addEventListener("click", submitPrompt);
  if (cancelButton) cancelButton.addEventListener("click", closePrompt);
  if (input) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitPrompt();
      }
    });
    input.focus();
  }

  document.addEventListener("keydown", handleKeydown);
}

function requestExperienceAccess(options = {}) {
  createPasswordPromptModal(() => {
    unlockExperience();
    if (typeof options.onSuccess === "function") {
      options.onSuccess();
    }
  }, () => {
    if (typeof options.onCancel === "function") {
      options.onCancel();
    }
  });
}

function isTypingField(element) {
  return !element ? false : (
    element.tagName === "INPUT" ||
    element.tagName === "TEXTAREA" ||
    element.tagName === "SELECT" ||
    element.isContentEditable
  );
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

  if (window.location.pathname.split("/").pop() === experiencePath && !isExperienceUnlocked()) {
    requestExperienceAccess({
      onCancel: () => {
        window.location.href = "index.html";
      },
    });
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
      const lockedLinks = [];
      container.querySelectorAll(".nav-links a").forEach((link) => {
        if (link.getAttribute("href") === experiencePath) {
          lockedLinks.push(link);
          updateExperienceTooltip(link);
          link.addEventListener("click", (event) => {
            if (isExperienceUnlocked()) {
              return;
            }
            event.preventDefault();
            requestExperienceAccess({
              onSuccess: () => {
                updateExperienceTooltip(link);
                window.location.href = experiencePath;
              },
              onCancel: () => {
                /* User cancelled the password prompt. */
              },
            });
          });
        }
        if (link.getAttribute("href") === currentPath) {
          link.classList.add("active");
        }
      });

      if (lockedLinks.length > 0) {
        setInterval(() => {
          lockedLinks.forEach(updateExperienceTooltip);
        }, 1000);
      }

      setupThemeToggle();
    })
    .catch((error) => {
      console.error("Navbar load failed:", error);
      container.innerHTML = "<nav><div class='logo'>DO</div></nav>";
      applyTheme(getPreferredTheme());
    });
});
