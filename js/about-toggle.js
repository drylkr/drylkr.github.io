(function () {
  var toggle = document.getElementById('about-toggle');
  var more = document.getElementById('about-more');
  if (!toggle || !more) return;
  toggle.addEventListener('click', function () {
    var isOpen = more.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.textContent = isOpen ? '— less' : '+ more about me';
    more.style.maxHeight = isOpen ? more.scrollHeight + 20 + 'px' : '0';
  });
})();
