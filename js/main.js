/*

[Main Script]

Project     :   CVIT - Multipurpose Personal vCard / CV / Resume Template
Version     :   1.2
Author      :   themelooks
Author URL  :   https://themeforest.net/user/themelooks


NOTE:
------
PLEASE DO NOT EDIT THIS CSS, YOU MAY NEED TO USE "custom-style.css" FILE FOR WRITING YOUR CUSTOM CSS.
WE MAY RELEASE FUTURE UPDATES SO IT WILL OVERWRITE THIS FILE. IT'S BETTER AND SAFER TO USE "custom-style.css".

*/

;(function ($) {
    'use strict';
  
    /* -------------------------------------------
        Common Variables
    ------------------------------------------- */
    var wn = {},
        $wn = $(window),
        $body = $('body');
    
    $(function () {
        /* -------------------------------------------
            Background image
        ------------------------------------------- */
        var $bgImg = $('[data-bg-img]');
        
        $bgImg.each(function () {
            var $t = $(this);
            
            $t.css('background-image', 'url('+ $t.data('bg-img') +')').removeAttr('data-bg-img').addClass('bg--img');
        });
        
        /* ------------------------------------------------------------------------- *
         * Background video
         * ------------------------------------------------------------------------- */
        var $bgVideo = $('[data-bg-video]');
        
        if ( $bgVideo.length ) {
            $bgVideo.tubular({videoId: $bgVideo.data('bg-video'), wrapperZIndex: 0}).addClass('bg--video');
        }
        
        /* -------------------------------------------
            Background parallax
        ------------------------------------------- */
        var $parallaxBgImg = $('[data-parallax-bg-img]');
        
        $parallaxBgImg.each(function () {
            var $t = $(this);
            
            $t.parallax({ imageSrc: $t.data('parallax-bg-img') }).addClass('bg--img');
        });
        
        /* -------------------------------------------
            Animate scroll
        ------------------------------------------- */
        var $animateScrollLink = $('.AnimateScrollLink'),
            $animateScroll = $('.AnimateScroll'),
            animateScrolling = function () {
                var targetEl = $(this).attr('href');
                
                $(targetEl).animatescroll({
                    padding: 65,
                    easing: 'easeInOutExpo',
                    scrollSpeed: 2000
                });
                
                return false;
            };
        
        $animateScrollLink.on('click', animateScrolling);
        $animateScroll.on('click', 'a', animateScrolling);
    
        /* -------------------------------------------
            Counter up
        ------------------------------------------- */
        var $counterUp = $('.CounterUp');
        
        if ( typeof $.fn.counterUp === "function" ) {
            $counterUp.counterUp({
                delay: 10,
                time: 1000
            });
        }
        
        /* -------------------------------------------
            Datepicker
        ------------------------------------------- */
        var $datePicker = $('.DatePicker');
        
        if ( $datePicker.length ) {
            $datePicker.datepicker();
        }
        
        /* -------------------------------------------
            Selectmenu
        ------------------------------------------- */
        var $selectMenu = $('.SelectMenu');
        
        if ( $selectMenu.length ) {
            $selectMenu.selectmenu();
        }
        
        /* -------------------------------------------
            Header Area
        ------------------------------------------- */
        var $headerNav = $('#headerNav');

        $headerNav.find('.nav').on('click', 'a', function () {
            $headerNav.collapse('hide');
        });
        
        /* -------------------------------------------
            Contact Form
        ------------------------------------------- */
        var $contactForm = $('.contact--form form'),
            $contactFormStatus = $('.contact-form-status');
        
        if ( $contactForm.length ) {
            $contactForm.validate({
                rules: {
                    contactName: "required",
                    contactEmail: {
                        required: true,
                        email: true
                    },
                    contactSubject: "required",
                    contactMessage: "required"
                },
                messages: {
                    contactName: "Please enter your firstname",
                    contactEmail: "Please enter a valid email address",
                    contactSubject: "Please enter your phone number",
                    contactMessage: "Plase type your message"
                },
                submitHandler: function () {
                    var $curForm = $( this.currentForm );
                    
                    $curForm.ajaxSubmit({
                        success: function (res) {
                            $contactFormStatus.show().html( res ).delay(3000).fadeOut('slow');
                        }
                    });
                }
            });
        }
    
        /* -------------------------------------------
            Popup Contact Form
        ------------------------------------------- */
        var $popupContactForm = $('#popupContactForm'),
            $hireMeModal = $('#hireMeModal');
        
        if ( $popupContactForm.length ) {
            $popupContactForm.validate({
                rules: {
                    name: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    project_title: "required",
                    category: "required",
                    budget: "required"
                },
                messages: {
                    name: "Please enter your firstname",
                    email: "Please enter a valid email address",
                    project_title: "Please define your project title",
                    category: "Please type your case category",
                    budget: "Please enter your budget"
                },
                submitHandler: function () {
                    $popupContactForm.ajaxSubmit({
                        success: function () {
                            $hireMeModal.modal('toggle');
                            $popupContactForm.resetForm();
                        }
                    });
                }
            });
            
            var $pCFfileUpload = $popupContactForm.find('#fileUpload'),
                $pCFattachStatus = $popupContactForm.find('.attachment-status span');
            
            $pCFfileUpload.on('change', function () {
                var $t = $(this),
                    value = $t.val().split('\\');
                
                value = value[value.length - 1];
                
                if ( value.length ) {
                    $pCFattachStatus.text( value );
                }
            });
        }
        
        /* -------------------------------------------
            Subscribe form
        ------------------------------------------- */
        var $subscribeForm = $('.subscribe--form form');
        
        if ( $subscribeForm.length ) {
            $subscribeForm.validate({
                rules: {
                    EMAIL: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    EMAIL: "Please enter a valid email address"
                }
            });
        }
    
        /* -------------------------------------------
            Banner Slider
        ------------------------------------------- */
        var $bannerSlider = $('.BannerSlider');
        
        if ( $bannerSlider.length ) {
            $bannerSlider.owlCarousel({
                slideSpeed: 500,
                paginationSpeed: 800,
                singleItem: true,
                dots: true,
                autoPlay: true
            });
        }
        
        /* -------------------------------------------
            Feedback FAQ Accordion
        ------------------------------------------- */
        var $feedbackFAQ = $('.feedback--faq');
        
        $feedbackFAQ.on('click', 'a[data-toggle]', function () {
            if ( $(this).parent('.panel-heading').siblings('.panel-collapse').hasClass('in') ) {
                return false;
            }
        });
    
        /* -------------------------------------------
            Feedback Slider
        ------------------------------------------- */
        var $feedbackSlider = $('.FeedbackSlider'),
            feedbackSliderImg = function () {
                var i, target, src;
                
                for ( i = 0; i < this.$userItems.length; i++ ) {
                    src = this.$userItems[i];
                    src = $(src).data('client-img');
                    target = this.paginationWrapper.children('.owl-page').eq(i).children('span');
                    
                    target.html('<img src="'+ src +'">');
                }
                
                // Recalculate parallax dimensions
                $wn.trigger('resize.px.parallax');
            };

        if ( $feedbackSlider.length ) {
            $feedbackSlider.owlCarousel({
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: true,
                dots: true,
                afterInit: feedbackSliderImg,
                afterUpdate: feedbackSliderImg
            });
        }
        
        /* -------------------------------------------
            Brands slider
        ------------------------------------------- */
        var $brandsSlider = $('.BrandsSlider');
        
        if ( $brandsSlider.length ) {
            $brandsSlider.owlCarousel({
                items: 5,
                autoPlay: true,
                afterUpdate: function () {
                    // Recalculate parallax dimensions
                    $wn.trigger('resize.px.parallax');
                }
            });
        }
        
        /* -------------------------------------------
            Blog quick nav
        ------------------------------------------- */
        var $blogQuickNav = $('.blog--quick-nav');
        
        $blogQuickNav.on('click', '.toggle--btn', function () {
            $(this).siblings('.posts-filter-menu').toggle('slow');
        });
        
        /* -------------------------------------------
            Map
        ------------------------------------------- */
        var $map = $('#map'), map, hasTouch;
            
        hasTouch = ("ontouchend" in document);
        
        if ( $map.length && typeof GMaps !== 'undefined' ) {
            map = new GMaps({
                el: '#map',
                lat: $map.data('latitude'),
                lng: $map.data('longitude'),
                zoom: $map.data('zoom'),
                scrollwheel: false,
                draggable: !hasTouch
            });
            
            map.addMarker({
                lat: $map.data('latitude'),
                lng: $map.data('longitude')
            });
            
            map.addStyle({
                styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
                mapTypeId: "map_style"
            });
            
            map.setStyle("map_style");
        }
    });
    
    /* -------------------------------------------
        Cache window scrolltop postition
    ------------------------------------------- */
    var cacheScrollTop = function () {
        wn.scrollTop = $wn.scrollTop();
    };
    
    /* -------------------------------------------
        Set scroll status to body
    ------------------------------------------- */
    var isBodyScrolled = function () {
        if ( wn.scrollTop > 1 ) {
            $body.addClass('scrolled');
        } else {
            $body.removeClass('scrolled');
        }
    };
    
    /* -------------------------------------------
        Gallery Filtering
    ------------------------------------------- */
    var galleryFiltering = function () {
        var $galleryItems = $('.gallery-items'),
            galleryItem = '.gallery-item',
            $galleryFilter = $('.gallery-filter-menu');
        
        if ( $galleryItems.length ) {
            $galleryItems.isotope({
                animationEngine: 'best-available',
                itemSelector: galleryItem
            });
            
            $galleryFilter.on('click', 'a', function () {
                var $t = $(this),
                    f = $t.attr('href'),
                    s = (f !== '*') ? '[data-cat~="'+ f +'"]' : f;
                
                $galleryItems.isotope({
                    filter: s
                });
                
                $t.parent('li').addClass('active').siblings().removeClass('active');
                
                return false;
            });
            
            $galleryItems.isotope('on', 'arrangeComplete', function () {
                // Recalculate parallax dimensions
                $wn.trigger('resize.px.parallax');
            });
        }
    };
    
    /* -------------------------------------------
        Posts Filtering
    ------------------------------------------- */
    var postsFiltering = function () {
            var $postItems = $('.post-items'),
                postItem = '.post-item',
                $postFilter = $('.posts-filter-menu');
            
            if ( $postItems.length ) {
                $postItems.isotope({
                    masonry: {
                      columnWidth: 0
                    },
                    itemSelector: postItem
                });
                
                $postFilter.on('click', 'a', function () {
                    var $t = $(this),
                        f = $t.attr('href'),
                        s = (f !== '*') ? '[data-cat~="'+ f +'"]' : f;
                    
                    $postItems.isotope({
                        filter: s
                    });
                    
                    return false;
                });
                
                $postFilter.children('ul').niceScroll({
                    scrollspeed: 100,
                    touchbehavior: true,
                    cursoropacitymax: 0
                });
                
                $postItems.isotope('on', 'arrangeComplete', function () {
                    // Recalculate parallax dimensions
                    $wn.trigger('resize.px.parallax');
                });
            }
        },
        postsResizeFilter = function () {
            setTimeout(function () {
                postsFiltering();
            }, 800);
        };
    
    /* -------------------------------------------
        About progress bar
    ------------------------------------------- */
    var aboutProgressBars = function () {
        var $aboutProgressItems = $('.about--progress-items');
        
        $aboutProgressItems.find(".progress-bar").each(function () {
            var $t = $(this);
            
            $t.css('width', 0);
            
            $t.waypoint(function () {
                $t.css('width', $t.data('progress') + '%');
            }, {
                triggerOnce: true,
                offset: 'bottom-in-view'
            });
        });
    };
    
    /* -------------------------------------------
        Hide preloader
    ------------------------------------------- */
    var hidePreloader = function () {
        $('#preloader').fadeOut('slow');
    };
    
    /* -------------------------------------------
        Function Calls
    ------------------------------------------- */
    $wn
        .on('load scroll', cacheScrollTop)
        .on('load scroll', isBodyScrolled)
        .on('load', galleryFiltering)
        .on('load', postsFiltering)
        .on('resize', postsResizeFilter)
        .on('load resize', aboutProgressBars)
        .on('load', hidePreloader);

})(jQuery);
