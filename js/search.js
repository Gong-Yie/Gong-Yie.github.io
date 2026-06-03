(function () {
  var input = document.querySelector('[data-search-input]');
  var results = document.querySelector('[data-search-results]');
  if (!input || !results) return;

  var empty = document.querySelector('[data-search-empty]');
  var dataNode = document.getElementById('search-data');
  var posts = [];

  try {
    posts = dataNode ? JSON.parse(dataNode.textContent) : [];
  } catch (error) {
    posts = [];
  }

  posts = posts.map(function (post) {
    post.haystack = [post.title, post.date, post.content].join(' ').toLowerCase();
    return post;
  });

  function clearResults() {
    results.innerHTML = '';
    if (empty) empty.hidden = true;
  }

  function render(query) {
    var terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    clearResults();

    if (!terms.length) return;

    var matched = posts.filter(function (post) {
      return terms.every(function (term) {
        return post.haystack.indexOf(term) !== -1;
      });
    }).slice(0, 20);

    matched.forEach(function (post) {
      var item = document.createElement('li');
      item.className = 'search-result-item';

      var link = document.createElement('a');
      link.className = 'search-result-title';
      link.href = post.url;
      link.textContent = post.title;

      var meta = document.createElement('time');
      meta.className = 'search-result-date';
      meta.dateTime = post.date;
      meta.textContent = post.date;

      var excerpt = document.createElement('p');
      excerpt.className = 'search-result-excerpt';
      excerpt.textContent = post.excerpt;

      item.appendChild(link);
      item.appendChild(meta);
      if (post.excerpt) item.appendChild(excerpt);
      results.appendChild(item);
    });

    if (empty) empty.hidden = matched.length > 0;
  }

  input.addEventListener('input', function () {
    render(input.value);
  });

  var params = new URLSearchParams(window.location.search);
  var initialQuery = params.get('q');
  if (initialQuery) {
    input.value = initialQuery;
    render(initialQuery);
  }
})();
