let isScrolling = false;

$(document).ready(function () {
    $('#snap-container').pageScroller({
        travelTime: 1000,
        afterTravelTimeout: 0.1,
        travelEasing: 'swing',
        onTrigger: function () {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        },

    });

    // Обработчик для кликов по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        $(anchor).click(function (e) {
            e.preventDefault(); // Отменяем стандартное поведение ссылки

            const targetId = $(this).attr('href');
            const $targetElement = $(targetId);
            console.log($targetElement)
            if ($targetElement.length && !isScrolling) {
                const $currentElement = $('.current', $('#snap-container'));
                if (!$targetElement.is($currentElement)) {
                    isScrolling = true;
                    $currentElement.removeClass('current');
                    $targetElement.addClass('current');

                    $('html, body').animate({
                        scrollTop: $targetElement.offset().top
                    }, 1000, 'swing', function () {
                        isScrolling = false;
                    });
                }
            }
        });
    });

    window.addEventListener('wheel', function (e) {
        if (isScrolling) {
            e.preventDefault();
        }
    }, {passive: false});
});
