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

// Import the pageScroller plugin
// import '/node_modules/jquery-scrollify/jquery.scrollify';
//
// $(function() {
//     // Initialize the page scroller on the container
//     $('#container').pageScroller({
//         // Set configuration options here
//         travelTime: 1000,           // Animation speed in milliseconds
//         afterTravelTimeout: 1,       // Delay in seconds
//         travelEasing: 'swing',       // Easing function
//         anchors: ['.anchor1', '#anchor2', '.anchor3'], // Manual anchor links
//         startingPage: 1,             // Start at section 2 (index 1)
//
//         // Callback functions
//         onTrigger: function(none, targets) {
//             // Code to execute on trigger
//             console.log('Triggered section scroll');
//         },
//         onEnd: function(none, targets) {
//             // Code to execute on end
//             console.log('Reached section end');
//         }
//     });
// });

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