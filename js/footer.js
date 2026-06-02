document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".site-footer");

  footer.innerHTML = `
<div class="footer-container">
  <div class="footer-left">
    © 2026 Daryl Ong. All rights reserved.
  </div>

  <div class="footer-right">
    Built with ❤️

    <a href="https://www.linkedin.com/in/daryl-ong-b10ba3407/" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; display: inline-flex; align-items: center;">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        width="16" 
        height="16"
        style="fill: #b0b0b0;"
      >
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.86 3.36-1.86 3.59 0 4.25 2.36 4.25 5.43v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/>
      </svg>
    </a>
  </div>
</div>
  `;
});
