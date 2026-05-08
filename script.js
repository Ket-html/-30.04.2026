document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // PORTFOLIO SLIDER
    // =============================================
    const portfolioSlider = document.querySelector('.portfolio__slider');
    const portfolioPrev = document.querySelector('.portfolio__arrow_prev');
    const portfolioNext = document.querySelector('.portfolio__arrow_next');
    const portfolioCurrent = document.querySelector('.portfolio-controls .current');
    const portfolioTotal = document.querySelector('.portfolio-controls .total');
    const portfolioFill = document.querySelector('.portfolio-controls .progress-fill');

    if (portfolioSlider && portfolioPrev && portfolioNext) {
        const cards = Array.from(portfolioSlider.querySelectorAll('.portfolio__card'));
        const total = cards.length;
        let current = 0;  // индекс активной карточки (0-based)

        const fmt = (n) => String(n).padStart(2, '0');

        // Ставим начальные стили на обёртку и сам слайдер
        portfolioSlider.style.display = 'flex';
        portfolioSlider.style.transition = 'transform 0.5s ease-in-out';
        portfolioSlider.style.willChange = 'transform';
        // gap уже задан в CSS (24px), убираем overflow на родителе
        const sliderRow = document.querySelector('.portfolio__slider-row');
        if (sliderRow) sliderRow.style.overflow = 'hidden';

        function getCardWidth() {
            // Ширина одной карточки + gap
            const card = cards[0];
            const gap = parseInt(getComputedStyle(portfolioSlider).gap) || 24;
            return card.offsetWidth + gap;
        }

        function updatePortfolio() {
            const offset = current * getCardWidth();
            portfolioSlider.style.transform = `translateX(-${offset}px)`;

            if (portfolioCurrent) portfolioCurrent.textContent = fmt(current + 1);
            if (portfolioTotal) portfolioTotal.textContent = `/${fmt(total)}`;
            if (portfolioFill) portfolioFill.style.width = `${((current + 1) / total) * 100}%`;
        }

        portfolioNext.addEventListener('click', () => {
            current = current < total - 1 ? current + 1 : 0;
            updatePortfolio();
        });

        portfolioPrev.addEventListener('click', () => {
            current = current > 0 ? current - 1 : total - 1;
            updatePortfolio();
        });

        // Первичная инициализация
        updatePortfolio();
    }


    // =============================================
    // PARTNERS SLIDER
    // =============================================
    const partnerWrapper = document.querySelector('.project-card__image-wrapper');
    const partnerPrev = document.querySelector('.nav-btn_prev');
    const partnerNext = document.querySelector('.nav-btn_next');
    const partnerCurrent = document.querySelector('.slider-footer .current');
    const partnerTotal = document.querySelector('.slider-footer .total');
    const partnerFill = document.querySelector('.slider-footer__fill');
    const partnerImg = document.querySelector('.project-card__image');
    const partnerTitle = document.querySelector('.project-card__content h3');
    const partnerDesc = document.querySelector('.project-card__content p');

    // Данные слайдов партнёров — замени src на свои реальные изображения
    const partnerSlides = [
        {
            src: '47dc690fc484cd1476db8f6f3e664ac949660c4c.jpg',
            title: 'CityPoint Retail Center',
            desc: 'From sleek modern homes to large-scale commercial complexes, our projects reflect the skill, precision, and dedication we bring to every build. Each one tells a story of careful planning, expert execution, and lasting quality.'
        },
        {
            src: '3 bloc2.jpg',
            title: 'Riverside Heights',
            desc: 'Luxury residential complex with panoramic views and eco-friendly design. Built to the highest standards of modern living.'
        },
        {
            src: '3bloc3.jpg',
            title: 'Hillside Villa Renovation',
            desc: 'Full interior and exterior remodel blending classic charm with modern finishes. Every detail crafted with care.'
        }
    ];

    if (partnerWrapper && partnerPrev && partnerNext) {
        let partnerIndex = 0;
        const fmt = (n) => String(n).padStart(2, '0');

        function updatePartner() {
            const slide = partnerSlides[partnerIndex];

            // Плавное переключение через opacity
            partnerWrapper.style.opacity = '0';
            partnerWrapper.style.transition = 'opacity 0.4s ease';

            setTimeout(() => {
                if (partnerImg) partnerImg.src = slide.src;
                if (partnerImg) partnerImg.alt = slide.title;
                if (partnerTitle) partnerTitle.textContent = slide.title;
                if (partnerDesc) partnerDesc.textContent = slide.desc;

                partnerWrapper.style.opacity = '1';
            }, 400);

            const total = partnerSlides.length;
            if (partnerCurrent) partnerCurrent.textContent = fmt(partnerIndex + 1);
            if (partnerTotal) partnerTotal.textContent = `/${fmt(total)}`;
            if (partnerFill) partnerFill.style.width = `${((partnerIndex + 1) / total) * 100}%`;
        }

        partnerNext.addEventListener('click', () => {
            partnerIndex = partnerIndex < partnerSlides.length - 1 ? partnerIndex + 1 : 0;
            updatePartner();
        });

        partnerPrev.addEventListener('click', () => {
            partnerIndex = partnerIndex > 0 ? partnerIndex - 1 : partnerSlides.length - 1;
            updatePartner();
        });

        // Первичная инициализация
        updatePartner();
    }


    // =============================================
    // FAQ ACCORDION (плавное открытие)
    // =============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            // При открытии одного — закрываем остальные
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) other.removeAttribute('open');
                });
            }
        });
    });


    // =============================================
    // МОБИЛЬНОЕ МЕНЮ (на всякий случай, если CSS-чекбокс не работает)
    // =============================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        // Закрытие меню при клике на ссылку
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.checked = false;
            });
        });
    }

});