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
                onTrigger : function(none, targets) {},
                onEnd : function(none, targets) {}
            };

            var settings = $.extend({}, this.defaultOptions, options);

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

            //        SCROLL DOWN
                    if(cleared){
                        if(e.delta > 0){
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
                //        SCROLL UP
                        else{
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
                });
                
//                MOBILE HANDLER
                $("body").swipe({
                    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
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