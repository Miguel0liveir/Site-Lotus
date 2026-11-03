const current = document.body.dataset.page;
document.querySelectorAll('.nav a').forEach(a => {
  if (a.dataset.page === current) {
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
  }
});
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
function setMenu(open) {
  if (!menu || !nav) return;
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.textContent = open ? '×' : '☰';
}
menu?.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', e => {
  if (nav?.classList.contains('open') && !e.target.closest('.head')) setMenu(false);
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 920 && nav?.classList.contains('open')) setMenu(false);
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => {
    const selected = b === button;
    b.classList.toggle('active', selected);
    b.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = button.dataset.filter !== 'Todos' && card.dataset.category !== button.dataset.filter;
  });
}));
document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('active'))));
const select = document.querySelector('#servico');
if (select) {
  const query = new URLSearchParams(location.search).get('servico');
  if (query && [...select.options].some(o => o.value === query)) select.value = query;
}
document.querySelector('#contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.querySelector('#nome').value.trim();
  const service = select.value;
  const message = document.querySelector('#mensagem').value.trim();
  if (!name || !message) return;
  const subject = service ? `Contato pelo site Lótus — ${service}` : 'Contato pelo site Lótus';
  const body = `Olá! Meu nome é ${name}.\n${service ? 'Serviço de interesse: ' + service + '\n' : ''}\n${message}`;
  window.location.href = `mailto:lotusmassoterapiaebemestar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
