document.addEventListener("DOMContentLoaded", () => {
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
    // Виклик під час завантаження
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
                // Прибираємо відстеження після того як елемент з'явився
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

        // Зміна позиції за допомогою обчислень миші чи touch евенту
        const moveSlider = (clientX) => {
            const rect = slider.getBoundingClientRect();
            let position = ((clientX - rect.left) / rect.width) * 100;
            
            // Ліміт на переміщення (не давати вийти за межі 0% і 100%)
            if (position < 0) position = 0;
            if (position > 100) position = 100;

            // Змінюємо CSS-змінну яка керує кліпом і лінією слайдера
            slider.style.setProperty('--position', `${position}%`);
        };

        // Обробка подій миші
        slider.addEventListener('mousedown', (e) => {
            isSliding = true;
            moveSlider(e.clientX); // Щоб одразу ставити лінію у місце кліку
        });
        window.addEventListener('mouseup', () => isSliding = false);
        window.addEventListener('mousemove', (e) => {
            if (isSliding) moveSlider(e.clientX);
        });

        // Обробка сенсорних екранів
        slider.addEventListener('touchstart', (e) => {
            isSliding = true;
            moveSlider(e.touches[0].clientX);
        });
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
            
            // В комерційному продукті тут має бути fetch/AJAX на сервер
            // Тут імітуємо професійне відправлення
            const submitBtn = form.querySelector("button[type='submit']");
            const btnOriginalText = submitBtn.innerText;
            submitBtn.innerText = "Відправляємо...";
            submitBtn.disabled = true;

            setTimeout(() => {
                // Імітація затримки мережі
                submitBtn.innerText = btnOriginalText;
                submitBtn.disabled = false;
                form.reset(); // очищаємо форму
                msg.classList.add("active"); // показуємо віконце

                // Ховаємо подяку через 5 секунд
                setTimeout(() => {
                    msg.classList.remove("active");
                }, 5000);

            }, 1200);
        });
    }
});