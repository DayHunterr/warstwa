
// $(function() {
//     $('#snap-container').pageScroller({
//         // Set configuration options here
//         travelTime: 1000,           // Animation speed in milliseconds
//         afterTravelTimeout: 0,       // Delay in seconds
//         travelEasing: 'swing',       // Easing function
//
//     });
// });

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