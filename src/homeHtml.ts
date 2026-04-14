export const blogHomeHtml = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Private Notes</title>
    <meta name="theme-color" content="#07c160" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="我的笔记" />
    <meta name="description" content="一个部署在 Cloudflare Workers 上的简洁私人笔记。" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect x='8' y='6' width='48' height='52' rx='10' fill='%2307c160'/%3E%3Cpath d='M20 22h24M20 32h24M20 42h16' stroke='white' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E" />
    <style>
      :root {
        color-scheme: light;
        --bg: #f5f5f5;
        --panel: #ffffff;
        --panel-border: #e5e7eb;
        --text: #111827;
        --muted: #6b7280;
        --accent: #07c160;
        --accent-2: #06ad56;
        --danger: #ef4444;
        --shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        color: var(--text);
        font: 14px/1.6 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: var(--bg);
        -webkit-tap-highlight-color: transparent;
        overscroll-behavior-y: contain;
      }
      button, input, textarea { font: inherit; }
      .hidden { display: none !important; }
      .page {
        max-width: 920px;
        margin: 0 auto;
        padding: 16px;
      }
      .card {
        background: var(--panel);
        border: 1px solid var(--panel-border);
        border-radius: 18px;
        box-shadow: var(--shadow);
      }
      .login-wrap {
        min-height: calc(100vh - 48px);
        display: grid;
        place-items: center;
        padding: 24px 0;
      }
      .login-card {
        width: min(420px, 100%);
        padding: 28px;
      }
      .login-brand {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 16px;
      }
      .login-brand-icon {
        width: 48px;
        height: 48px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
        color: white;
        font-size: 22px;
        box-shadow: 0 10px 24px rgba(7, 193, 96, 0.18);
      }
      .login-mini {
        color: var(--muted);
        font-size: 12px;
      }
      .login-title {
        margin: 2px 0 0;
        font-size: 26px;
        line-height: 1.2;
      }
      .muted {
        color: var(--muted);
      }
      .login-desc {
        margin: 0 0 18px;
        color: var(--muted);
        font-size: 14px;
      }
      .login-actions {
        margin-top: 14px;
      }
      .login-submit {
        width: 100%;
        height: 44px;
      }
      .login-foot {
        margin-top: 12px;
        min-height: 18px;
        color: var(--muted);
        font-size: 12px;
      }
      .input, .textarea {
        width: 100%;
        border-radius: 16px;
        border: 1px solid #d1d5db;
        background: #ffffff;
        color: inherit;
        outline: none;
      }
      .input {
        height: 46px;
        padding: 0 14px;
      }
      .textarea {
        min-height: 320px;
        padding: 14px;
        resize: vertical;
      }
      .input:focus, .textarea:focus {
        border-color: rgba(7, 193, 96, 0.65);
        box-shadow: 0 0 0 4px rgba(7, 193, 96, 0.12);
      }
      .btn {
        height: 42px;
        padding: 0 16px;
        border: 0;
        border-radius: 14px;
        cursor: pointer;
        touch-action: manipulation;
        color: white;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
        box-shadow: 0 8px 18px rgba(7, 193, 96, 0.16);
      }
      .btn.secondary {
        background: #f3f4f6;
        color: #374151;
        box-shadow: none;
      }
      .btn.danger {
        background: #fef2f2;
        color: #b91c1c;
        box-shadow: none;
      }
      .topbar {
        display: flex;
        gap: 16px;
        justify-content: space-between;
        align-items: center;
        padding: 14px 16px;
        margin-bottom: 14px;
        flex-wrap: wrap;
        position: sticky;
        top: 0;
        z-index: 20;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(12px);
        border-color: rgba(229, 231, 235, 0.9);
      }
      .topbar-title {
        margin: 0;
        font-size: 21px;
      }
      .topbar-subtitle {
        color: var(--muted);
        margin-top: 4px;
      }
      .topbar-actions {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
      }
      .search-wrap {
        position: relative;
        width: min(360px, 100%);
      }
      .clear-search {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
        width: 28px;
        height: 28px;
        border-radius: 999px;
        border: 0;
        background: #f3f4f6;
        color: #6b7280;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 1;
        box-shadow: none;
        cursor: pointer;
      }
      .clear-search.show {
        display: flex;
      }
      .fab-new {
        display: none;
      }
      .fab-top {
        display: none;
      }
      .search {
        width: 100%;
        padding-right: 38px;
      }
      .status-line {
        position: fixed;
        left: 50%;
        bottom: 22px;
        transform: translate(-50%, 10px);
        min-width: 160px;
        max-width: min(90vw, 420px);
        padding: 10px 14px;
        border-radius: 999px;
        background: rgba(17, 24, 39, 0.9);
        color: #fff;
        box-shadow: 0 10px 24px rgba(17, 24, 39, 0.18);
        opacity: 0;
        pointer-events: none;
        transition: opacity .18s ease, transform .18s ease;
        text-align: center;
        z-index: 60;
      }
      .status-line.show {
        opacity: 1;
        transform: translate(-50%, 0);
      }
      .layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px;
      }
      .feed {
        padding: 18px;
      }
      .section-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: flex-end;
        margin-bottom: 16px;
      }
      .section-title {
        margin: 0;
        font-size: 22px;
      }
      .section-desc {
        color: var(--muted);
        margin-top: 4px;
        font-size: 13px;
      }
      .note-list {
        display: grid;
        gap: 12px;
      }
      .group-block {
        display: grid;
        gap: 10px;
      }
      .group-title {
        margin: 4px 0 0;
        font-size: 13px;
        color: var(--muted);
        font-weight: 600;
      }
      .search-highlight {
        background: #fff3bf;
        color: inherit;
        padding: 0 2px;
        border-radius: 4px;
      }
      .note-card {
        border: 1px solid #ececec;
        border-radius: 14px;
        background: #ffffff;
        padding: 14px 14px 12px;
        color: inherit;
      }
      .note-card-meta {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        color: var(--muted);
        font-size: 12px;
        margin-bottom: 8px;
      }
      .note-card-title {
        font-size: 21px;
        font-weight: 700;
        margin-bottom: 6px;
      }
      .empty-feed {
        padding: 34px 20px;
        border-radius: 20px;
        border: 1px dashed rgba(148, 163, 184, 0.24);
        text-align: center;
        color: var(--muted);
      }
      .note-card-text {
        white-space: pre-wrap;
        word-break: break-word;
        line-height: 1.8;
        font-size: 15px;
        color: #1f2937;
        user-select: text;
        -webkit-user-select: text;
      }
      .note-card-text-wrap.collapsed {
        position: relative;
        overflow: hidden;
      }
      .note-card-text-wrap.collapsed::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 56px;
        background: linear-gradient(180deg, rgba(255,255,255,0), #ffffff 78%);
        pointer-events: none;
      }
      .note-card-text.is-empty {
        color: var(--muted);
      }
      .note-card-detail {
        color: var(--muted);
        margin: 8px 0 16px;
      }
      .note-actions {
        display: flex;
        gap: 10px;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }
      .note-actions .btn {
        height: 32px;
        padding: 0 11px;
        border-radius: 10px;
        font-size: 13px;
      }
      .note-expand {
        margin-top: 10px;
      }
      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(3, 7, 18, 0.7);
        display: grid;
        place-items: center;
        padding: 20px;
      }
      .modal-card {
        width: min(860px, 100%);
        padding: 22px;
      }
      .modal-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
        margin-bottom: 16px;
      }
      .modal-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        margin-top: 14px;
      }
      @media (max-width: 980px) {
        .note-card-title {
          font-size: 20px;
        }
      }
      @media (max-width: 640px) {
        .page {
          padding: 10px;
          padding-bottom: calc(88px + env(safe-area-inset-bottom));
        }
        .login-wrap {
          padding: 8px 0;
          min-height: 100dvh;
        }
        .login-card {
          width: 100%;
          padding: 20px 16px;
          border-radius: 16px;
        }
        .login-brand {
          gap: 12px;
          margin-bottom: 14px;
        }
        .login-brand-icon {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          font-size: 20px;
        }
        .login-title {
          font-size: 22px;
        }
        .login-desc {
          font-size: 13px;
          margin-bottom: 14px;
        }
        .input {
          height: 44px;
          border-radius: 14px;
        }
        .topbar {
          padding: 14px;
          gap: 12px;
          align-items: stretch;
          border-radius: 14px;
        }
        .topbar-title {
          font-size: 20px;
        }
        .topbar-subtitle {
          font-size: 12px;
        }
        .topbar-actions {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .search-wrap {
          width: 100%;
          grid-column: 1 / -1;
        }
        .search {
          width: 100%;
          grid-column: 1 / -1;
        }
        .topbar-new-btn {
          display: none;
        }
        .topbar-actions .btn {
          width: 100%;
          padding: 0 10px;
          font-size: 14px;
        }
        .status-line {
          bottom: calc(76px + env(safe-area-inset-bottom));
          max-width: calc(100vw - 24px);
          padding: 9px 12px;
          font-size: 12px;
        }
        .feed {
          padding: 14px 12px;
          border-radius: 16px;
        }
        .section-head {
          display: block;
          margin-bottom: 12px;
        }
        .section-title {
          font-size: 18px;
        }
        .section-desc,
        .group-title,
        .note-card-meta {
          font-size: 12px;
        }
        .note-list {
          gap: 10px;
        }
        .group-block {
          gap: 8px;
        }
        .note-card {
          padding: 12px;
          border-radius: 12px;
        }
        .note-card-title {
          font-size: 18px;
          line-height: 1.35;
        }
        .note-card-detail {
          margin: 6px 0 12px;
        }
        .note-card-text {
          font-size: 14px;
          line-height: 1.72;
        }
        .note-actions {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 10px;
        }
        .note-actions .btn,
        .note-expand {
          width: 100%;
        }
        .note-actions .btn {
          height: 34px;
          padding: 0 8px;
          font-size: 12px;
        }
        .note-expand {
          margin-top: 8px;
          height: 34px;
          font-size: 12px;
        }
        .modal-backdrop {
          padding: 0;
          align-items: end;
        }
        .modal-card {
          width: 100%;
          min-height: 88dvh;
          padding: 16px 14px calc(14px + env(safe-area-inset-bottom));
          border-radius: 18px 18px 0 0;
          border-left: 0;
          border-right: 0;
          border-bottom: 0;
        }
        .modal-head {
          gap: 10px;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .modal-head .section-title {
          font-size: 18px;
        }
        .textarea {
          min-height: 48dvh;
          font-size: 16px;
        }
        .modal-actions {
          position: sticky;
          bottom: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.98) 28%);
          padding-top: 12px;
          margin-top: 12px;
        }
        .fab-new {
          position: fixed;
          right: 16px;
          bottom: calc(16px + env(safe-area-inset-bottom));
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          font-size: 30px;
          line-height: 1;
          z-index: 30;
          box-shadow: 0 14px 32px rgba(7, 193, 96, 0.26);
        }
        .fab-top {
          position: fixed;
          right: 20px;
          bottom: calc(84px + env(safe-area-inset-bottom));
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          font-size: 20px;
          line-height: 1;
          z-index: 29;
          background: rgba(17, 24, 39, 0.92);
          color: #ffffff;
          box-shadow: 0 12px 24px rgba(17, 24, 39, 0.16);
          opacity: 0;
          pointer-events: none;
          transform: translateY(8px);
          transition: opacity .18s ease, transform .18s ease;
        }
        .fab-top.show {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <section id="loginView" class="login-wrap hidden">
        <div class="card login-card">
          <div class="login-brand">
            <div class="login-brand-icon">✎</div>
            <div>
              <div class="login-mini">Private Notes</div>
              <h1 class="login-title">登录到我的笔记</h1>
            </div>
          </div>
          <p class="login-desc">输入访问密码后即可查看、搜索、复制和管理你的私人笔记。</p>
          <input id="passwordInput" class="input" type="password" placeholder="输入登录密码" />
          <div class="login-actions">
            <button id="loginBtn" class="btn login-submit">进入笔记</button>
          </div>
          <div id="loginStatus" class="login-foot"></div>
        </div>
      </section>

      <section id="appView" class="hidden">
        <header class="card topbar">
          <div>
            <h1 class="topbar-title">我的笔记</h1>
            <div class="topbar-subtitle">简单记录，随手保存，随手搜索。</div>
          </div>
          <div class="topbar-actions">
            <div class="search-wrap">
              <input id="searchInput" class="input search" placeholder="搜索标题或正文…" />
              <button id="clearSearchBtn" class="clear-search" type="button" aria-label="清空搜索">×</button>
            </div>
            <button id="searchBtn" class="btn secondary">搜索</button>
            <button id="newBtn" class="btn topbar-new-btn">新建笔记</button>
            <button id="logoutBtn" class="btn secondary">退出登录</button>
          </div>
        </header>

        <div id="statusLine" class="status-line"></div>

        <main class="layout">
          <section class="card feed">
            <div class="section-head">
              <div>
                <h2 class="section-title">全部笔记</h2>
                <div class="section-desc">按更新时间排序，支持直接复制内容。</div>
              </div>
              <div id="noteCount" class="muted">0 条</div>
            </div>
            <div id="noteList" class="note-list"></div>
          </section>
        </main>
      </section>
    </div>

    <div id="editorModal" class="modal-backdrop hidden">
      <div class="card modal-card">
        <div class="modal-head">
          <div>
            <h2 id="modalTitle" class="section-title">新建笔记</h2>
            <div class="section-desc">保留简单编辑窗，平时主要还是用来浏览和复制。</div>
          </div>
          <button id="closeModalBtn" class="btn secondary">关闭</button>
        </div>
        <input id="editorTitle" class="input" placeholder="标题" />
        <div style="height:12px"></div>
        <textarea id="editorContent" class="textarea" placeholder="# 今天想到什么&#10;&#10;- 一条记录&#10;- 一个链接&#10;- 一个待办"></textarea>
        <div class="modal-actions">
          <button id="cancelBtn" class="btn secondary">取消</button>
          <button id="saveBtn" class="btn">保存</button>
        </div>
      </div>
    </div>
    <button id="fabNewBtn" class="btn fab-new" type="button" aria-label="新建笔记">＋</button>
    <button id="fabTopBtn" class="fab-top" type="button" aria-label="回到顶部">↑</button>

    <script>
      const state = {
        notes: [],
        editingId: null,
        expandedIds: new Set(),
        searchTimer: null,
        statusTimer: null
      };

      const els = {
        loginView: document.getElementById('loginView'),
        appView: document.getElementById('appView'),
        passwordInput: document.getElementById('passwordInput'),
        loginBtn: document.getElementById('loginBtn'),
        loginStatus: document.getElementById('loginStatus'),
        searchInput: document.getElementById('searchInput'),
        clearSearchBtn: document.getElementById('clearSearchBtn'),
        searchBtn: document.getElementById('searchBtn'),
        newBtn: document.getElementById('newBtn'),
        fabNewBtn: document.getElementById('fabNewBtn'),
        fabTopBtn: document.getElementById('fabTopBtn'),
        logoutBtn: document.getElementById('logoutBtn'),
        statusLine: document.getElementById('statusLine'),
        noteCount: document.getElementById('noteCount'),
        noteList: document.getElementById('noteList'),
        editorModal: document.getElementById('editorModal'),
        modalTitle: document.getElementById('modalTitle'),
        editorTitle: document.getElementById('editorTitle'),
        editorContent: document.getElementById('editorContent'),
        closeModalBtn: document.getElementById('closeModalBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        saveBtn: document.getElementById('saveBtn')
      };

      function setStatus(text) {
        clearTimeout(state.statusTimer);
        if (!text) {
          els.statusLine.textContent = '';
          els.statusLine.classList.remove('show');
          return;
        }
        els.statusLine.textContent = text;
        els.statusLine.classList.add('show');
        state.statusTimer = setTimeout(function () {
          els.statusLine.classList.remove('show');
        }, 1800);
      }

      function updateSearchUi() {
        const hasText = Boolean(els.searchInput.value.trim());
        els.clearSearchBtn.classList.toggle('show', hasText);
      }

      function updateScrollUi() {
        const shouldShow = window.scrollY > 320;
        els.fabTopBtn.classList.toggle('show', shouldShow);
      }

      function showLogin() {
        els.loginView.classList.remove('hidden');
        els.appView.classList.add('hidden');
      }

      function showApp() {
        els.loginView.classList.add('hidden');
        els.appView.classList.remove('hidden');
      }

      function formatDate(ts) {
        if (!ts) return '-';
        return new Intl.DateTimeFormat('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date(ts));
      }

      function formatGroupLabel(ts) {
        const d = new Date(ts);
        const now = new Date();
        const startOf = function (value) {
          return new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
        };
        const diffDays = Math.floor((startOf(now) - startOf(d)) / 86400000);
        if (diffDays === 0) return '今天';
        if (diffDays === 1) return '昨天';
        return new Intl.DateTimeFormat('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(d);
      }

      function wordCount(text) {
        return (text || '').replace(/\\s+/g, '').length;
      }

      function previewOf(note) {
        return (note.content || '').replace(/\\s+/g, ' ').slice(0, 120) || '（空内容）';
      }

      function escapeHtml(text) {
        return (text || '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }

      function escapeRegExp(text) {
        return text.replace(/[.*+?^$()|[\]\\{}]/g, '\\$&');
      }

      function highlightText(text, query) {
        const safe = escapeHtml(text || '');
        if (!query) return safe;
        const escaped = escapeRegExp(query.trim());
        if (!escaped) return safe;
        return safe.replace(new RegExp(escaped, 'gi'), function (match) {
          return '<mark class="search-highlight">' + match + '</mark>';
        });
      }

      function getDisplayContent(note) {
        const content = note.content || '';
        const lines = content.split('\\n');
        const expanded = state.expandedIds.has(note.id);
        return {
          text: expanded ? content : lines.slice(0, 30).join('\\n'),
          expanded: expanded,
          canExpand: lines.length > 30
        };
      }

      async function api(url, options) {
        const res = await fetch(url, options);
        const data = await res.json().catch(function () { return {}; });
        if (res.status === 401) {
          showLogin();
          throw new Error('请先登录');
        }
        if (!res.ok) {
          throw new Error(data.error || '请求失败');
        }
        return data;
      }

      function renderList() {
        els.noteList.innerHTML = '';
        els.noteCount.textContent = state.notes.length ? ('共 ' + state.notes.length + ' 条') : '0 条';

        if (!state.notes.length) {
          els.noteList.innerHTML = '<div class="empty-feed">现在还没有笔记。点击右上角“新建笔记”，写第一条就行。</div>';
          return;
        }

        const groups = new Map();
        state.notes.forEach(function (note) {
          const key = formatGroupLabel(note.updated_at);
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key).push(note);
        });

        groups.forEach(function (notes, groupLabel) {
          const group = document.createElement('section');
          group.className = 'group-block';

          const groupTitle = document.createElement('div');
          groupTitle.className = 'group-title';
          groupTitle.textContent = groupLabel;
          group.appendChild(groupTitle);

          notes.forEach(function (note) {
            const card = document.createElement('article');
            card.className = 'note-card';

            const meta = document.createElement('div');
            meta.className = 'note-card-meta';
            meta.innerHTML = '<span>' + formatDate(note.updated_at) + '</span><span>' + wordCount(note.content) + ' 字</span>';

            const title = document.createElement('div');
            title.className = 'note-card-title';
            title.innerHTML = highlightText(note.title || '无标题', els.searchInput.value.trim());

            const preview = document.createElement('div');
            preview.className = 'note-card-detail';
            preview.innerHTML = highlightText(previewOf(note), els.searchInput.value.trim());

            const actions = document.createElement('div');
            actions.className = 'note-actions';

            const copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.className = 'btn';
            copyBtn.textContent = '复制全文';
            copyBtn.onclick = async function () {
              try {
                await navigator.clipboard.writeText(note.content || '');
                setStatus('已复制：' + (note.title || '无标题'));
              } catch (error) {
                setStatus('复制失败，请手动选择文本复制');
              }
            };

            const editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'btn secondary';
            editBtn.textContent = '编辑';
            editBtn.onclick = function () {
              openComposer(note);
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn danger';
            deleteBtn.textContent = '删除';
            deleteBtn.onclick = function () {
              deleteNote(note.id).catch(function (error) {
                setStatus(error.message || '删除失败');
              });
            };

            const body = document.createElement('div');
            const displayContent = getDisplayContent(note);
            body.className = 'note-card-text' + (note.content ? '' : ' is-empty');
            body.textContent = note.content ? displayContent.text : '这条笔记还没有内容。';
            const bodyWrap = document.createElement('div');
            bodyWrap.className = 'note-card-text-wrap' + (displayContent.canExpand && !displayContent.expanded ? ' collapsed' : '');
            bodyWrap.appendChild(body);

            card.appendChild(meta);
            card.appendChild(actions);
            actions.appendChild(copyBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            card.appendChild(title);
            card.appendChild(preview);
            card.appendChild(bodyWrap);

            if (displayContent.canExpand) {
              const toggleBtn = document.createElement('button');
              toggleBtn.type = 'button';
              toggleBtn.className = 'btn secondary note-expand';
              toggleBtn.textContent = displayContent.expanded ? '收起' : '展开全文';
              toggleBtn.onclick = function () {
                if (state.expandedIds.has(note.id)) {
                  state.expandedIds.delete(note.id);
                } else {
                  state.expandedIds.add(note.id);
                }
                renderList();
              };
              card.appendChild(toggleBtn);
            }

            group.appendChild(card);
          });

          els.noteList.appendChild(group);
        });
      }

      async function refreshNotes() {
        const q = els.searchInput.value.trim();
        const query = q ? '?q=' + encodeURIComponent(q) : '';
        const data = await api('/api/notes' + query);
        state.notes = data.notes || [];
        state.expandedIds.forEach(function (id) {
          if (!state.notes.find(function (note) { return note.id === id; })) {
            state.expandedIds.delete(id);
          }
        });
        renderList();
      }

      function openComposer(note) {
        state.editingId = note ? note.id : null;
        els.modalTitle.textContent = note ? '编辑笔记' : '新建笔记';
        els.editorTitle.value = note ? note.title : '';
        els.editorContent.value = note ? note.content : '';
        els.editorModal.classList.remove('hidden');
        els.editorTitle.focus();
      }

      function closeComposer() {
        els.editorModal.classList.add('hidden');
        state.editingId = null;
      }

      async function saveComposer() {
        const title = els.editorTitle.value.trim() || '无标题';
        const content = els.editorContent.value.trim();
        if (!title && !content) {
          setStatus('标题和内容至少写一个');
          return;
        }

        setStatus('保存中…');

        let data;
        if (state.editingId) {
          data = await api('/api/notes/' + encodeURIComponent(state.editingId), {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title: title, content: content })
          });
        } else {
          data = await api('/api/notes', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title: title, content: content })
          });
        }

        closeComposer();
        await refreshNotes();
        setStatus('已保存');
      }

      async function deleteNote(id) {
        if (!id) {
          setStatus('当前没有可删除的记录');
          return;
        }
        if (!confirm('确定删除这条笔记吗？')) return;

        await api('/api/notes/' + encodeURIComponent(id), {
          method: 'DELETE'
        });

        await refreshNotes();
        setStatus('已删除');
      }

      async function checkSession() {
        const data = await api('/api/session');
        if (data.authenticated) {
          showApp();
          await refreshNotes();
        } else {
          showLogin();
        }
      }

      els.loginBtn.onclick = async function () {
        try {
          els.loginStatus.textContent = '登录中…';
          await api('/api/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ password: els.passwordInput.value })
          });
          els.passwordInput.value = '';
          els.loginStatus.textContent = '';
          showApp();
          await refreshNotes();
        } catch (error) {
          els.loginStatus.textContent = error.message || '登录失败';
        }
      };

      els.passwordInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') els.loginBtn.click();
      });

      els.searchBtn.onclick = function () {
        refreshNotes()
          .then(function () { setStatus('已刷新搜索结果'); })
          .catch(function (error) { setStatus(error.message || '搜索失败'); });
      };

      els.searchInput.addEventListener('input', function () {
        updateSearchUi();
        clearTimeout(state.searchTimer);
        state.searchTimer = setTimeout(function () {
          refreshNotes().catch(function (error) {
            setStatus(error.message || '搜索失败');
          });
        }, 260);
      });

      els.searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') els.searchBtn.click();
      });

      els.clearSearchBtn.onclick = function () {
        els.searchInput.value = '';
        updateSearchUi();
        refreshNotes().catch(function (error) {
          setStatus(error.message || '搜索失败');
        });
      };

      els.newBtn.onclick = function () {
        openComposer(null);
      };

      els.fabNewBtn.onclick = function () {
        openComposer(null);
      };

      els.fabTopBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      els.logoutBtn.onclick = async function () {
        await api('/api/logout', { method: 'POST' });
        state.notes = [];
        showLogin();
        setStatus('');
      };

      els.closeModalBtn.onclick = closeComposer;
      els.cancelBtn.onclick = closeComposer;
      els.saveBtn.onclick = function () {
        saveComposer().catch(function (error) {
          setStatus(error.message || '保存失败');
        });
      };

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !els.editorModal.classList.contains('hidden')) {
          closeComposer();
        }
        const isSave = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's';
        if (isSave && !els.editorModal.classList.contains('hidden')) {
          event.preventDefault();
          saveComposer().catch(function (error) {
            setStatus(error.message || '保存失败');
          });
        }
      });

      window.addEventListener('scroll', updateScrollUi, { passive: true });

      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('/sw.js').catch(function () {});
        });
      }

      updateSearchUi();
      updateScrollUi();
      checkSession().catch(function () {
        showLogin();
      });
    </script>
  </body>
</html>`;
