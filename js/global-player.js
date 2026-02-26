(function() {
  if (window.__globalPlayerLoaded) return;
  window.__globalPlayerLoaded = true;

  // 创建左侧面板 DOM（带顶部按钮栏）
  function createPlayerPanel() {
    const panelHTML = `
      <div id="global-player-panel">
        <div class="panel-header">
          <button id="panel-minimize" title="最小化"><</button>
          <button id="panel-expand" title="展开">></button>
          <button id="panel-close" title="关闭">✕</button>
        </div>
        <!-- 新增提示文字区域 -->
        <div class="panel-message">
          <div class="welcome-message">来点音乐，放松一下</div>
          <div class="hint-message">播放音乐可能需要梯子魔法</div>
        </div>
        <div id="aplayer-container"></div>
        <div class="next-info">
          <span style="opacity:0.7;">下一首：</span>
          <span id="next-title"></span>
          <span id="next-artist"></span>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHTML);
  }

  // 加载音乐列表
  async function loadAudioList() {
    try {
      const response = await fetch('https://gong-yie.github.io/musicforblog/list.json');
      if (!response.ok) throw new Error('加载音乐列表失败');
      let audioList = await response.json();

      const baseUrl = 'https://gong-yie.github.io/musicforblog/';
      audioList = audioList.map(item => ({
        name: item.name,
        artist: item.artist,
        url: baseUrl + item.url,
        cover: baseUrl + (item.cover || 'cover/default.jpg'), // 如果封面缺失可给默认
      }));

      return audioList;
    } catch (e) {
      console.error('音乐列表加载失败:', e);
      return [];
    }
  }

  // 初始化 APlayer
  async function initPlayer() {
    let audioList = await loadAudioList();
    if (audioList.length === 0) {
      console.warn('音乐列表为空');
      return;
    }

    // 确保每首歌都有封面（防止 undefined）
    audioList = audioList.map(item => ({
      ...item,
      cover: item.cover || '/images/default-cover.jpg',
    }));

    const ap = new APlayer({
      container: document.getElementById('aplayer-container'),
      audio: audioList,
      mini: false,
      autoplay: false,
      theme: '#b7daff',
      loop: 'all',
      order: 'list',
      preload: 'auto',
      volume: 0.7,
      mutex: true,
      listFolded: false,
      listMaxHeight: '200px',
      lrcType: 0, // 不需要歌词
    });

    window.__aplayer = ap;
    const panel = document.getElementById('global-player-panel');

    // 更新下一首信息
    function updateNextInfo() {
      const index = ap.list.index;
      const audios = ap.list.audios;
      if (audios.length === 0) return;
      const nextIndex = (index + 1) % audios.length;
      const nextAudio = audios[nextIndex];
      document.getElementById('next-title').innerText = nextAudio.name || '';
      document.getElementById('next-artist').innerText = nextAudio.artist ? ' - ' + nextAudio.artist : '';
    }

    // 监听切换歌曲
    ap.on('listswitch', updateNextInfo);
    ap.on('play', updateNextInfo); // 播放时也更新一次

    updateNextInfo();

    // ------------------ 按钮事件 ------------------
    const minimizeBtn = document.getElementById('panel-minimize');
    const expandBtn = document.getElementById('panel-expand');
    const closeBtn = document.getElementById('panel-close');

    // 最小化
    minimizeBtn.addEventListener('click', function() {
      panel.classList.add('minimized');
    });

    // 展开（恢复）
    expandBtn.addEventListener('click', function() {
      panel.classList.remove('minimized');
    });

    // 关闭
    closeBtn.addEventListener('click', function() {
      panel.style.display = 'none';
    });
  }

  function start() {
    createPlayerPanel();
    initPlayer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();