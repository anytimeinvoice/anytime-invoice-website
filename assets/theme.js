(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    var root = document.documentElement;
    var current = root.getAttribute('data-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = current ? current === 'dark' : prefersDark;
    var next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // Safari blocks localStorage under file:// URLs — the toggle still
      // works for the current page view, it just won't persist.
    }
  });
})();
