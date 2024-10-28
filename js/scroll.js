const sections = document.querySelectorAll('.snap-container section');
let isScrolling = false;

document.addEventListener('wheel', (event) => {
    if (isScrolling) return;

    isScrolling = true;
    const currentScroll = window.scrollY;
    let nextSection;

    if (event.deltaY > 0) { // Скролл вниз
        nextSection = [...sections].find(sec => sec.offsetTop > currentScroll);
    } else { // Скролл вверх
        nextSection = [...sections].reverse().find(sec => sec.offsetTop < currentScroll);
    }

    if (nextSection) {
        smoothScrollTo(nextSection.offsetTop, 1000); // Продолжительность анимации
    } else {
        isScrolling = false;
    }
});

// Функция для плавного скролла
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);

        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
        else isScrolling = false;
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
