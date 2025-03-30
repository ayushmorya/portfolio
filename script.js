// Welcome Animation with Waves and Shapes
document.addEventListener("DOMContentLoaded", () => {
    const welcomeOverlay = document.querySelector(".welcome-overlay");
    const shapes = document.querySelectorAll(".shape");

    // Parallax Effect on Mouse Move
    document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        shapes.forEach((shape, index) => {
            const depth = (index + 1) * 20; // Vary depth for each shape
            const translateX = mouseX * depth;
            const translateY = mouseY * depth;
            shape.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${index * 15}deg)`;
        });
    });

    // Hide overlay after animation
    setTimeout(() => {
        welcomeOverlay.style.animation = "fadeOut 0.8s ease forwards";
    }, 5000); // Matches CSS fadeOut timing
});
// -------------------------------------------------------------------------------------------------------
// Particle.js Initialization (Optimized for Smoothness)
particlesJS('particles-js', {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } }, // Reduced for better performance
        color: { value: ['#00c4b4', '#4a4a4a', '#1a1a1a'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#e0e0e0', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Night Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
if (themeToggle) {
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Smooth Scrolling for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation for Sections
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Animate Radial Progress in Skills Section
const skillsSection = document.querySelector('.skills');
const skillItems = document.querySelectorAll('.skill-item');
let skillsAnimated = false;

function animateRadialProgress() {
    if (skillsAnimated) return;
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight * 0.8) {
        skillItems.forEach(item => {
            const radialProgress = item.querySelector('.radial-progress');
            const progress = radialProgress.getAttribute('data-progress');
            radialProgress.style.setProperty('--progress', progress);
            item.classList.add('visible');
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateRadialProgress);

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal Effect for About Me Text
const aboutText = document.querySelector('.about-text');
const aboutSection = document.querySelector('.about-me');
let aboutAnimated = false;

function revealAboutText() {
    if (aboutAnimated) return;
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight * 0.8) {
        aboutText.classList.add('reveal');
        aboutAnimated = true;
    }
}

window.addEventListener('scroll', revealAboutText);

// View Full Resume Button (Modal)
const viewFullResumeButton = document.querySelector('.view-full-resume-btn');
if (viewFullResumeButton) {
    viewFullResumeButton.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('resume-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">×</span>
                <img src="./resume.jpg" alt="Full Resume" class="full-resume-image">
            </div>
        `;
        document.body.appendChild(modal);

        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
}

// Contact Form Animation
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.reset();
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });
}

// Live Clock in Footer
function updateClock() {
    const clock = document.getElementById('live-clock');
    if (clock) {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }
}
setInterval(updateClock, 1000);
updateClock();