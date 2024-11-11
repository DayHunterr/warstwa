import { Controller } from "stimulus";

export default class extends Controller {
    static targets = ["section"];
    static values = {
        travelTime: { type: Number, default: 1500 },
        afterTravelTimeout: { type: Number, default: 0 },
        travelEasing: { type: String, default: 'swing' },
        startingPage: { type: Number, default: 0 },
        scrollableClasses: { type: String, default: 'section' },
    }

    initialize() {
        this.currentSection = this.sectionTargets[this.startingPageValue] || null;
        this.cleared = true;

        if (this.currentSection) {
            this.scrollToSection(this.currentSection);
        } else {
            console.warn("Не удалось найти начальный раздел для скролла");
        }

        // Отключаем прокрутку тела
        this.disableBodyScroll();
    }

    connect() {
        this.setupTouchEvents();
    }

    disconnect() {
        this.removeTouchEvents();
    }

    setupTouchEvents() {
        this.touchStartY = 0;
        this.touchEndY = 0;

        this.element.addEventListener("touchstart", (event) => this.onTouchStart(event));
        this.element.addEventListener("touchend", (event) => this.onTouchEnd(event));
    }

    removeTouchEvents() {
        this.element.removeEventListener("touchstart", (event) => this.onTouchStart(event));
        this.element.removeEventListener("touchend", (event) => this.onTouchEnd(event));
    }

    onTouchStart(event) {
        this.touchStartY = event.changedTouches[0].screenY;
    }

    onTouchEnd(event) {
        this.touchEndY = event.changedTouches[0].screenY;

        const delta = this.touchStartY - this.touchEndY;

        const isMobileMenuOpen = document.querySelector('#menu__toggle')?.checked;
        if (isMobileMenuOpen) {
            return;
        }

        const target = event.target.closest(`.${this.scrollableClassesValue}`);
        if (target) {
            // Проверка, можно ли прокручивать внутри секции
            const scrollTop = target.scrollTop;
            const scrollHeight = target.scrollHeight;
            const offsetHeight = target.offsetHeight;

            if (delta > 0) {
                if (scrollTop + offsetHeight < scrollHeight) {
                    return;
                }
            } else {
                if (scrollTop > 0) {
                    return;
                }
            }
        }

        if (this.cleared) {
            this.cleared = false;

            let nextSection;
            if (delta > 0) {
                if (this.isSectionScrolledToBottom(this.currentSection)) {
                    nextSection = this.currentSection.nextElementSibling;
                }
            } else {
                if (this.isSectionScrolledToTop(this.currentSection)) {
                    nextSection = this.currentSection.previousElementSibling;
                }
            }

            if (nextSection) {
                this.triggerScrollEvent({ current: this.currentSection, next: nextSection });
                this.currentSection = nextSection;
                this.scrollToSection(this.currentSection);

                setTimeout(() => {
                    this.onScrollEnd();
                }, this.travelTimeValue);
            } else {
                this.cleared = true;
            }
        }
    }

    scrollToSection(section) {
        if (!section) return;

        const start = window.scrollY;
        const target = section.offsetTop;
        const distance = target - start;
        const duration = this.travelTimeValue;
        let startTime;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            window.scrollTo(0, start + distance * progress);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }

    isSectionScrolledToBottom(section) {
        const scrollTop = section.scrollTop;
        const scrollHeight = section.scrollHeight;
        const offsetHeight = section.offsetHeight;

        return scrollTop + offsetHeight >= scrollHeight;
    }

    isSectionScrolledToTop(section) {
        const scrollTop = section.scrollTop;
        return scrollTop <= 0;
    }

    onScrollEnd() {
        this.cleared = true;
    }

    triggerScrollEvent(event) {
        console.log("Triggered scroll:", event);
    }

    disableBodyScroll() {
        document.body.style.overflow = "hidden";
    }
}


