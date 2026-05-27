(function () {
  document.querySelectorAll('.about-toggle').forEach(function (toggle) {
    var targetId = toggle.getAttribute('aria-controls');
    var more = targetId ? document.getElementById(targetId) : null;
    if (!more) return;

    var openText = toggle.textContent.trim();
    var originalParent = toggle.parentNode;
    var originalNextSibling = toggle.nextSibling;

    toggle.addEventListener('click', function () {
      var isOpen = more.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '— less' : openText;

      if (isOpen) {
        var lastParagraph = more.querySelector('p:last-of-type');
        if (lastParagraph) {
          lastParagraph.appendChild(toggle);
        } else {
          more.appendChild(toggle);
        }
      } else if (originalParent) {
        if (originalNextSibling) {
          originalParent.insertBefore(toggle, originalNextSibling);
        } else {
          originalParent.appendChild(toggle);
        }
      }

      more.style.maxHeight = isOpen ? more.scrollHeight + 20 + 'px' : '0';
    });
  });
})();
