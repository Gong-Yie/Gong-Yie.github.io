(function () {
  var dataNode = document.getElementById('background-switcher-data');
  var background = document.querySelector('[data-page-background]');
  var button = document.querySelector('[data-background-switcher-button]');

  if (!dataNode || !background || !button) return;

  var config = { images: [], storageKey: 'minimal_background_index' };

  try {
    config = JSON.parse(dataNode.textContent);
  } catch (error) {
    config = { images: [], storageKey: 'minimal_background_index' };
  }

  var images = Array.isArray(config.images) ? config.images : [];
  var storageKey = config.storageKey || 'minimal_background_index';
  var currentIndex = null;

  function cssUrl(url) {
    return 'url("' + String(url).replace(/"/g, '\\"') + '")';
  }

  function setButtonState() {
    button.setAttribute('aria-pressed', currentIndex === null ? 'false' : 'true');
    button.title = currentIndex === null ? '切换背景' : '继续切换背景';
  }

  function applyBackground(index) {
    if (index === null || index < 0 || index >= images.length) {
      currentIndex = null;
      document.body.classList.remove('has-page-background');
      background.style.removeProperty('background-image');
      localStorage.removeItem(storageKey);
      setButtonState();
      return;
    }

    currentIndex = index;
    background.style.backgroundImage = cssUrl(images[index]);
    document.body.classList.add('has-page-background');
    localStorage.setItem(storageKey, String(index));
    setButtonState();
  }

  function restoreBackground() {
    var savedValue = localStorage.getItem(storageKey);
    if (savedValue === null) {
      applyBackground(null);
      return;
    }

    var savedIndex = Number(savedValue);
    if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < images.length) {
      applyBackground(savedIndex);
      return;
    }

    applyBackground(null);
  }

  button.addEventListener('click', function () {
    if (!images.length) return;

    var nextIndex = currentIndex === null ? 0 : currentIndex + 1;
    applyBackground(nextIndex >= images.length ? null : nextIndex);
  });

  restoreBackground();
})();
