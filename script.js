// Custom Cursor
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    cursorDot.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    
    // Smooth trailing effect for the ring
    setTimeout(() => {
        cursorRing.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    }, 50);
});

// Cursor interactive effects
const interactables = document.querySelectorAll('button, a, .dash-nav-item, .feature-card, .pricing-card');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.borderColor = 'var(--c-gold-primary)';
        cursorRing.style.backgroundColor = 'rgba(212, 168, 67, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'var(--c-glass-border)';
        cursorRing.style.backgroundColor = 'transparent';
    });
});

// Initial reveals
window.addEventListener('load', () => {
    reveal();
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.classList.add('active');
        // Transform hamburger to X
        hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburger.children[1].style.opacity = '0';
        hamburger.children[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        mobileMenu.classList.remove('active');
        // Reset hamburger
        hamburger.children[0].style.transform = 'none';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'none';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if(menuOpen) hamburger.click();
    });
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll('.reveal-up, .reveal-scale');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
            
            // If it's a stats container, animate numbers
            if(reveals[i].classList.contains('hero-stats') && !reveals[i].classList.contains('counted')) {
                animateNumbers();
                reveals[i].classList.add('counted');
            }
            
            // If it's metrics section, animate rings
            if(reveals[i].classList.contains('metric-card') && !reveals[i].classList.contains('ring-animated')) {
                const ringFill = reveals[i].querySelector('.ring-fill');
                if(ringFill) {
                    const percent = ringFill.getAttribute('data-percent');
                    const circumference = 2 * Math.PI * 54; // r=54
                    const offset = circumference - (percent / 100) * circumference;
                    setTimeout(() => {
                        ringFill.style.strokeDashoffset = offset;
                    }, 500); // Wait for card reveal
                }
                reveals[i].classList.add('ring-animated');
            }
        }
    }
}
window.addEventListener('scroll', reveal);

// Number Counter Animation
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                // Formatting based on whether it has decimals
                stat.innerText = target % 1 === 0 ? Math.ceil(current) : current.toFixed(1);
                requestAnimationFrame(updateCounter);
            } else {
                stat.innerText = target;
            }
        };
        updateCounter();
    });
}

// Interactive Dashboard Chart (Bar hover effect is in CSS, we can add dynamic height changes if needed)



// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if(this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
        }
    });
});

// Highlight active section on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Chat Interaction Simulation
const chatInput = document.querySelector('.chat-input');
const chatSend = document.querySelector('.chat-send');
const chatMessages = document.querySelector('.chat-messages');

if(chatSend && chatInput) {
    chatSend.addEventListener('click', () => {
        chatInput.value = '';
        const msg = document.createElement('div');
        msg.className = 'chat-msg ai';
        msg.textContent = "I'm processing that request now. Standby for updated pipeline metrics.";
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

// Parallax effect on mascot
const heroVisual = document.querySelector('.hero-visual');
const mascot = document.getElementById('hero-mascot');

if(heroVisual && mascot) {
    heroVisual.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        mascot.style.transform = `translate(${x}px, ${y}px)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
        mascot.style.transform = `translate(0, 0)`;
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if(!isActive) item.classList.add('active');
    });
});

// =============================================
// THEME TOGGLE
// =============================================
(function() {
    const html = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');

    // Load saved preference
    const savedTheme = localStorage.getItem('laipord-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('laipord-theme', next);
        });
    }
})();

// Original Particle System (Restored for Dark Theme)
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    if(!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.8 ? 'rgba(212, 168, 67, 0.5)' : 'rgba(255, 255, 255, 0.1)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    let numParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

// Performance Optimization: Pause animations when tab is hidden
let isTabActive = true;
document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
});

function animateParticles() {
    if(!canvas || !isTabActive || document.documentElement.getAttribute('data-theme') === 'light') {
        requestAnimationFrame(animateParticles);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initCanvas();
animateParticles();

window.addEventListener('resize', initCanvas);
