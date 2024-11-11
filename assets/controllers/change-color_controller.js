// controllers/scroll_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['line'];

    connect() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    disconnect() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        if (window.innerWidth > 767) return;

        const sections = [
            { selector: '.benefits, .recognition', activeLines: 1 },
            { selector: '.tradition, .persistence, .quality', activeLines: 2 },
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

        this.lineTargets.forEach((line, index) => {
            line.style.background = index < activeLines ? 'rgba(0, 0, 0, 0.80)' : 'rgba(0, 0, 0, 0.14)';
        });
    }
}
