const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || 'Website visitor';
    const company = data.get('company') || 'Not specified';
    const email = data.get('email') || 'Not specified';
    const message = data.get('message') || '';
    const subject = encodeURIComponent(`Business enquiry from ${company}`);
    const body = encodeURIComponent(`Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:info@ascentra-trading.com?subject=${subject}&body=${body}`;
    note.textContent = 'Your email client is opening with the message prepared.';
  });
}

const home = document.querySelector('.page-home');
if (home) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth > 900) {
      const orbit = document.querySelector('.hero-orbit');
      if (orbit) orbit.style.transform = `translateY(calc(-50% + ${Math.min(window.scrollY * 0.08, 55)}px)) rotate(${window.scrollY * 0.015}deg)`;
    }
  }, { passive: true });
}

// Visitors forwarded from the old wealthymega.com domain see a one-line rename notice.
(function () {
  if (!/[?&]from=wealthymega\b/.test(location.search)) return;
  var bar = document.createElement('div');
  bar.className = 'rename-notice';
  bar.setAttribute('role', 'status');
  bar.innerHTML = '<span><strong>Wealthy Mega Trade Limited</strong> is now <strong>ASCENTRA Trading Limited</strong>. Same services, new name.</span>' +
    '<button type="button" aria-label="Close">&times;</button>';
  bar.querySelector('button').addEventListener('click', function () { bar.remove(); });
  document.body.insertBefore(bar, document.body.firstChild);
  requestAnimationFrame(function () { if (window.scrollY < 120) window.scrollTo(0, 0); });
  history.replaceState(null, '', location.pathname + location.hash);
})();
