/**
 * 动态添加音乐图标到右下角工具栏（设置按钮上方）
 * 确保按钮样式与原有按钮完全一致
 */
(function() {
  // 防止重复添加
  if (document.getElementById('music-icon-item')) return;

  function addMusicIcon() {
    const rightside = document.getElementById('rightside');
    if (!rightside) return;

    const configShow = rightside.querySelector('#rightside-config-show');
    if (!configShow) return;

    // 创建按钮（与现有按钮相同的元素类型和属性）
    const musicBtn = document.createElement('button');
    musicBtn.id = 'music-icon-item';
    musicBtn.type = 'button';
    musicBtn.title = '音乐';
    musicBtn.innerHTML = '<i class="fas fa-music"></i>';

    // 点击事件：显示左侧栏（如果隐藏），并移除最小化状态
    musicBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const panel = document.getElementById('global-player-panel');
      if (panel) {
        panel.style.display = 'block';   // 确保显示
        panel.classList.remove('minimized'); // 可选：显示时恢复展开状态，根据需求决定
      }
    });

    // 插入到设置按钮之前（即第一个子元素之前）
    const firstChild = configShow.firstChild;
    configShow.insertBefore(musicBtn, firstChild);
  }

  // DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMusicIcon);
  } else {
    addMusicIcon();
  }

  // 如果使用 PJAX，在 PJAX 完成后也尝试添加（防止工具栏被替换）
  document.addEventListener('pjax:complete', addMusicIcon);
})();