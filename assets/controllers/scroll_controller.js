// import {Controller} from "@hotwired/stimulus";
// import $ from "jquery";
// import "jquery-touchswipe";
// import '../pageScroller';
//
// export default class extends Controller {
//     static targets = ["anchor"];
//
//     connect() {
//         this.isScrolling = false;
//
//         // Инициализация pageScroller
//         $(this.element).pageScroller({
//             travelTime: 1000,
//             afterTravelTimeout: 0.1,
//             travelEasing: 'swing',
//             onTrigger: () => {
//                 this.isScrolling = true;
//                 setTimeout(() => {
//                     this.isScrolling = false;
//                 }, 1000);
//             },
//         });
//
//         this.anchorTargets.forEach(anchor => {
//             $(anchor).click((e) => this.scrollToTarget(e));
//         });
//
//         window.addEventListener("wheel", (e) => this.preventScrollDuringAnimation(e), {passive: false});
//
//
//         // Отключаем прокрутку для числовых полей при фокусе
//         $('form').on('focus', 'input[type=number], input[type=text], textarea', function (e) {
//             $(this).on('wheel.disableScroll', function (e) {
//                 e.preventDefault();
//                 e.stopPropagation(); // Останавливает дальнейшее распространение события
//             });
//         });
//         // Включаем прокрутку при потере фокуса
//         $('form').on('blur', 'input[type=number], input[type=text], text', function (e) {
//             $(this).off('wheel.disableScroll');
//         });
//
//     }
//
//     scrollToTarget(event) {
//         // event.preventDefault();
//
//         const targetId = $(event.currentTarget).attr("href");
//         const $targetElement = $(targetId);
//
//         if ($targetElement.length && !this.isScrolling) {
//             const $currentElement = $(".current", $(this.element));
//             if (!$targetElement.is($currentElement)) {
//                 this.isScrolling = true;
//                 $currentElement.removeClass("current");
//                 $targetElement.addClass("current");
//
//                 $("html, body").animate({
//                     scrollTop: $targetElement.offset().top,
//                 }, 1000, "swing", () => {
//                     this.isScrolling = false;
//                 });
//             }
//         }
//     }
//
//     preventScrollDuringAnimation(event) {
//         if (this.isScrolling) {
//             event.preventDefault();
//         }
//     }
//
//
// }



//
//
//
// import { Controller } from "stimulus";
//
// export default class extends Controller {
//     static targets = ["section"];
//     static values = {
//         travelTime: { type: Number, default: 2000 },
//         afterTravelTimeout: { type: Number, default: 0},
//         travelEasing: { type: String, default: 'swing' },
//         startingPage: { type: Number, default: 0 },
//         scrollableClasses: { type: String, default: 'section' },
//     }
//
//     initialize() {
//         // Устанавливаем текущую секцию по индексу
//         this.currentSection = this.sectionTargets[this.startingPageValue] || null;
//         this.cleared = true;
//
//         if (this.currentSection) {
//             // Прокручиваем к начальной секции
//             this.scrollToSection(this.currentSection);
//         } else {
//             console.warn("Не удалось найти начальный раздел для скролла");
//         }
//
//         // Отключаем прокрутку тела
//         this.disableBodyScroll();
//     }
//
//     connect() {
//         this.setupWheelListener();
//     }
//
//     disconnect() {
//         this.removeWheelListener();
//     }
//
//     setupWheelListener() {
//         window.addEventListener("wheel", (event) => this.onWheel(event));
//     }
//
//     removeWheelListener() {
//         window.removeEventListener("wheel", (event) => this.onWheel(event));
//     }
//
//     onWheel(event) {
//         const delta = event.deltaY;
//
//         // Проверка открытого мобильного меню
//         const isMobileMenuOpen = document.querySelector('#menu__toggle')?.checked;
//         if (isMobileMenuOpen) {
//             return;
//         }
//
//         // Проверка прокрутки внутри раздела
//         const target = event.target.closest(`.${this.scrollableClassesValue}`);
//         if (target && this.canScrollInSection(target, delta)) {
//             return;
//         }
//
//         if (this.cleared) {
//             this.cleared = false;
//             let nextSection = delta > 0 ? this.currentSection.nextElementSibling : this.currentSection.previousElementSibling;
//
//             // Проверка существования следующей или предыдущей секции
//             if (nextSection) {
//                 this.triggerScrollEvent({ current: this.currentSection, next: nextSection });
//                 this.currentSection = nextSection;
//                 this.scrollToSection(this.currentSection);
//
//                 setTimeout(() => {
//                     this.onScrollEnd();
//                 }, this.travelTimeValue);
//             } else {
//                 // Если следующей секции нет, восстанавливаем состояние прокрутки
//                 this.cleared = true;
//             }
//         }
//     }
//
//     scrollToSection(section) {
//         if (section) {
//             window.scrollTo({
//                 top: section.offsetTop,
//                 behavior: "smooth"
//             });
//         }
//     }
//
//     onScrollEnd() {
//         this.cleared = true;
//     }
//
//     canScrollInSection(target, delta) {
//         const scrollTop = target.scrollTop;
//         const scrollHeight = target.scrollHeight;
//         const offsetHeight = target.offsetHeight;
//
//         if (delta > 0 && scrollTop + offsetHeight < scrollHeight) {
//             return true;
//         }
//         if (delta < 0 && scrollTop > 0) {
//             return true;
//         }
//         return false;
//     }
//
//     triggerScrollEvent(event) {
//         console.log("Triggered scroll:", event);
//     }
//
//     disableBodyScroll() {
//         document.body.style.overflow = "hidden";
//     }
// }





import { Controller } from "stimulus";

export default class extends Controller {
    static targets = ["section"];
    static values = {
        travelTime: { type: Number, default: 1000 },
        afterTravelTimeout: { type: Number, default: 0 },
        travelEasing: { type: String, default: 'swing' },
        startingPage: { type: Number, default: 0 },
        scrollableClasses: { type: String, default: 'section' },
    }

    initialize() {
        // Устанавливаем текущую секцию по индексу
        this.currentSection = this.sectionTargets[this.startingPageValue] || null;
        this.cleared = true;

        if (this.currentSection) {
            // Прокручиваем к начальной секции
            this.scrollToSection(this.currentSection);
        } else {
            console.warn("Не удалось найти начальный раздел для скролла");
        }

        // Отключаем прокрутку тела
        this.disableBodyScroll();
    }

    connect() {
        this.setupWheelListener();
    }

    disconnect() {
        this.removeWheelListener();
    }

    setupWheelListener() {
        window.addEventListener("wheel", (event) => this.onWheel(event));
    }

    removeWheelListener() {
        window.removeEventListener("wheel", (event) => this.onWheel(event));
    }

    onWheel(event) {
        const delta = event.deltaY;

        // Проверка открытого мобильного меню
        const isMobileMenuOpen = document.querySelector('#menu__toggle')?.checked;
        if (isMobileMenuOpen) {
            return;
        }

        // Проверка прокрутки внутри секции
        const target = event.target.closest(`.${this.scrollableClassesValue}`);
        if (target) {
            // Проверка, можно ли прокручивать внутри секции
            const scrollTop = target.scrollTop;
            const scrollHeight = target.scrollHeight;
            const offsetHeight = target.offsetHeight;

            if (delta > 0) {
                // Прокрутка вниз
                if (scrollTop + offsetHeight < scrollHeight) {
                    return; // Прокрутка внутри секции
                }
            } else {
                // Прокрутка вверх
                if (scrollTop > 0) {
                    return; // Прокрутка внутри секции
                }
            }
        }

        if (this.cleared) {
            this.cleared = false;

            let nextSection;
            if (delta > 0) {
                // Прокрутка вниз (к следующей секции)
                if (this.isSectionScrolledToBottom(this.currentSection)) {
                    nextSection = this.currentSection.nextElementSibling;
                }
            } else {
                // Прокрутка вверх (к предыдущей секции)
                if (this.isSectionScrolledToTop(this.currentSection)) {
                    nextSection = this.currentSection.previousElementSibling;
                }
            }

            // Проверка существования следующей или предыдущей секции
            if (nextSection) {
                this.triggerScrollEvent({ current: this.currentSection, next: nextSection });
                this.currentSection = nextSection;
                this.scrollToSection(this.currentSection);

                setTimeout(() => {
                    this.onScrollEnd();
                }, this.travelTimeValue);
            } else {
                // Если следующей или предыдущей секции нет, восстанавливаем состояние прокрутки
                this.cleared = true;
            }
        }
    }

    // Плавная прокрутка
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

    // Проверка, что секция была проскролена до конца
    isSectionScrolledToBottom(section) {
        const scrollTop = section.scrollTop;
        const scrollHeight = section.scrollHeight;
        const offsetHeight = section.offsetHeight;

        return scrollTop + offsetHeight >= scrollHeight;
    }

    // Проверка, что секция прокручена вверх до начала
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


