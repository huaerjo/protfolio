// 仅负责导航、联系交互和案例元数据；页面内容与样式可独立编辑。
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
}
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
let feedbackTimer;
document.querySelector('.copy-email')?.addEventListener('click', async (event) => {
  const email = event.currentTarget.dataset.email;
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = '邮箱已复制，期待与你交流。';
  } catch {
    status.textContent = `请手动复制邮箱：${email}`;
  }
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => status.textContent = '', 5000);
});
// 在此调整项目标题与介绍。案例正文位于 project.html。
const projects = {
  web: { title: '企业协作 Web 系统', category: '01 / WEB SYSTEM', type: 'Web 系统', focus: '信息架构 / 多角色协作', summary: '围绕多角色协作，组织信息与核心业务流程。', next: 'admin' },
  admin: { title: '企业运营管理后台', category: '02 / ADMIN PLATFORM', type: '企业后台', focus: '设计规范 / 效率体验', summary: '让高频操作更顺手，让复杂数据更容易理解。', next: 'mini' },
  mini: { title: '企业服务小程序', category: '03 / MINI PROGRAM', type: '小程序', focus: '移动体验 / 服务设计', summary: '连接移动场景，让关键服务触手可及。', next: 'web' }
};
if (document.body.classList.contains('detail-page')) {
  const key = new URLSearchParams(location.search).get('project') || 'web';
  const project = projects[key];
  if (project) {
    document.title = `${project.title} · 戴金菊`;
    for (const field of ['title', 'category', 'type', 'focus', 'summary']) {
      document.getElementById(`project-${field}`).textContent = project[field];
    }
    const nextLink = document.querySelector('#next-project');
    nextLink.href = `./project.html?project=${project.next}`;
    nextLink.textContent = `下一个：${projects[project.next].title} ↗`;
  } else {
    document.querySelector('.detail-hero').innerHTML = '<span class="eyebrow">PROJECT NOT FOUND</span><h1>未找到这个项目</h1><p>请返回作品列表选择项目。</p><a class="button primary" href="./index.html#work">返回作品列表 ↗</a>';
    document.querySelectorAll('.case-placeholder.large, .case-layout, .detail-bottom').forEach(el => el.hidden = true);
    document.title = '项目未找到 · 戴金菊';
  }
}
