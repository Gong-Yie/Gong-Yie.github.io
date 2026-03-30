(function() {
  // 1. 目标博客链接配置
  const targetBlogUrl = 'https://gong-yie.github.io/studybyblog/';

  // 2. 在右下角工具栏动态添加“切换博客”按钮
  function addBlogSwitchIcon() {
    // 防止 Pjax 导致的重复渲染
    const oldBtn = document.getElementById('blog-switch-item');
    if (oldBtn) oldBtn.remove();

    const rightside = document.getElementById('rightside');
    if (!rightside) return;

    const configShow = rightside.querySelector('#rightside-config-show');
    if (!configShow) return;

    const switchBtn = document.createElement('button');
    switchBtn.id = 'blog-switch-item';
    switchBtn.type = 'button';
    switchBtn.title = '切换到学习博客';
    switchBtn.innerHTML = '<i class="fas fa-book"></i>'; // 使用书本图标

    // 点击跳转到目标博客
    switchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = targetBlogUrl;
    });

    // 插入到设置面板中
    if (configShow.firstChild) {
      configShow.insertBefore(switchBtn, configShow.firstChild);
    } else {
      configShow.appendChild(switchBtn);
    }
  }

  // 3. 启动与 Pjax 兼容处理
  function start() {
    addBlogSwitchIcon();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // Pjax 跳转后重新挂载按钮
  document.addEventListener('pjax:complete', function() {
    addBlogSwitchIcon();
  });
})();