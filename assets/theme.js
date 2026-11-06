(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    var root = document.documentElement;
    // Dark is the default (no attribute = dark); only "light" is explicit.
    var isLight = root.getAttribute('data-theme') === 'light';
    var next = isLight ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // Safari blocks localStorage under file:// URLs — the toggle still
      // works for the current page view, it just won't persist.
    }
  });
})();

// Mobile menu: reveals .nav-links (hidden below 768px) as a dropdown.
(function () {
  var btn = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function () {
    btn.setAttribute('aria-expanded', links.classList.toggle('open'));
  });
})();
