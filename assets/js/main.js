// Scroll Progress Bar
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
    }, { passive: true });
}

// Cursor Glow (desktop/mouse only)
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }, { passive: true });
    } else {
        cursorGlow.style.display = 'none';
    }
}

// Stats Count-up Animation
function countUp(el) {
    const target = parseInt(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), target);
        el.textContent = prefix + current + suffix;
        if (step >= steps) clearInterval(timer);
    }, duration / steps);
}

const statEls = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });
statEls.forEach(el => statsObserver.observe(el));

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

// AOS Animations
AOS.init({
    offset: 100,
    delay: 0,
    duration: 650,
    easing: 'ease',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
});

// Typing Animation
const roles = [
    'Founding Engineer',
    'Full Stack Developer',
    'AI Automation Builder',
    'LLM Integration Specialist',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
    if (!typedEl) return;
    const current = roles[roleIndex];

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => { isDeleting = true; }, 1600);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    const speed = isDeleting ? 55 : 100;
    setTimeout(type, speed);
}

setTimeout(type, 800);
