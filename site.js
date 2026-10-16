(() => {
  const elements = [...document.querySelectorAll('[data-fr]')];
  const originals = new Map(elements.map(el => [el, el.innerHTML]));
  const buttons = [...document.querySelectorAll('.language')];
  const links = [...document.querySelectorAll('a[href="contact.html"],a[href="./"]')].map(link => ({link, base: link.getAttribute('href')}));
  const setLanguage = lang => {
    document.documentElement.lang = lang;
    elements.forEach(el => { if (lang === 'fr') el.textContent = el.dataset.fr; else el.innerHTML = originals.get(el); });
    buttons.forEach(button => { button.textContent = lang === 'fr' ? 'EN' : 'FR'; button.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français'); });
    links.forEach(({link, base}) => link.setAttribute('href', base + (lang === 'fr' ? '?lang=fr' : '')));
  };
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(document.documentElement.lang === 'fr' ? 'en' : 'fr')));
  if (new URLSearchParams(location.search).get('lang') === 'fr') setLanguage('fr');
})();
