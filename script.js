// script.js - Vanilla JavaScript for wedding invitation website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScroll();
    initMobileNav();
    initGalleryLightbox();
    initCountdownTimer();
    initFormValidation();
    initScrollAnimations();
});

// Mobile navigation menu and hide-on-scroll behavior
function initMobileNav() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navLinksContainer = document.querySelector('.nav-links');

    if (!nav || !navToggle || !navLinksContainer) return;

    let lastScrollY = window.scrollY;

    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        if (isOpen) {
            navLinksContainer.scrollTop = 0;
        }
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        });
    });

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            nav.classList.add('nav-hidden');
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                navLinksContainer.scrollTop = 0;
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        } else {
            nav.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('open')) {
            nav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
        }

        if (nav.classList.contains('open')) {
            navLinksContainer.scrollTop = 0;
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gallery lightbox functionality
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.dataset.full;
            lightboxImg.alt = this.alt;
        });
    });
    
    // Close lightbox when clicking close button or outside the image
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });
}

// Countdown timer to wedding date
function initCountdownTimer() {
    // Set wedding date - CHANGE THIS TO YOUR ACTUAL WEDDING DATE
    const weddingDate = new Date('May 1, 2026 16:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        } else {
            // Wedding has passed
            document.getElementById('countdown').innerHTML = '<div>Wedding Day!</div>';
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Form validation for contribution section
function initFormValidation() {
    const form = document.getElementById('contribution-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const amount = document.getElementById('amount').value;
        
        let isValid = true;
        let errors = [];
        
        // Validate name
        if (name.length < 2) {
            isValid = false;
            errors.push('Please enter a valid name (at least 2 characters)');
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errors.push('Please enter a valid email address');
        }
        
        // Validate amount
        if (!amount || amount <= 0) {
            isValid = false;
            errors.push('Please enter a valid contribution amount');
        }
        
        if (isValid) {
            // Form is valid - in a real implementation, this would submit to a payment processor
            alert('Thank you for your contribution! (This is a placeholder - integrate with your payment processor)');
            
            // Reset form
            form.reset();
        } else {
            // Display errors
            alert('Please correct the following errors:\n' + errors.join('\n'));
        }
    });
}

// Scroll animations for fade-in effects
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}