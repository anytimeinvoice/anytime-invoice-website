(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    var root = document.documentElement;
    // Dark is the default (no attribute = dark); only "light" is explicit.
    var isLight = root.getAttribute('data-theme') === 'light';
    var next = isLight ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    // Shared with the app (anytime-invoice) through a parent-domain cookie.
    var host = location.hostname;
    var onParent = host === 'anytimeinvoice.com.au' || host.endsWith('.anytimeinvoice.com.au');
    document.cookie = 'theme=' + next + '; Path=/; Max-Age=31536000; SameSite=Lax' +
      (onParent ? '; Domain=.anytimeinvoice.com.au; Secure' : '');
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // Safari blocks localStorage under file:// URLs — the toggle still
      // works for the current page view, it just won't persist.
    }
  });
})();

// Mobile navigation menu toggle (hamburger). The nav links are hidden below
// 768px; this reveals them as a dropdown when the hamburger is tapped.
(function () {
  var btn = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!btn || !links) return;
  function close() {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close the menu after tapping any link inside it.
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) close();
  });
  // Reset to the desktop layout when the viewport widens past the breakpoint.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) close();
  });
})();
