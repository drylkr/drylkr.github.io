document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".site-footer");

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-left">
        <div class="color-circle" style="background-color: rgba(201, 201, 201, 1);"></div>
        <div class="color-circle" style="background-color: var(--text-light)"></div>
        <div class="color-circle" style="background-color: var(--text-dark"></div>
        <div class="color-circle" style="background-color: var(--keyword-green-text);"></div>
      </div>

      <div class="footer-right">
        <a href="mailto:ongdaryl01@gmail.com" class="footer-link" aria-label="Email">
          <!-- Mail Icon -->
          <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 
            2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
            4-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>

        <a href="https://github.com/drylkr" target="_blank" class="footer-link" aria-label="GitHub">
          <!-- GitHub Icon -->
          <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.373 0 
            12c0 5.303 3.438 9.8 8.205 
            11.387.6.113.82-.258.82-.577 
            0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 
            1.205.084 1.84 1.238 1.84 1.238 
            1.07 1.834 2.807 1.304 3.492.997.108-.776.42-1.305.763-1.606-2.665-.304-5.466-1.335-5.466-5.932 
            0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 
            0 0 1.008-.322 3.3 1.23a11.52 
            11.52 0 0 1 3.003-.404c1.02.005 2.047.137 
            3.003.404 2.29-1.552 3.297-1.23 
            3.297-1.23.655 1.653.243 2.873.12 
            3.176.77.84 1.236 1.91 1.236 
            3.22 0 4.61-2.804 5.625-5.476 
            5.922.43.37.823 1.1.823 2.215 
            0 1.598-.014 2.888-.014 3.28 
            0 .32.217.694.825.576C20.565 
            21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  `;
});
