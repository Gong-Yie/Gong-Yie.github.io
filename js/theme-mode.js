(function () {
  var button = document.querySelector('[data-theme-mode-toggle]');
  if (!button) return;

  var storageKey = 'minimal_color_mode';
  var root = document.documentElement;

  function applyMode(mode) {
    var nextMode = mode === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', nextMode);
    localStorage.setItem(storageKey, nextMode);
    button.textContent = nextMode === 'dark' ? '昼' : '夜';
    button.setAttribute('aria-label', nextMode === 'dark' ? '切换白天模式' : '切换夜晚模式');
    button.setAttribute('aria-pressed', nextMode === 'dark' ? 'true' : 'false');
  }

  var savedMode = localStorage.getItem(storageKey);
  applyMode(savedMode === 'dark' ? 'dark' : 'light');

  button.addEventListener('click', function () {
    applyMode(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
})();
