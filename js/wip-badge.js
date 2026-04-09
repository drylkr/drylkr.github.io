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
    <h3>Work in progress 🚧</h3>
    <p class="wip-modal-text">Check back soon for updates~ :3</p>
    <div class="modal-actions">
      <button type="button" class="btn btn-primary wip-modal-close">Got it</button>
      <button type="button" class="btn btn-ghost wip-modal-close">Close</button>
    </div>
  `;

  modalBackdrop.appendChild(modal);
  document.body.appendChild(modalBackdrop);

  const openModal = () => {
    modalBackdrop.classList.add("visible");
    modalBackdrop.setAttribute("aria-hidden", "false");
  };

  if (isMobile) {
    badge.innerHTML = `
      <button type="button" class="wip-badge-inner wip-badge-mobile" aria-label="Work in progress">
        <img class="wip-badge-gif" src="assets/car.gif" alt="Work in progress car" />
      </button>
    `;
  } else {
    badge.innerHTML = `
      <button type="button" class="wip-badge-inner" aria-label="Work in progress">
        <img class="wip-badge-gif" src="assets/car.gif" alt="Work in progress car" />
        <div class="wip-badge-tooltip">Check back soon for updates~ :3</div>
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
