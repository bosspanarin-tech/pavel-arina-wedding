(() => {
  'use strict';
  const target = new Date('2027-07-17T18:00:00+03:00').getTime();
  const fields = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
  let timer;
  function updateCountdown() {
    const remaining = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const values = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
    fields.forEach((field, i) => { field.textContent = String(values[i]).padStart(2, '0'); });
    if (remaining === 0) {
      document.getElementById('countdown-message').textContent = 'Наш день настал. Спасибо, что вы с нами!';
      clearInterval(timer);
    }
  }
  updateCountdown();
  if (Date.now() < target) timer = setInterval(updateCountdown, 1000);

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }

  const dialog = document.getElementById('photo-dialog');
  const openButton = document.getElementById('open-photo');
  if (typeof dialog.showModal === 'function') {
    openButton.addEventListener('click', () => dialog.showModal());
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  } else {
    openButton.addEventListener('click', () => window.open('assets/pavel-arina-color.jpg', '_blank', 'noopener'));
  }
})();
