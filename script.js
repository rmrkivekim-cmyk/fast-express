// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Animate counter numbers
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const updateCount = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };
    updateCount();
}

// Intersection Observer for scroll animations
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

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        if (!email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Open the visitor's email app with the message addressed to Fast Express.
        // Replace the address below with the real Fast Express email before launch.
        const recipient = 'YOUR-EMAIL@example.com';
        const subject = encodeURIComponent('Fast Express website inquiry');
        const body = encodeURIComponent(`Email: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        showMessage('Your email app is opening so you can send your message.', 'success');
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

// Header shadow on scroll
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    document.querySelector('header').style.boxShadow = scrollTop > 100
        ? '0 2px 10px rgba(0,0,0,0.2)'
        : '0 2px 5px rgba(0,0,0,0.1)';
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

console.log('Fast Express website loaded successfully!');
