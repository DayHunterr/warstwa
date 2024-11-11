$.fn.wheel = function (callback) {
    return this.each(function () {
        $(this).on('mousewheel DOMMouseScroll', function (e) {
            e.delta = null;
            if (e.originalEvent) {
                if (e.originalEvent.wheelDelta) e.delta = e.originalEvent.wheelDelta / -40;
                if (e.originalEvent.deltaY) e.delta = e.originalEvent.deltaY;
                if (e.originalEvent.detail) e.delta = e.originalEvent.detail;
            }

            if (typeof callback == 'function') {
                callback.call(this, e);
            }
        });
    });
};

(function($){
    $.fn.extend({
        pageScroller: function(options) {
            this.defaultOptions = {
                travelTime:1000,
                afterTravelTimeout:1,
                travelEasing:'swing',
                startingPage:0,
                anchors:[],
                scrollableClasses: 'section',
                onTrigger : function(none, targets) {},
                onEnd : function(none, targets) {}
            };

            var settings = $.extend({}, this.defaultOptions, options);
            // Добавляем стили для скрытия скроллбара
            const styles = `
                <style>
                    ${settings.scrollableClasses} {
                        overflow-y: auto; /* Позволяет вертикальную прокрутку */
                        -ms-overflow-style: none;  /* Internet Explorer */
                        scrollbar-width: none; /* Firefox */
                    }
                    /*
                    ${settings.scrollableClasses}::-webkit-scrollbar {
                        display: none; /* Скрыть скроллбар для WebKit-браузеров */
                    }
                    */
                </style>
            `;
            $('head').append(styles); // Добавляем стили в <head>

            return this.each(function() {
                var $this = $(this);
                var cleared = true;

                //        INIT
                $this.children().eq(settings.startingPage).addClass('current');
                $('body').css('overflow','hidden');
                $(window).scrollTop($this.children().eq(settings.startingPage).offset().top);

                $('body').scroll(function(e){
                    e.preventDefault();
                })

                $(window).on('beforeunload', function() {
                    $(window).scrollTop(0);
                });


                $('body').wheel(function (e) {

                    // Проверка на открытое мобильное меню
                    const isMobileMenuOpen = $('#menu__toggle').is(':checked');
                    if (isMobileMenuOpen) {
                        // Если меню открыто, блокируем скролл и выходим
                        return;
                    }

                    // Проверка, находится ли событие прокрутки внутри секции с прокруткой
                    if ($(e.target).closest(settings.scrollableClasses).length) {
                        const target = $(e.target).closest(settings.scrollableClasses)[0];

                        // Определяем, можно ли прокручивать внутри секции
                        const scrollTop = target.scrollTop;
                        const scrollHeight = target.scrollHeight;
                        const offsetHeight = target.offsetHeight;

                        if (e.delta > 0) {
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

                    // Если мобильное меню закрыто, запускаем стандартный скрипт скроллинга
                    if (cleared) {
                        if (e.delta > 0) {
                            if ($('.current', $this).next().length > 0) {
                                cleared = false;
                                var nxt = $('.current', $this).next();
                                var curr = $('.current', $this);
                                settings.onTrigger.call(undefined, { current: curr, next: nxt });
                                $('.current', $this).removeClass('current');
                                nxt.addClass('current');
                                $('html, body').animate({
                                    scrollTop: nxt.offset().top
                                }, settings.travelTime, settings.travelEasing);
                                setTimeout(function () {
                                    settings.onEnd.call(undefined, { current: nxt, previous: curr });
                                    setTimeout(function () {
                                        cleared = true;
                                    }, settings.afterTravelTimeout);
                                }, settings.travelTime);
                            }
                        }

                        // Прокрутка вверх
                        else {
                            if ($('.current', $this).prev().length > 0) {
                                cleared = false;
                                var prv = $('.current', $this).prev();
                                var curr = $('.current', $this);
                                settings.onTrigger.call(undefined, { current: curr, next: prv });
                                $('.current', $this).removeClass('current');
                                prv.addClass('current');
                                $('html, body').animate({
                                    scrollTop: prv.offset().top
                                }, settings.travelTime, settings.travelEasing);
                                setTimeout(function () {
                                    settings.onEnd.call(undefined, { current: prv, previous: curr });
                                    setTimeout(function () {
                                        cleared = true;
                                    }, settings.afterTravelTimeout);
                                }, settings.travelTime);
                            }
                        }
                    }
                });

//                MOBILE HANDLER
                $("body").swipe({
                    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                        // Проверка, находится ли событие свайпа внутри секции с прокруткой
                        if ($(event.target).closest(settings.scrollableClasses).length) {
                            const target = $(event.target).closest(settings.scrollableClasses)[0];

                            // Определяем, можно ли прокручивать внутри секции
                            const scrollTop = target.scrollTop;
                            const scrollHeight = target.scrollHeight;
                            const offsetHeight = target.offsetHeight;

                            if (direction === 'up') {
                                // Проверка возможности скролла вниз внутри секции
                                if (scrollTop + offsetHeight < scrollHeight) {
                                    return; // Если секция прокручивается, прерываем выполнение
                                }
                            } else if (direction === 'down') {
                                // Проверка возможности скролла вверх внутри секции
                                if (scrollTop > 0) {
                                    return; // Если секция прокручивается, прерываем выполнение
                                }
                            }
                        }

                        if(direction === 'up'){
                            if(cleared){
                                if($('.current',$this).next().length > 0){
                                    cleared = false;
                                    var nxt = $('.current',$this).next();
                                    var curr = $('.current',$this);
                                    settings.onTrigger.call(undefined,{current:curr,next:nxt});
                                    $('.current',$this).removeClass('current');
                                    nxt.addClass('current');
                                    $('html, body').animate({
                                        scrollTop: nxt.offset().top
                                    }, settings.travelTime, settings.travelEasing);
                                    setTimeout(function(){
                                        settings.onEnd.call(undefined,{current:nxt,previous:curr});
                                        setTimeout(function(){
                                            cleared = true;
                                        },settings.afterTravelTimeout);
                                    }, settings.travelTime);
                                }
                            }
                        }
                        else if(direction === 'down'){
                            if(cleared){
                                if($('.current',$this).prev().length > 0){
                                    cleared = false;
                                    var prv = $('.current',$this).prev();
                                    var curr = $('.current',$this);
                                    settings.onTrigger.call(undefined,{current:curr,next:prv});
                                    $('.current',$this).removeClass('current');
                                    prv.addClass('current');
                                    $('html, body').animate({
                                        scrollTop: prv.offset().top
                                    }, settings.travelTime, settings.travelEasing);
                                    setTimeout(function(){
                                        settings.onEnd.call(undefined,{current:prv,previous:curr});
                                        setTimeout(function(){
                                            cleared = true;
                                        },settings.afterTravelTimeout);
                                    }, settings.travelTime);
                                }
                            }
                        }
                    }
                });

//                ANCHORS HANDLER
                if(settings.anchors.length>=$this.children().length){
                    $this.children().each(function(i){
                        var $that = $(this);
                        $(settings.anchors[i]).click(function(){
                            if(cleared){
                                if(!$that.is($('.current',$this))){
                                    cleared = false;
                                    var curr = $('.current',$this);
                                    settings.onTrigger.call(undefined,{current:curr,next:$that});
                                    $('.current',$this).removeClass('current');
                                    $that.addClass('current');
                                    $('html, body').animate({
                                        scrollTop: $that.offset().top
                                    }, settings.travelTime, settings.travelEasing);
                                    setTimeout(function(){
                                        settings.onEnd.call(undefined,{current:$that,previous:curr});
                                        setTimeout(function(){
                                            cleared = true;
                                        },settings.afterTravelTimeout);
                                    }, settings.travelTime);
                                }
                            }
                        });
                    });
                }
            });
        }
    });
})(jQuery);