// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Smooth scrolling for navigation links
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

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || window.scrollY;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.pageYOffset || window.scrollY;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Fade in on scroll animation with Intersection Observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
        fadeElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
        fadeElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }

    // Typing animation - ensure it plays on load
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        // Force animation to play
        heroName.style.animation = 'none';
        setTimeout(function() {
            heroName.style.animation = 'typing 3s steps(20, end), blink 0.75s step-end infinite';
        }, 100);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset || window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
            heroSection.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // Add active class styling
    if (!document.getElementById('dynamic-nav-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-nav-styles';
        style.textContent = 
            '.nav-link.active {' +
                'color: var(--primary-color) !important;' +
            '}' +
            '.nav-link.active::after {' +
                'width: 100%;' +
            '}';
        document.head.appendChild(style);
    }

    // Mobile menu close on link click
    const navLinksMobile = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navLinksMobile.length > 0 && navbarCollapse) {
        navLinksMobile.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992 && typeof bootstrap !== 'undefined') {
                    try {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        });
                        bsCollapse.hide();
                    } catch (e) {
                        // Fallback if bootstrap is not loaded
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });
    }
});

// Also run on window load as backup
window.addEventListener('load', function() {
    // Ensure fade-in elements are visible if IntersectionObserver didn't trigger
    setTimeout(function() {
        const fadeElements = document.querySelectorAll('.fade-in-on-scroll:not(.visible)');
        fadeElements.forEach(function(el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 500);
});
