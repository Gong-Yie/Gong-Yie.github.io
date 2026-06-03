(function () {
  var blocks = document.querySelectorAll('.article-body figure.highlight, .article-body pre');

  function getCodeText(block) {
    var code = block.querySelector('.code pre') ||
      block.querySelector('pre code') ||
      block.querySelector('code') ||
      block;

    return code.textContent.replace(/\n$/, '');
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    fallbackCopy(text);
    return Promise.resolve();
  }

  blocks.forEach(function (block) {
    if (block.tagName.toLowerCase() === 'pre' && block.closest('figure.highlight')) return;
    if (block.dataset.copyReady) return;

    block.dataset.copyReady = 'true';
    block.classList.add('code-copy-container');

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy-button';
    button.textContent = '复制';
    button.setAttribute('aria-label', '复制代码');

    button.addEventListener('click', function () {
      copyText(getCodeText(block)).then(function () {
        button.textContent = '已复制';
        window.setTimeout(function () {
          button.textContent = '复制';
        }, 1400);
      });
    });

    block.appendChild(button);
  });
})();
