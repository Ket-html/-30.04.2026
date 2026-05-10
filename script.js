document.addEventListener('DOMContentLoaded', () => {
    const fmt = (n) => String(n).padStart(2, '0');

    // =============================================
    // PORTFOLIO SLIDER (С ПЕРЕМЕШИВАНИЕМ ВТОРОЙ СТРАНИЦЫ)
    // =============================================
    const portfolioSlider = document.querySelector('.portfolio__slider');
    const sliderRow = document.querySelector('.portfolio__slider-row');
    const portfolioPrev = document.querySelector('.portfolio__arrow_prev');
    const portfolioNext = document.querySelector('.portfolio__arrow_next');

    const portfolioCurrent = document.querySelector('.portfolio-controls .current');
    const portfolioTotal = document.querySelector('.portfolio-controls .total');
    const portfolioFill = document.querySelector('.portfolio-controls .progress-fill');

    if (portfolioSlider && sliderRow) {
        let cards = Array.from(portfolioSlider.querySelectorAll('.portfolio__card'));
        const visibleAmount = 3;

        // --- ЛОГИКА ПЕРЕСТАНОВКИ ---
        // Если карточек 6, берем вторую тройку (индексы 3, 4, 5) и разворачиваем их
        if (cards.length >= 6) {
            const firstHalf = cards.slice(0, 3);
            const secondHalf = cards.slice(3, 6).reverse(); // Делаем 6, 5, 4
            const remaining = cards.slice(6);

            const newOrder = [...firstHalf, ...secondHalf, ...remaining];

            // Очищаем слайдер и вставляем карточки в новом порядке
            portfolioSlider.innerHTML = '';
            newOrder.forEach(card => portfolioSlider.appendChild(card));

            // Обновляем массив ссылок на карточки
            cards = newOrder;
        }

        const totalPages = Math.ceil(cards.length / visibleAmount);
        let currentPage = 0;

        portfolioSlider.style.display = 'flex';
        portfolioSlider.style.transition = 'none';
        sliderRow.style.overflow = 'hidden';

        function updatePortfolio() {
            const gap = parseInt(getComputedStyle(portfolioSlider).gap) || 24;
            const containerWidth = sliderRow.offsetWidth;
            const cardWidth = (containerWidth - (gap * (visibleAmount - 1))) / visibleAmount;

            cards.forEach(card => {
                card.style.minWidth = `${cardWidth}px`;
                card.style.maxWidth = `${cardWidth}px`;
                card.style.width = `${cardWidth}px`;
            });

            const offset = currentPage * (containerWidth + gap);
            portfolioSlider.style.transform = `translateX(-${offset}px)`;

            if (portfolioCurrent) portfolioCurrent.textContent = fmt(currentPage + 1);
            if (portfolioTotal) portfolioTotal.textContent = `/${fmt(totalPages)}`;
            if (portfolioFill) {
                portfolioFill.style.width = `${((currentPage + 1) / totalPages) * 100}%`;
            }
        }

        portfolioNext.addEventListener('click', () => {
            currentPage = (currentPage < totalPages - 1) ? currentPage + 1 : 0;
            updatePortfolio();
        });

        portfolioPrev.addEventListener('click', () => {
            currentPage = (currentPage > 0) ? currentPage - 1 : totalPages - 1;
            updatePortfolio();
        });

        window.addEventListener('resize', updatePortfolio);
        setTimeout(updatePortfolio, 50);
    }

    // =============================================
    // HEADER NAV LINK ACTIVE STATE
    // =============================================
    const navLinks = document.querySelectorAll('.nav__link');

    function updateNavActive() {
        const currentHash = window.location.hash || '#main';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('nav__link_active');
            } else {
                link.classList.remove('nav__link_active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(updateNavActive, 0);
        });
    });

    window.addEventListener('hashchange', updateNavActive);
    updateNavActive();

    // =============================================
    // PARTNERS SLIDER
    // =============================================
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

    const pImg = document.querySelector('.project-card__image');
    const pTitle = document.querySelector('.project-card__content h3');
    const pDesc = document.querySelector('.project-card__content p');
    const pNext = document.querySelector('.nav-btn_next');
    const pPrev = document.querySelector('.nav-btn_prev');
    const pFill = document.querySelector('.slider-footer__fill');
    const pCurr = document.querySelector('.slider-footer .current');
    const pTotal = document.querySelector('.slider-footer .total');

    if (pImg && pNext && pPrev) {
        let pIndex = 0;
        function updatePartner() {
            const s = partnerSlides[pIndex];
            pImg.src = s.src;
            if (pTitle) pTitle.textContent = s.title;
            if (pDesc) pDesc.textContent = s.desc;
            if (pCurr) pCurr.textContent = fmt(pIndex + 1);
            if (pTotal) pTotal.textContent = `/${fmt(partnerSlides.length)}`;
            if (pFill) pFill.style.width = `${((pIndex + 1) / partnerSlides.length) * 100}%`;
        }
        pNext.addEventListener('click', () => { pIndex = (pIndex + 1) % partnerSlides.length; updatePartner(); });
        pPrev.addEventListener('click', () => { pIndex = (pIndex - 1 + partnerSlides.length) % partnerSlides.length; updatePartner(); });
        updatePartner();
    }
});