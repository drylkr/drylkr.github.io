// contact.js — obfuscate email and open mail client via constructed mailto
(function(){
  function makeEmail() {
    // build email from char codes to avoid raw string in HTML
    const local = [111,110,103,100,97,114,121,108,48,49]; // "ongdaryl01"
    const domain = [103,109,97,105,108,46,99,111,109]; // "gmail.com"
    const localStr = String.fromCharCode(...local);
    const domainStr = String.fromCharCode(...domain);
    return `${localStr}@${domainStr}`;
  }

  function openMail() {
    const email = makeEmail();
    const subject = encodeURIComponent('Inquiry from website');
    const body = encodeURIComponent('Hi Daryl,\n\nI would like to connect regarding...');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Toast helper (creates element on first use)
    function showToast(message) {
      let toast = document.getElementById('site-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'site-toast';
        toast.className = 'site-toast';
        document.body.appendChild(toast);
      }
      toast.textContent = message;
      toast.classList.add('visible');
      clearTimeout(toast._hideTimer);
      toast._hideTimer = setTimeout(() => toast.classList.remove('visible'), 1800);
    }

    const btn = document.getElementById('contact-button');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // show a small modal giving options (open email client or copy email)
      const backdrop = document.createElement('div'); backdrop.className = 'modal-backdrop';
      const modal = document.createElement('div'); modal.className = 'modal';
      modal.innerHTML = `
        <h3>Contact</h3>
        <p>Open your email client or copy the address to clipboard.</p>
        <div class="modal-actions">
          <button class="btn btn-primary" id="open-mail">Open Mail</button>
          <button class="btn btn-ghost" id="copy-mail">Copy</button>
          <button class="btn btn-ghost" id="close-mail">Close</button>
        </div>
      `;
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);

      // accessibility and focus management
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.tabIndex = -1;

      const email = makeEmail();
      const lastActive = document.activeElement;

      function cleanup() {
        document.removeEventListener('keydown', onKey);
        backdrop.remove();
        try { if (lastActive && lastActive.focus) lastActive.focus(); } catch(e) {}
      }

      function onKey(e) {
        if (e.key === 'Escape') cleanup();
        if (e.key === 'Tab') {
          const focusable = modal.querySelectorAll('a[href], button:not([disabled])');
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }

      modal.querySelector('#open-mail').addEventListener('click', () => { openMail(); });
      modal.querySelector('#copy-mail').addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(email);
          showToast('Email copied to clipboard');
        } catch (e) {
          showToast('Copy failed');
        }
      });
      modal.querySelector('#close-mail').addEventListener('click', cleanup);
      backdrop.addEventListener('click', (ev) => { if (ev.target === backdrop) cleanup(); });

      document.addEventListener('keydown', onKey);
      setTimeout(() => modal.classList.add('show'), 10);
      setTimeout(() => { const close = modal.querySelector('#close-mail'); if (close) close.focus(); else modal.focus(); }, 40);
    });
  });
})();
