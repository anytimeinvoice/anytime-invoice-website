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
