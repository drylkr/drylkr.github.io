document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".site-footer");

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-left">
        © 2026 Daryl Ong. All rights reserved.
      </div>

      <div class="footer-right">
        Built with ❤️ 
      </div>
    </div>
  `;
});
