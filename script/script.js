
/****************************************
 ******Section Header******************
 ****************************************/

/********Menu**********/
$('.btn-nav').on('click', function () {
    $(this).toggleClass('btn_nav_active');
    $('header').find('nav').toggleClass('active-nav');

    if ($('header').find('nav').hasClass('active-nav')) {
        $('header').find('nav').animate({
            right: '0%'
        });

        $('body').addClass('overflow-h');

        if (window.matchMedia('(max-width: 768px)').matches) {

        }
    } else {
        $('header').find('nav').animate({
            right: '-100%'
        });

        $('body').removeClass('overflow-h');

        if (window.matchMedia('(max-width: 768px)').matches) {

        }
    }
});

/********Nav item hover**********/
if (window.matchMedia('(min-width: 768px)').matches) {
    $('nav li a').hover(function () {
        $(this).closest('li').find('img').animate({
            left: '50%',
            opacity: 1
        }, 100)
    }, function () {
        $(this).closest('li').find('img').animate({
            left: '16%',
            opacity: 0
        }, 0)
    })
} else {
    $('nav').find('.active').closest('li').find('img').css({
        opacity: '1'
    })
}


/*****Navbar Fixed***********/
const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    });
}

function fixedNavBar() {
    var posy = $(window).scrollTop();
    if (posy > $('header').offset().top) {
        $('.top-bar').addClass('fixed');
        sleep(100).then(() => {
            $('.top-bar').addClass('fly-nav');
        })

        $('.btn-nav').css({
            right: '30px'
        })

        $('.header .top-bar .d-flex').css({
            padding: '15px 15px',
            transition: '0.4s'
        })
    } else {

        sleep(150).then(() => {
            $('.top-bar').removeClass('fly-nav');
        })

        $('.btn-nav').css({
            right: '30px'
        })

        $('.header .top-bar .d-flex').css({
            padding: '30px 15px',
            transition: '0.4s'
        })

        $('.top-bar').removeClass('fixed');

    }
}

$(window).scroll(function () {
    fixedNavBar();
})

/******************************
 ******Section About***********
 ******************************/

$(function () {

    /******************************
     ******Carousel About***********
     ******************************/
    var action = false,
        clicked = false;
    var Owl = {

        init: function () {
            Owl.carousel();
        },

        carousel: function () {
            var owl;
            $(document).ready(function () {


                owl = $('.aboutCarousel').owlCarousel({
                    items: 1,
                    center: true,
                    nav: true,
                    dots: true,
                    margin: 10,
                    mouseDrag: false,
                    dotsContainer: '.test-about',
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    smartSpeed: 1000,
                    navText: ['prev', 'next'],
                    responsive: {
                        768: {
                            mouseDrag: false
                        }
                    }
                });

                $('.owl-next').on('click', function () {
                    action = 'next';

                });

                $('.owl-prev').on('click', function () {
                    action = 'prev';
                });

                var indexActiveItem = owl.trigger('to.owl.carousel', [$(this).index(), 1000]);

                var localMemory = $(indexActiveItem).find('.active').index();

                $('.aboutCarousel').on('slideChange', function (e, slideId) {
                    owl.trigger('to.owl.carousel', [slideId, 1000]);
                })

                $('.bookmarks-about').on('click', 'li', function (e) {
                    owl.trigger('to.owl.carousel', [$(this).index(), 1000]);

                    /*  if (localMemory < $('.aboutCarousel').find('.active').index()) {
                          localMemory = $('.aboutCarousel').find('.active').index();
                          if ($('.aboutCarousel').find('.active-anim-left') || $('.aboutCarousel').find('.active-anim-right')) {
                              $('.aboutCarousel').find('.active-anim-left').removeClass('active-anim-left');
                              $('.aboutCarousel').find('.active-anim-right').removeClass('active-anim-right');


                              $('.aboutCarousel').find('.active').find('.text').addClass('active-anim-left');
                              $('.aboutCarousel').find('.active').find('.img').addClass('active-anim-left');
                          }

                      } else {
                          localMemory = $('.aboutCarousel').find('.active').index();

                          if ($('.aboutCarousel').find('.active-anim-right') || $('.aboutCarousel').find('.active-anim-left')) {
                              $('.aboutCarousel').find('.active-anim-right').removeClass('active-anim-right');
                              $('.aboutCarousel').find('.active-anim-left').removeClass('active-anim-left');
                              $('.aboutCarousel').find('.active').find('.text').addClass('active-anim-right');
                              $('.aboutCarousel').find('.active').find('.img').addClass('active-anim-right');
                          }

                      }*/


                });
            });
        }
    };

    $('.first-aboutCarousel').find('.active').find('.text').addClass('anim-txt');

    $(document).ready(function () {
        Owl.init();
    });

});

$(function () {
    var interleaveOffset = 0.5;


    var swiperOptions = {
        loop: true,
        speed: 1000,
        grabCursor: false,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        pagination: {
            el: '.bookmarks-about ul',
            clickable: true,
            renderBullet: function (index, className) {

                return "<li class='" + className + "'></li>";
            },
        },
        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(" .slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            slideChange: function () {
                var swiper = this;

                $('.bookmarks-about ul li').removeClass('active');
                $('.bookmarks-about ul li').eq(swiper.realIndex).addClass('active');

                $('.aboutCarousel .owl-item').removeClass('active').removeClass('center');
                $('.aboutCarousel .owl-item').eq(swiper.realIndex).addClass('active').addClass('center');

                $('.aboutCarousel').trigger('slideChange', swiper.realIndex);
            },
            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container-about", swiperOptions);

    var names = ['обо мне', 'принципы работу', 'опыт'];
    var a = $('.bookmarks-about ul li');

    for (var i = 0; i < a.length; i++) {
        $(a[0]).addClass('active');
        $(a[0]).html(names[0]);
        $(a[1]).html(names[1]);
        $(a[2]).html(names[2]);
    }

});



/****************************************
 ******Section Team******************
 ****************************************/
$(function () {
    /******Carousel Team***********/

    var action = false,
        clicked = false;
    var Owl = {

        init: function () {
            Owl.carousel();
        },

        carousel: function () {
            var owl;
            $(document).ready(function () {

                owl = $('.teamCarousel').owlCarousel({
                    items: 1,
                    center: true,
                    nav: false,
                    dots: false,
                    loop: true,
                    mouseDrag: false,
                    margin: 30,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    smartSpeed: 1000,
                    dotsContainer: '.test-team',
                    navText: ['prev', 'next']
                });

                $('.owl-next').on('click', function () {
                    action = 'next';
                });

                $('.owl-prev').on('click', function () {
                    action = 'prev';
                });

                var indexActiveItem = owl.trigger('to.owl.carousel', [$(this).index(), 1000]);

                var localMemory = $(indexActiveItem).find('.active').index();

                $('.teamCarousel').on('slideChange', function (e, slideId) {
                    owl.trigger('to.owl.carousel', [slideId, 1000]);

                    if ($(this).closest('ul').find('.active')) {
                        $(this).closest('ul').find('.active').removeClass('active');
                        $(this).addClass('active');
                    }
                })

                $('.bookmarks-team').on('click', 'li', function (e) {
                    owl.trigger('to.owl.carousel', [$(this).index(), 1000]);

                    if ($(this).closest('ul').find('.active')) {
                        $(this).closest('ul').find('.active').removeClass('active');
                        $(this).addClass('active');
                    }
                });
            });
        }
    };

    $(document).ready(function () {
        Owl.init();
    });

});


$(function () {
    var interleaveOffset = 0.5;


    var swiperOptions2 = {
        loop: true,
        speed: 1000,
        grabCursor: false,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        pagination: {
            el: '.bookmarks-team ul',
            clickable: true,
            renderBullet: function (index, className) {

                return "<li class='" + className + "'></li>";
            },
        },
        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".team-carous .slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            slideChange: function () {
                var swiper = this;

                $('.bookmarks-team ul li').removeClass('active');
                $('.bookmarks-team ul li').eq(swiper.realIndex).addClass('active');

                $('.teamCarousel .owl-item').removeClass('active').removeClass('center');
                $('.teamCarousel .owl-item').eq(swiper.realIndex).addClass('active').addClass('center');

                $('.teamCarousel').trigger('slideChange', swiper.realIndex);
            },
            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".team-carous .slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container-team", swiperOptions2);

    var names = ['1', '2', '3', '4' , '5'];
    var a = $('.bookmarks-team ul li');

    for (var i = 0; i < a.length; i++) {
        $(a[0]).addClass('active');
        $(a[0]).html(names[0]);
        $(a[1]).html(names[1]);
        $(a[2]).html(names[2]);
        $(a[3]).html(names[3]);
        $(a[4]).html(names[4]);
    }

});



/****************************************
 ******Section Reviews******************
 ****************************************/

$(function () {
    /*****Carousel Reviews Wedding**********/
    var interleaveOffset = 0.5;
    var action = false,
        clicked = false;
    var Owl = {

        init2: function () {
            Owl.carousel();
        },

        carousel: function () {
            var owl;
            $(document).ready(function () {

                owl = $('.reviewsCarousel').owlCarousel({
                    items: 1,
                    center: true,
                    nav: true,
                    dots: true,
                    loop: false,
                    margin: 10,
                    mouseDrag: false,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    smartSpeed: 1000,
                    dotsContainer: '.test-reviews-wedding',
                    navText: ['', '']
                });

                $('.owl-next').on('click', function () {
                    action = 'next';
                });

                $('.owl-prev').on('click', function () {
                    action = 'prev';
                });
                var indexActiveItem = owl.trigger('to.owl.carousel', [$(this).index(), 1000]);

                var localMemory = $(indexActiveItem).find('.active').index();

                $('.reviewsCarousel').on('slideChange', function (e, slideId) {
                    owl.trigger('to.owl.carousel', [slideId, 1000]);


                    if (localMemory < $('.reviewsCarousel').find('.active').index()) {
                        localMemory = $('.reviewsCarousel').find('.active').index();
                        if ($('.reviewsCarousel').find('.active-anim-left') || $('.reviewsCarousel').find('.active-anim-right')) {
                            $('.reviewsCarousel').find('.active-anim-left').removeClass('active-anim-left');
                            $('.reviewsCarousel').find('.active-anim-right').removeClass('active-anim-right');

                            $('.reviewsCarousel').find('.active').find('.img').addClass('active-anim-left');
                        }

                    } else {
                        localMemory = $('.reviewsCarousel').find('.active').index();

                        if ($('.reviewsCarousel').find('.active-anim-right') || $('.reviewsCarousel').find('.active-anim-left')) {
                            $('.reviewsCarousel').find('.active-anim-right').removeClass('active-anim-right');
                            $('.reviewsCarousel').find('.active-anim-left').removeClass('active-anim-left');
                            $('.reviewsCarousel').find('.active').find('.img').addClass('active-anim-right');
                        }
                    }
                })


                $('.bookmarks-reviews-wedding').on('click', 'li', function (e) {
                    owl.trigger('to.owl.carousel', [$(this).index(), 1000]);


                    if (localMemory < $('.reviewsCarousel').find('.active').index()) {
                        localMemory = $('.reviewsCarousel').find('.active').index();
                        if ($('.reviewsCarousel').find('.active-anim-left') || $('.reviewsCarousel').find('.active-anim-right')) {
                            $('.reviewsCarousel').find('.active-anim-left').removeClass('active-anim-left');
                            $('.reviewsCarousel').find('.active-anim-right').removeClass('active-anim-right');

                            $('.reviewsCarousel').find('.active').find('.img').addClass('active-anim-left');
                        }

                    } else {
                        localMemory = $('.reviewsCarousel').find('.active').index();

                        if ($('.reviewsCarousel').find('.active-anim-right') || $('.reviewsCarousel').find('.active-anim-left')) {
                            $('.reviewsCarousel').find('.active-anim-right').removeClass('active-anim-right');
                            $('.reviewsCarousel').find('.active-anim-left').removeClass('active-anim-left');
                            $('.reviewsCarousel').find('.active').find('.img').addClass('active-anim-right');
                        }
                    }
                });

            });
        }
    };

    $(document).ready(function () {
        Owl.init2();
    });
});
$(function () {
    var interleaveOffset = 0.5;

    var swiperOptions2 = {
        loop: true,
        speed: 1000,
        grabCursor: false,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        pagination: {
            el: '.bookmarks-reviews-wedding ul',
            clickable: true,
            renderBullet: function (index, className) {

                return "<li class='" + className + "'></li>";
            },
        },
        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".reviews-carousel .second-carousel-wedding .slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            slideChange: function () {
                var swiper = this;

                $('.bookmarks-reviews-wedding ul li').removeClass('active');
                $('.bookmarks-reviews-wedding ul li').eq(swiper.realIndex).addClass('active');

                $('.reviewsCarousel .owl-item').removeClass('active').removeClass('center');
                $('.reviewsCarousel .owl-item').eq(swiper.realIndex).addClass('active').addClass('center');

                $('.reviewsCarousel').trigger('slideChange', swiper.realIndex);
            },
            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".reviews-carousel .second-carousel-wedding .slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".wedding-carousel .second-carousel-wedding", swiperOptions2);

    var names = ['1', '2', '3'];
    var a = $('.bookmarks-reviews-wedding ul li');

    for (var i = 0; i < a.length; i++) {
        $(a[0]).addClass('active');
        $(a[0]).html(names[0]);
        $(a[1]).html(names[1]);
        $(a[2]).html(names[2]);
    }


});

$(function () {
    /******Carousel Reviews Corporate*********/
    var action = false,
        clicked = false;
    var Owl = {

        init: function () {
            Owl.carousel();
        },

        carousel: function () {
            var owl;
            $(document).ready(function () {

                owl = $('.reviewsCarousel').owlCarousel({
                    items: 1,
                    center: true,
                    nav: true,
                    dots: true,
                    loop: true,
                    margin: 10,
                    mouseDrag: false,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    smartSpeed: 1000,
                    dotsContainer: '.test-reviews-corporate',
                    navText: ['prev', 'next'],
                });

                $('.owl-next').on('click', function () {
                    action = 'next';
                });

                $('.owl-prev').on('click', function () {
                    action = 'prev';
                });

                var indexActiveItem = owl.trigger('to.owl.carousel', [$(this).index(), 1000]);

                var localMemory = $(indexActiveItem).find('.active').index();

                $('.bookmarks-reviews-corporate').on('click', 'li', function (e) {
                    owl.trigger('to.owl.carousel', [$(this).index(), 1000]);

                    if ($(this).closest('ul').find('.active')) {
                        $(this).closest('ul').find('.active').removeClass('active');
                        $(this).addClass('active');
                    }

                    if (localMemory < $('.reviewsCarousel').find('.active').index()) {
                        localMemory = $('.reviewsCarousel').find('.active').index();
                        if ($('.reviewsCarousel').find('.active-anim-left') || $('.reviewsCarousel').find('.active-anim-right')) {
                            $('.reviewsCarousel').find('.active-anim-left').removeClass('active-anim-left');
                            $('.reviewsCarousel').find('.active-anim-right').removeClass('active-anim-right');

                            $('.reviewsCarousel').find('.active').find('.img').addClass('active-anim-left');
                        }

                    } else {
                        localMemory = $('.reviewsCarousel').find('.active').index();

                        if ($('.reviewsCarousel').find('.active-anim-right') || $('.reviewsCarousel').find('.active-anim-left')) {
                            $('.reviewsCarousel').find('.active-anim-right').removeClass('active-anim-right');
                            $('.reviewsCarousel').find('.active-anim-left').removeClass('active-anim-left');
                            $('.reviewsCarousel').find('.active').find('.img').addClass('active-anim-right');
                        }

                    }
                });
            });
        }
    };

    $(document).ready(function () {
        Owl.init();
    });

})
$(function () {
    var interleaveOffset2 = 0.5;

    var swiperOptions2 = {
        loop: true,
        speed: 1000,
        grabCursor: false,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        pagination: {
            el: '.bookmarks-reviews-corporate ul',
            clickable: true,
            renderBullet: function (index, className) {

                return "<li class='" + className + "'></li>";
            },
        },
        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset2;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".reviews-carousel .second-carousel-corporate .slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".reviews-carousel .second-carousel-corporate .slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".corporate-carousel .second-carousel-corporate", swiperOptions2);
    var names2 = ['1', '2', '3'];
    var a = $('.bookmarks-reviews-corporate ul li');

    for (var i = 0; i < a.length; i++) {
        $(a[0]).addClass('active');
        $(a[0]).html(names2[0]);
        $(a[1]).html(names2[1]);
        $(a[2]).html(names2[2]);
    }



});

$(function () {
    /*****Carousel Reviews Agency*********/
    var action = false,
        clicked = false;
    var Owl = {

        init2: function () {
            Owl.carousel();
        },

        carousel: function () {
            var owl;
            $(document).ready(function () {

                owl = $('.reviewsCarousel').owlCarousel({
                    items: 1,
                    center: true,
                    nav: true,
                    dots: true,
                    loop: true,
                    margin: 10,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    smartSpeed: 1000,
                    dotsContainer: '.test-reviews-agency',
                    navText: ['prev', 'next'],
                });

                $('.owl-next').on('click', function () {
                    action = 'next';
                });

                $('.owl-prev').on('click', function () {
                    action = 'prev';
                });

                var indexActiveItem = owl.trigger('to.owl.carousel', [$(this).index(), 1000]);

                var localMemory = $(indexActiveItem).find('.active').index();

                $('.bookmarks-reviews-agency').on('click', 'li', function (e) {
                    owl.trigger('to.owl.carousel', [$(this).index(), 1000]);

                    if ($(this).closest('ul').find('.active')) {
                        $(this).closest('ul').find('.active').removeClass('active');
                        $(this).addClass('active');
                    }

                    if (localMemory < $('.reviewsCarousel').find('.active').index()) {
                        localMemory = $('.reviewsCarousel').find('.active').index();
                        if ($('.reviewsCarousel').find('.active-anim-left') || $('.reviewsCarousel').find('.active-anim-right')) {
                            $('.reviewsCarousel').find('.active-anim-left').removeClass('active-anim-left');
                            $('.reviewsCarousel').find('.active-anim-right').removeClass('active-anim-right');

                            $('.reviewsCarousel').find('.active').find('.img').addClass('active-anim-left');
                        }

                    } else {
                        localMemory = $('.reviewsCarousel').find('.active').index();

                        if ($('.reviewsCarousel').find('.active-anim-right') || $('.reviewsCarousel').find('.active-anim-left')) {
                            $('.reviewsCarousel').find('.active-anim-right').removeClass('active-anim-right');
                            $('.reviewsCarousel').find('.active-anim-left').removeClass('active-anim-left');
                            $('.reviewsCarousel').find('.active').find('.img').addClass('active-anim-right');
                        }

                    }

                });
            });
        }
    };

    $(document).ready(function () {
        Owl.init2();
    });

});
$(function () {
    var interleaveOffset2 = 0.5;

    var swiperOptions2 = {
        loop: true,
        speed: 1000,
        grabCursor: false,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        pagination: {
            el: '.bookmarks-reviews-agency ul',
            clickable: true,
            renderBullet: function (index, className) {

                return "<li class='" + className + "'></li>";
            },
        },
        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset2;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".reviews-carousel .second-carousel-agency .slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".reviews-carousel .second-carousel-agency .slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".agency-carousel .second-carousel-agency", swiperOptions2);
    var names2 = ['1', '2', '3'];
    var a = $('.bookmarks-reviews-agency ul li');

    for (var i = 0; i < a.length; i++) {
        $(a[0]).addClass('active');
        $(a[0]).html(names2[0]);
        $(a[1]).html(names2[1]);
        $(a[2]).html(names2[2]);
    }



});


/**********change carousel on click*****/
let buttons = $('.reviews-links a');

$(buttons).click(function (e) {
    e.preventDefault();
    if ($(this).closest('ul').find('.active')) {
        $(this).closest('ul').find('.active').removeClass('active');
        $(this).addClass('active');
    }

    let attr = $(this).attr('data-attr');

    let box = $('.box-reviews').find('.box-carousel[data-attr=' + attr + ']');
    $('.box-reviews').find('.box-carousel').fadeOut(600);
    $(box).fadeIn(600);
    $(box).removeClass('d-none').addClass('active-carousel');
});



/****************************************
 ******Section lead diary****************
 ****************************************/
$(function () {
    /*******************************
     ******Carousel lead diary***********
     *******************************/
    if (window.matchMedia('(min-width: 1920px)').matches) {
        $('.leadDiaryCarousel').owlCarousel({
            items: 3,
            loop: false,
            center: false,
            margin: 20,
            nav: true,
            dots: false,
            URLhashListener: true,
            autoplayHoverPause: true,
            startPosition: 'URLHash',
            startPosition: 0
        });
    } else if (window.matchMedia('(min-width: 767px)').matches) {

        var r = $('.leadDiaryCarousel').owlCarousel({
            items: 2,
            loop: false,
            center: false,
            margin: 20,
            nav: true,
            dots: false,
            URLhashListener: true,
            autoplayHoverPause: true,
            startPosition: 'URLHash',
            startPosition: 0
        });


        r.on('changed.owl.carousel', function (event) {
            var items = $('.leadDiaryCarousel .item');

            var b = $(items[event.item.index]);

            if (event.relatedTarget._drag["stage"]["start"].x < event.relatedTarget._drag["stage"]["current"].x) {
                $(b.parent()[0]).css('opacity', 1)
            } else {
                $(b.parent()[0].previousElementSibling).css('opacity', 0)
            }

            if ($('.leadDiaryCarousel').find('no-filter-img') && $('.leadDiaryCarousel').find('.owl-item-active')) {
                $('.leadDiaryCarousel').find('.no-filter-img').removeClass('no-filter-img');
                $('.leadDiaryCarousel').find('.owl-item-active').removeClass('owl-item-active');
                $(b).find('.img img').addClass('no-filter-img');
                $(b).addClass('owl-item-active');
            }



/*            let nestedOffsetX = $('.owl-stage-outer')[0].getBoundingClientRect().x
            if (event.item.index > 0) {
                $('.leadDiaryCarousel').css({
                        'margin-left': (-nestedOffsetX/2)  + 'px',
                        'width': 'calc(100% + ' + (nestedOffsetX/2) + 'px)'
                    }
                )
            } else {
                $('.leadDiaryCarousel').css({
                        'margin-left': 0,
                        'width': '100%'
                    }
                )
            }*/
        })
    }

    $('.leadDiaryCarousel .owl-next span').text('');
    $('.leadDiaryCarousel .owl-prev span').text('');
});




/****************************************
 ******Section photo video***************
 ****************************************/
$(function () {
    /*********************************
     ******Carousel photo video********
     *********************************/

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
        centerMode: true,

    });
    $('.slider-nav').slick({
        slidesToShow: 1.66,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        centerMode: true,
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        dots: false,
        infinite: true
    });



    if (window.matchMedia('(max-width: 767px)').matches) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav',
            centerMode: true,

        });
        $('.slider-nav').slick({
            slidesToShow: 1.66,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            centerMode: true,
            dots: true,
            centerMode: true,
            focusOnSelect: true,
            dots: false,
            infinite: false
        });


    }

});

/*$('.bd[data-attr="photo"]').fadeOut(0);*/

$('.photo_video span').click(function () {
    var selfAttr = $(this).attr('data-attr');

    if ($(this).closest('.photo_video').find('.active')) {
        $(this).closest('.photo_video').find('.active').removeClass('active');

        $(this).addClass('active');

        /*        if ($(this).closest('.photo-video').find('.active-slider-ph-vd')) {
                    $(this).closest('.photo-video').find('.active-slider-ph-vd').removeClass('active-slider-ph-vd');
                    var box = $('.photo-video').find('.bd[data-attr=' + selfAttr + ']');

                    $(box).addClass('active-slider-ph-vd');

                    $('.slider-for2').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        fade: true,
                        asNavFor: '.slider-nav2',
                        centerMode: true,

                    });
                    $('.slider-nav2').slick({
                        slidesToShow: 1.66,
                        slidesToScroll: 1,
                        asNavFor: '.slider-for2',
                        centerMode: true,
                        dots: true,
                        centerMode: true,
                        focusOnSelect: true,
                        dots: false,
                        infinite: true
                    });


                }*/

        if ($(this).closest('.photo-video').find('.bd')) {
            $('.bd').fadeOut(600);
            var box = $('.photo-video').find('.bd[data-attr=' + selfAttr + ']');

            $(box).fadeIn(600);

            $('.slider-for2').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav2',
                centerMode: true,

            });
            $('.slider-nav2').slick({
                slidesToShow: 1.66,
                slidesToScroll: 1,
                asNavFor: '.slider-for2',
                centerMode: true,
                dots: true,
                centerMode: true,
                focusOnSelect: true,
                dots: false,
                infinite: true
            });


        }


    }




    /*if (selfAttr == 'photo') {
        $('.bd').fadeOut('slow');
        $('.bd2').fadeIn('slow');
    } else if (selfAttr == 'video') {
        $('.bd2').fadeOut('slow');
        $('.bd').fadeIn('slow');
    }*/

})
