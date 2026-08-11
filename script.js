const root = document.documentElement;
const languageButton = document.querySelector('.lang-switch');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

function setLanguage(language) {
  const lang = language === 'en' ? 'en' : 'ru';
  root.lang = lang;
  localStorage.setItem('xxant-site-language', lang);
  document.querySelectorAll('[data-ru][data-en]').forEach((element) => {
    element.textContent = element.dataset[lang];
  });
  if (languageButton) {
    languageButton.querySelectorAll('span').forEach((item) => {
      item.classList.toggle('active', item.textContent.toLowerCase() === lang);
    });
  }
  document.title = lang === 'ru' ? 'Xxant — Market Intelligence' : 'Xxant — Market Intelligence';
}

setLanguage(localStorage.getItem('xxant-site-language') || (navigator.language.startsWith('ru') ? 'ru' : 'en'));

languageButton?.addEventListener('click', () => {
  setLanguage(root.lang === 'ru' ? 'en' : 'ru');
});

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const modal = document.querySelector('.image-modal');
const modalImage = modal?.querySelector('img');
document.querySelectorAll('[data-image]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!modal || !modalImage) return;
    modalImage.src = button.dataset.image;
    modal.showModal();
  });
});
modal?.querySelector('button')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
