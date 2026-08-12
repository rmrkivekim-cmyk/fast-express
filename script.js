// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
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
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
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
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            
            // Animate stats when about section comes into view
            if (entry.target.classList.contains('about')) {
                const statElements = entry.target.querySelectorAll('.stat-item h3');
                statElements.forEach((el, index) => {
                    setTimeout(() => {
                        const target = parseInt(el.textContent) || 0;
                        if (target > 0) {
                            animateCounter(el, target);
                        }
                    }, index * 200);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, section').forEach(element => {
    observer.observe(element);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (!email || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate sending (in a real app, you'd send to a server)
        showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
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
    
    // Auto-hide success message after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 3000);
    }
}

// Add scroll-to-top functionality
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Optional: Add class to header on scroll
    if (scrollTop > 100) {
        document.querySelector('header').style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    } else {
        document.querySelector('header').style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

console.log('Fast Express website loaded successfully!');
