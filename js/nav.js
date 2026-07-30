(function () {
  var header = document.querySelector('[data-site-header]');
  var progress = document.querySelector('[data-scroll-progress]');
  var menuButton = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-site-menu]');
  var nextStop = document.querySelector('[data-next-stop]');
  var easterEgg = document.querySelector('[data-easter-egg]');

  function updatePageChrome() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = scrollable > 0 ? window.scrollY / scrollable : 0;

    if (progress) {
      progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
    }

    if (header) {
      header.classList.toggle('is-solid', window.scrollY > 24);
    }
  }

  updatePageChrome();
  window.addEventListener('scroll', updatePageChrome, { passive: true });

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a, button').forEach(function (item) {
      item.addEventListener('click', function () {
        menu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (easterEgg) {
    var easterEggClicks = 0;
    var easterEggTimer = null;

    easterEgg.addEventListener('click', function () {
      easterEggClicks += 1;
      easterEgg.classList.add('is-counting');

      if (easterEggTimer) {
        window.clearTimeout(easterEggTimer);
      }

      if (easterEggClicks >= 3) {
        var target = easterEgg.getAttribute('data-target') || '/gugu/';
        easterEgg.classList.remove('is-counting');
        easterEgg.classList.add('is-found');
        easterEgg.setAttribute('aria-label', '彩蛋已发现');
        window.setTimeout(function () {
          window.location.href = target;
        }, 240);
        return;
      }

      easterEggTimer = window.setTimeout(function () {
        easterEggClicks = 0;
        easterEgg.classList.remove('is-counting');
      }, 2000);
    });
  }

  if (!nextStop) return;

  var fallbackPath = nextStop.getAttribute('data-fallback-path') || '/link/';
  var dataNode = document.getElementById('friend-links-data');
  var links = [];

  try {
    links = dataNode ? JSON.parse(dataNode.textContent) : [];
  } catch (error) {
    links = [];
  }

  links = links.filter(function (item) {
    return item && typeof item.url === 'string' && item.url.trim();
  });

  nextStop.addEventListener('click', function () {
    if (!links.length) {
      window.location.href = fallbackPath;
      return;
    }

    var next = links[Math.floor(Math.random() * links.length)];
    window.location.href = next.url;
  });
})();
