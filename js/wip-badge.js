document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  const badge = document.createElement("div");
  badge.className = "wip-badge";

  if (isMobile) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wip-mobile-btn";
    button.textContent = "Click me";
    badge.appendChild(button);

    const modalBackdrop = document.createElement("div");
    modalBackdrop.className = "wip-modal-backdrop";
    modalBackdrop.setAttribute("aria-hidden", "true");

    const modal = document.createElement("div");
    modal.className = "wip-modal";
    modal.innerHTML = `
      <button type="button" class="wip-modal-close" aria-label="Close">×</button>
      <p class="wip-modal-text">Check back soon for updates~ :3</p>
    `;

    modalBackdrop.appendChild(modal);
    document.body.appendChild(modalBackdrop);

    button.addEventListener("click", () => {
      modalBackdrop.classList.add("visible");
      modalBackdrop.setAttribute("aria-hidden", "false");
    });

    modalBackdrop.addEventListener("click", (event) => {
      if (event.target === modalBackdrop || event.target.classList.contains("wip-modal-close")) {
        modalBackdrop.classList.remove("visible");
        modalBackdrop.setAttribute("aria-hidden", "true");
      }
    });
  } else {
    badge.innerHTML = `
      <div class="wip-badge-inner" role="status" aria-label="Work in progress">
        <img class="wip-badge-gif" src="assets/car.gif" alt="Work in progress car" />
        <div class="wip-badge-tooltip">Check back soon for updates~ :3</div>
      </div>
    `;
  }

  document.body.appendChild(badge);
});
