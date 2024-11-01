const lines = document.querySelectorAll('.line');

function handleScroll() {
    if (window.innerWidth > 767) return;
    const sections = [
        { selector: '.benefits, .recognition', activeLines: 1 },
        { selector: '.tradition, .persistence, .qualite', activeLines: 2 },
        { selector: '.guests', activeLines: 3 },
        { selector: '.statue, .diploma', activeLines: 4 },
        { selector: '.contact', activeLines: 5 }
    ];

    let activeLines = 0;

    sections.forEach(section => {
        const elements = document.querySelectorAll(section.selector);
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                activeLines = section.activeLines;
            }
        });
    });

    lines.forEach((line, index) => {
        if (index < activeLines) {
            line.style.background = 'rgba(0, 0, 0, 0.80)';
        } else {
            line.style.background = 'rgba(0, 0, 0, 0.14)';
        }
    });
}

window.addEventListener('scroll', handleScroll);