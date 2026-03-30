// Змушує браузер тримати нас на початку сторінки при першому вході / оновленні з телефону. 
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Абсолютна безпека щоб браузер не тягнув екран донизу при завантаженні (запобіжник для телефонів)
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    // Дублюємо scroll до верху одразу як відмальовано контент
    setTimeout(() => { window.scrollTo(0, 0); }, 50);

    /* ==========================================
       Sticky Header Setup
       ========================================== */
    const header = document.getElementById("header");
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    
    checkScroll();
    window.addEventListener("scroll", checkScroll);

    /* ==========================================
       Mobile Menu Navigation Setup
       ========================================== */
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("active");
        });
    });

    /* ==========================================
       Intersection Observer for Smooth Fade In
       ========================================== */
    const fadeElements = document.querySelectorAll(".animate-on-scroll");
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    /* ==========================================
       Custom Before / After Slider Logic
       ========================================== */
    const slider = document.getElementById("ba-slider");
    if (slider) {
        let isSliding = false;

        const moveSlider = (clientX) => {
            const rect = slider.getBoundingClientRect();
            let position = ((clientX - rect.left) / rect.width) * 100;
            
            if (position < 0) position = 0;
            if (position > 100) position = 100;

            slider.style.setProperty('--position', `${position}%`);
        };

        // Обробка подій миші (Desktop)
        slider.addEventListener('mousedown', (e) => {
            isSliding = true;
            moveSlider(e.clientX);
        });
        window.addEventListener('mouseup', () => isSliding = false);
        window.addEventListener('mousemove', (e) => {
            if (isSliding) moveSlider(e.clientX);
        });

        // Обробка сенсорних екранів (Phone/Tablet)
        slider.addEventListener('touchstart', (e) => {
            isSliding = true;
            moveSlider(e.touches[0].clientX);
        }, {passive: true}); // better performance
        window.addEventListener('touchend', () => isSliding = false);
        window.addEventListener('touchmove', (e) => {
            if (isSliding) moveSlider(e.touches[0].clientX);
        });
    }

    /* ==========================================
       Form Submission Simulation
       ========================================== */
    const form = document.getElementById("contactForm");
    const msg = document.getElementById("form-message");
    
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector("button[type='submit']");
            const btnOriginalText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            // Імітація надсилання 
            setTimeout(() => {
                submitBtn.innerText = btnOriginalText;
                submitBtn.disabled = false;
                form.reset(); 
                msg.classList.add("active");

                // Скидаємо повідомлення успіху через 5с
                setTimeout(() => {
                    msg.classList.remove("active");
                }, 5000);

            }, 1200);
        });
    }
});
