const container = document.querySelector('.snap-container');
const sections = container.querySelectorAll('section');
let isScrolling = false;

container.addEventListener('wheel', (event) => {
    if (isScrolling) return;

    isScrolling = true;
    const currentScroll = container.scrollTop;
    let nextSection;

    if (event.deltaY > 0) { // Скролл вниз
        nextSection = [...sections].find(sec => sec.offsetTop > currentScroll);
    } else { // Скролл вверх
        nextSection = [...sections].reverse().find(sec => sec.offsetTop < currentScroll);
    }

    if (nextSection) {
        container.scrollTo({
            top: nextSection.offsetTop,
            behavior: 'smooth'
        });
        setTimeout(() => {
            isScrolling = false;
        }, 4000);
    } else {
        isScrolling = false;
    }
});

// Плавная прокрутка при клике на якорь
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Отменить стандартное поведение

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});