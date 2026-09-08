document.addEventListener('DOMContentLoaded', () => {

    const subtitle = document.querySelector('.main-subtitle');
    if (subtitle) {
        const hours = new Date().getHours();
        let greeting = 'Время идеального вкуса';
        
        if (hours >= 5 && hours < 12) {
            greeting = 'Доброе утро! Время идеального кофе';
        } else if (hours >= 12 && hours < 18) {
            greeting = 'Добрый день! Время сделать перерыв';
        } else if (hours >= 18 && hours < 23) {
            greeting = 'Добрый вечер! Время уюта в Tiden';
        } else {
            greeting = 'Доброй ночи! Ждем вас утром';
        }
        
        subtitle.textContent = greeting;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.01,
        rootMargin: '0px 0px -20px 0px'
    });

    document.querySelectorAll('.kofe-div, .deserty-div, .menu-block-home, .about').forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

                // ===== Hamburger Menu =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // ===== Theme Toggle =====
    const themeCheckbox = document.getElementById('theme-toggle');

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeCheckbox) themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }

    // ===== Modal =====
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #fff;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        color: #4a3728;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    document.querySelectorAll('.kofe-div ul li, .deserty-div ul li, .menu-block-home ul li').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const divElement = item.querySelector('div');
            if (!divElement) return;

            const title = divElement.textContent.trim() || 'Товар';

            modalContent.innerHTML = `
                <h3 style="font-size: 28px; margin-bottom: 15px; font-family: sans-serif;">${title}</h3>
                <p style="color: #7f5539; margin-bottom: 20px; font-size: 16px; line-height: 1.6;">Премиальное качество и внимание к каждой детали. Идеальный выбор для вашего дня.</p>
                <span style="font-size: 22px; font-weight: bold; color: #b07d62;">Цена: 8,80 byn</span>
            `;
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'auto';
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
        }
    });
});
