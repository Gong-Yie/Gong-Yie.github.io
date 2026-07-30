(function () {
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-theme-option]'));
  if (!buttons.length) return;

  var storageKey = 'minimal_color_mode';
  var root = document.documentElement;

  function applyMode(mode) {
    var nextMode = mode === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', nextMode);
    localStorage.setItem(storageKey, nextMode);

    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-theme-option') === nextMode));
    });
  }

  var savedMode = localStorage.getItem(storageKey);
  applyMode(savedMode === 'dark' ? 'dark' : 'light');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      applyMode(button.getAttribute('data-theme-option'));
    });
  });
})();
