// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const updateCount = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
        } else element.textContent = target;
    };
    updateCount();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        if (entry.target.classList.contains('about')) {
            entry.target.querySelectorAll('.stat-item h3').forEach((el, index) => {
                setTimeout(() => animateCounter(el, parseInt(el.textContent) || 0), index * 200);
            });
        }
        observer.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.card, section').forEach(element => observer.observe(element));

// Formspree handles contact-form delivery. No mail app is required.
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        if (!email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        button.disabled = true;
        button.textContent = 'Sending...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                showMessage('Thanks! Your message has been sent.', 'success');
            } else {
                showMessage('Sorry, your message could not be sent. Please try again.', 'error');
            }
        } catch (error) {
            showMessage('Sorry, there was a connection problem. Please try again.', 'error');
        } finally {
            button.disabled = false;
            button.textContent = 'Send Message';
        }
    });
}

function showMessage(text, type) {
    let formMessage = document.querySelector('.form-message');
    if (!formMessage) {
        formMessage = document.createElement('div');
        formMessage.className = 'form-message';
        contactForm.appendChild(formMessage);
    }
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    document.querySelector('header').style.boxShadow = scrollTop > 100
        ? '0 2px 10px rgba(0,0,0,0.2)'
        : '0 2px 5px rgba(0,0,0,0.1)';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

console.log('Fast Express website loaded successfully!');
