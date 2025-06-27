const links = document.querySelectorAll('nav ul li a');

// Scroll ile aktif link güncelleme
function onScroll() {
    let scrollPos = window.scrollY + 100; // navbar yüksekliği veya offset
    links.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (
            section.offsetTop <= scrollPos &&
            section.offsetTop + section.offsetHeight > scrollPos
        ) {
            links.forEach(l => {
                l.classList.remove('active');
                l.removeAttribute('aria-current');
            });
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

window.addEventListener('scroll', onScroll);

// Linklere tıklayınca smooth scroll ve aktiflik ayarı
links.forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            links.forEach(l => {
                l.classList.remove('active');
                l.removeAttribute('aria-current');
            });
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');

            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // dış sayfa linklerinde e.preventDefault yok, doğal yönlenir
    });
});

// Yukarı butonu ekle
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '↑';
backToTopBtn.id = 'backToTopBtn';
document.body.appendChild(backToTopBtn);

backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 10px 16px;
  font-size: 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 8px var(--btn-shadow);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll'a göre butonu göster/gizle
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
    }
});
