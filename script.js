document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Progress Bars Animation
    const progressBars = document.querySelectorAll('.progress');
    
    // Store original widths
    progressBars.forEach(bar => {
        bar.setAttribute('data-original-width', bar.style.width);
    });

    function animateProgressBars() {
        progressBars.forEach((bar, index) => {
            const originalWidth = bar.getAttribute('data-original-width');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = originalWidth;
            }, 200 * index); // Staggered animation
        });
    }

    // Intersection Observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset all progress bars
                progressBars.forEach(bar => {
                    bar.style.width = '0';
                });
                // Animate them with delay
                setTimeout(animateProgressBars, 300);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observe skills section
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        progressObserver.observe(skillsSection);
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 300) {
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
});