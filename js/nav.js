(function () {
  var nextStop = document.querySelector('[data-next-stop]');
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
