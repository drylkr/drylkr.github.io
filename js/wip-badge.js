document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  const badge = document.createElement("div");
  badge.className = "wip-badge";

  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "wip-modal-backdrop";
  modalBackdrop.setAttribute("aria-hidden", "true");

  const modal = document.createElement("div");
  modal.className = "wip-modal";
  modal.innerHTML = `
    <h3>Work in progress</h3>
    <p class="wip-modal-text">Swing by again soon for updates, things change around here.</p>
    <p class="wip-modal-hint">xp</p>
    <div class="modal-actions">
      <button type="button" class="btn btn-primary wip-modal-close">Got it</button>
    </div>
  `;

  modalBackdrop.appendChild(modal);
  document.body.appendChild(modalBackdrop);

  const openModal = () => {
    modalBackdrop.classList.add("visible");
    modalBackdrop.setAttribute("aria-hidden", "false");
  };

  const videoEl = `
    <video class="wip-badge-gif" autoplay loop muted playsinline preload="none" width="82" height="88" aria-hidden="true">
      <source src="assets/car.webm" type="video/webm" />
      <source src="assets/car.mp4" type="video/mp4" />
    </video>
  `;

  if (isMobile) {
    badge.innerHTML = `
      <button type="button" class="wip-badge-inner wip-badge-mobile" aria-label="Work in progress">
        ${videoEl}
      </button>
    `;
  } else {
    badge.innerHTML = `
      <button type="button" class="wip-badge-inner" aria-label="Work in progress">
        ${videoEl}
        <div class="wip-badge-tooltip">Swing by again soon for updates</div>
      </button>
    `;
  }

  badge.addEventListener("click", openModal);

  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop || event.target.classList.contains("wip-modal-close")) {
      modalBackdrop.classList.remove("visible");
      modalBackdrop.setAttribute("aria-hidden", "true");
    }
  });

  document.body.appendChild(badge);
});
