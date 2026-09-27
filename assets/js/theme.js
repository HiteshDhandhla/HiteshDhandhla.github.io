(function () {
  var STORAGE_KEY = 'hd-theme';
  var root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    document.querySelectorAll('.theme-switch button').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.theme === theme);
      btn.setAttribute('aria-pressed', btn.dataset.theme === theme ? 'true' : 'false');
    });
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }

  // Dark is the explicit default regardless of system preference.
  var initial = saved === 'light' || saved === 'dark' ? saved : 'dark';
  applyTheme(initial);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.theme-switch button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var theme = btn.dataset.theme;
        applyTheme(theme);
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
      });
    });
  });
})();
