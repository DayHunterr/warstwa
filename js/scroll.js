let isScrolling = false;
$(function () {
    $('#snap-container').pageScroller({
        travelTime: 1000,           // Animation speed in milliseconds
        travelEasing: 'swing',       // Easing function
        afterTravelTimeout: 0.1,
        // anchors:['.benefits','.recognition','.tradition','.persistence','.quality','.guests','.statue','.diploma','.contact'],
        onTrigger: function () {
            isScrolling = true;            // Блокируем дальнейший скролл
            setTimeout(() => {
                isScrolling = false;         // Разблокируем скролл после завершения анимации
            }, 1000);                      // Задержка на время анимации
        }


    });

    window.addEventListener('wheel', function(e) {
        if (isScrolling) {
            e.preventDefault();
        }
    }, { passive: false });
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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