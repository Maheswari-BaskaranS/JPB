"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import AOS from 'aos';
var $ = jQuery;


function updateWrapper() {
    var windowHeight = $(window).height();
    var footerHeight = $(".footer-wrapper").outerHeight();
    var headerHeight = $("#pageHeaderWrapper").outerHeight();
    var takeHeight = $(".takeHeight").outerHeight();
    $("#wrapper").css({marginBottom:-footerHeight});
	$('.pushContainer').css({height:footerHeight});
    $('.giveHeight').css({paddingBottom:takeHeight});
	//$('.main-container').css({marginTop: headerHeight - 1});
    //$('.home-banner-img').css({paddingBottom: windowHeight - headerHeight});
	if ($(window).width() > 1920) {
           $('.thankyou-img').css({paddingBottom: windowHeight - headerHeight - footerHeight});
    }
}

$(window).load(function() {
    setTimeout(function(){
        updateWrapper();    
    },500);
});
// $(document).ready(function () {
	$('.nav-container .nav').meanmenu({
		meanScreenWidth:"1199.98"	
	});
// });
$(document).ready(function () {
	updateContainer();
	$(window).resize(function() {
		updateContainer();
	});
});
function updateContainer() {
	$('.inner-menu').next().remove('a.mean-expand');
}
window.addEventListener("load", function(){
	$('body, #wrapper, .footer-wrapper').css({opacity:1});
    setTimeout(function(){
		AOS.init({
			//easing: 'ease-in-out-sine',
            duration: 1000,
            once: true,
            disable: function() {
                var maxWidth = 992;
                return window.innerWidth < maxWidth;
            }
		});
	},10);
});
//Match title height
function MatchHeight() {

	$('.equalheight1').matchHeight();
	$('.equalheight2').matchHeight();
	$('.equalheight3').matchHeight();
	$('.equalheight4').matchHeight();
	$('.equalheight5').matchHeight();
     $('.whyj-box').matchHeight();
    $('.product-cat').matchHeight();
    $('.product-box-title').matchHeight();
    $('.product-box-info').matchHeight();
    $('.price-holder').matchHeight();
    $('.home-services-photo').matchHeight();
    $('.services-box').matchHeight();
    $('.services-icon').matchHeight();
    $('.articles-box-title').matchHeight();
    $('.list-box').matchHeight();
    $('.it-box').matchHeight();
    $('.collabrate-box-title').matchHeight();
   
    $('.articles-box-info p').matchHeight();
    $('.catalogue-box .lst-bottom-info').matchHeight();
    $('.dashboard-right-wrap .nav-tabs li').matchHeight();
    
    
    
}
jQuery('img').removeAttr('width').removeAttr('height');
$(document).ready(function() {
$("#pageHeader").sticky({topSpacing:0});
$('.meanmenu-reveal').on('click', function(){$(".mean-nav").toggleClass('active');$("body").toggleClass("body-noscroll");});
$('[data-toggle="tooltip"]').tooltip({placement : 'auto'});
$('a[data-toggle="tab"]').on('shown.bs.tab', function(){MatchHeight();}); 
$('.tab-content,.accordion').on('hidden.bs.collapse', function(){MatchHeight();})
$('.modal').on('shown.bs.modal', function(){$('.slick-slider').slick('setPosition');})

//fancybox
$('[data-fancybox]').fancybox({
  infobar: true,
  transitionEffect: "slide", //"fade' "slide' "circular' "tube' "zoom-in-out' "rotate'
  buttons: [
    "zoom",
    //"share",
    "slideShow",
    //"fullScreen",
    //"download",
    "thumbs",   
    "close"
  ],
});
//fancybox END
$('.form-group select, .NiceSelect select').niceSelect();
//Home Banner Slider
var sliderInit = $('.homeBannerSlider');
    var $status = $('.pagingInfo');
    sliderInit.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        //$status.text(i + '/' + slick.slideCount);
        $('#current').text('0'+i);
        $('#total').text('0' + slick.slideCount);
    });
    sliderInit.slick({
        //fade: true,
        dots: true,
        speed: 1500,
        arrows: false,
        autoplay: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
		/*adaptiveHeight: true,*/
        pauseOnHover: false,
        autoplaySpeed: 30000,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><img src="images/home-prvs.png"></button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button"><img src="images/home-next.png"></button>',
    });

if ($(window).width() > 767.98) {
    $('.homeBannerSlider').slickAnimation();
}
//Home Banner Slider END
//single-slider
$('.single-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    setPosition: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    slide: 'div',
    arrows: true,
    infinite: true,
	//appendDots: ".custom-dots",
    appendArrows: $('.custom-arrows'),
    focusOnSelect: false,
    adaptiveHeight: true,
    centerMode: false,
     prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-arrow-left"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-arrow-right"></i></button>',
});
//slider-2col
$('.slider-2col').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    setPosition: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    slide: 'div',
    arrows: true,
    infinite: true,
	//appendDots: ".custom-dots",
    //appendArrows: $('.custom-arrows'),
    focusOnSelect: true,
    centerMode: false,
     prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
        {
            breakpoint: 1148,
            settings: {
                slidesToShow: 1,
            }
        },
    ]
});
//slider-3col
$('.slider-3col').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    setPosition: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    slide: 'div',
    arrows: true,
    infinite: true,
    //appendDots: ".custom-dots",
    //appendArrows: $('.custom-arrows'),
    focusOnSelect: true,
    centerMode: false,
    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 667,
            settings: {
                slidesToShow: 1,
            }
        },
    ]
});
//slider-4col
$('.slider-4col').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    setPosition: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    slide: 'div',
    arrows: true,
    infinite: true,
	//appendDots: ".custom-dots",
    //appendArrows: $('.custom-arrows'),
    focusOnSelect: true,
    centerMode: false,
     prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 980,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
            }
        },
    ]
});
//slider-5col
$('.slider-5col').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    setPosition: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    slide: 'div',
    arrows: true,
    infinite: true,
	//appendDots: ".custom-dots",
    //appendArrows: $('.custom-arrows'),
    focusOnSelect: true,
    centerMode: false,
     prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 736,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        },
    ]
});
//slider-6col
$('.slider-6col').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    setPosition: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    slide: 'div',
    arrows: true,
    infinite: true,
	//appendDots: ".custom-dots",
    //appendArrows: $('.custom-arrows'),
    focusOnSelect: true,
    centerMode: false,
     prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
        {
            breakpoint: 1148,
            settings: {
                slidesToShow: 5,
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 667,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 568,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 414,
            settings: {
                slidesToShow: 1,
            }
        },
    ]
});

//home-Testimonio-slider
$('.testimonial-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    setPosition: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    slide: 'div',
    arrows: true,
    infinite: true,
    //appendDots: ".custom-dots",
    // appendArrows: $('.custom-arrows'),
    focusOnSelect: false,
    adaptiveHeight: true,
    centerMode: false,
     prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-arrow-left"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-arrow-right"></i></button>',
});


//Gallery Slider
$('.gallery-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1500,
    arrows: true,
    dots: false,
    infinite: true,
    asNavFor: '.gallery-nav',
     prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-chevron-right"></i></button>',
});
$('.gallery-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.gallery-main',
    dots: false,
    speed: 1500,
    centerMode: false,
    infinite: true,
    focusOnSelect: true,
    arrows: true,
   
    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-caret-left"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-caret-right"></i></button>',
    responsive: [
        {
            breakpoint: 980,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
            }
        },
    ]
});
//Gallery Slider END
/*--tab + accordion + slick slider + matchheight--*/
$('a[data-toggle="tab"]').on('shown.bs.tab', function() {
        setTimeout(function(){
            MatchHeight();
            $('.slick-slider').slick('setPosition');
        },100);
        $('.slick-slider').slick('setPosition');
    });  
     $('.accordion').on('shown.bs.collapse', function () {
        setTimeout(function(){
            MatchHeight();
            $('.slick-slider').slick('setPosition');
        },100);
        $('.slick-slider').slick('setPosition');
    });   
    $('.card').on('shown.bs.collapse', function () {
        setTimeout(function(){
            MatchHeight();
            $('.slick-slider').slick('setPosition');
        },100);
        $('.slick-slider').slick('setPosition');
    });
    /*-tab + accordion + slick slider + matchheight-  END*/
//Sscroll
jQuery('a[href^="#"].sscroll').click(function(e) {
        var pageHeaderHeight = $(".header").outerHeight();
        jQuery('html,body').animate({scrollTop: jQuery(this.hash).offset().top-pageHeaderHeight+1}, 1000);
        return false;
        //e.preventDefault();
});
//Sscroll END
// Form-Floating-Lables
 $('.floating-label .form-control').focus(function() {
        $(this).parent().addClass('focus');
        $(this).parent().parent().addClass('focus');
    });
    $('.floating-label .form-control').focusout(function() {
        $(this).parent().removeClass('focus');
        $(this).parent().parent().removeClass('focus');
    });
    $('.floating-label .form-control').blur(function() {
        let tmpval = $(this).val();
        if (tmpval == '') {
            $(this).parent().addClass('empty');
            $(this).parent().removeClass('not-empty');
            $(this).parent().parent().addClass('empty');
            $(this).parent().parent().removeClass('not-empty');
        } else {
            $(this).parent().addClass('not-empty');
            $(this).parent().removeClass('empty');
            $(this).parent().parent().addClass('not-empty');
            $(this).parent().parent().removeClass('empty');
        }
    });
    var inputs = $(".floating-label .form-control");
    for (var i = 0; i < inputs.length; i++) {
        if ($(inputs[i]).val() == "") {

            $(inputs[i]).parent().addClass('empty');
            $(inputs[i]).parent().removeClass('not-empty');
             $(inputs[i]).parent().parent().addClass('empty');
            $(inputs[i]).parent().parent().removeClass('not-empty');
        } else {
            $(inputs[i]).parent().addClass('not-empty');
            $(inputs[i]).parent().removeClass('empty');
            $(inputs[i]).parent().parent().addClass('not-empty');
            $(inputs[i]).parent().parent().removeClass('empty');
        }
    }
// Form-Floating-Lables END
// Load-more
$(".loadmore-list").loadMore({
        selector: '.loadmore-item',
        loadBtn: '.loadMoreBtn',
        limit: 6,
        load: 3,
        animate: false,
        //animateIn: 'fadeInUp',
    });
$(".product-list").loadMore({
        selector: '.loadmore-item',
        loadBtn: '.loadMoreBtn',
        limit: 9,
        load: 3,
        animate: false,
        //animateIn: 'fadeInUp',
    });
$(".card-list").loadMore({
        selector: '.loadmore-item',
        loadBtn: '.loadMoreBtn',
        limit: 5,
        load: 3,
        animate: false,
        //animateIn: 'fadeInUp',
    });
$(".job-list").loadMore({
        selector: '.loadmore-item',
        loadBtn: '.loadMoreBtn',
        limit: 6,
        load: 2,
        animate: false,
        //animateIn: 'fadeInUp',
    });
/*--Custom-checkbox--*/
$('.checkbox label input').change(function(){
    if($(this).is(':checked')) {
        $(this).parent('label').addClass('label-selected');
    } else {
        $(this).parent('label').removeClass('label-selected');
    }
});
/*--Custom-checkbox END--*/
	MatchHeight();
    
	jQuery().UItoTop({ easingType: 'easeOutQuart' });

    $(".fileinput").fileinput({
        browseIcon: "",
        browseClass: "custom-button btn-upload",
        browseLabel: "UPLOAD",
        showPreview: false,
        showRemove: false,
        removeClass: "button",
        showCancel: false,
        showUpload: false,
        initialCaption: "No File Chosen"
});
//Accordion Nav
jQuery('.AccordionFilterNav').navAccordion({
    expandButtonText: '<i class="fas fa-plus"></i>',  //Text inside of buttons can be HTML
    collapseButtonText: '<i class="fas fa-minus"></i>',
    }, 
    function(){
    console.log('Callback')
});
//Accordion Nav
jQuery('.sideNav').navAccordion({
    expandButtonText: '<i class="fas fa-chevron-down"></i>',  //Text inside of buttons can be HTML
    collapseButtonText: '<i class="fas fa-chevron-up"></i>',
    //buttonWidth: '45',  //Width of accordion expand/collapse button as a percentage or pixels
    buttonPosition: 'right',  //Position of button - 'right' is default - you can also choose 'left'
    }, 
    function(){console.log('Callback')});
 $(".nav-1 li").find("ul").prev().addClass("hasSub");
    $(".nav-1 li").find("ul").prev().after("<em class='subarrow'></em>");
    $('.nav-1 .subarrow').each(function() {
        $(this).on("click", function() {
            $(this).next().toggleClass('opened');
            $(this).toggleClass('opened');
        });
    });
    $('.btn-control-notext').each(function() {
        var currentid = $(this).attr('href');
        $(this).click(function(e) {
            e.preventDefault();
            $(this).toggleClass('open');
            $(currentid).toggle().toggleClass('opensub');
        });
    });
    $('.btn-control-inbox').each(function() {
        var currentid = $(this).attr('href');
        $(this).click(function(e) {
            e.preventDefault();
            $(this).parent().parent().toggleClass('open');
            $(currentid).toggleClass('opensub');
        });
    });


});

//(document).ready function-END
//Sscroll
(function($, window) {
	var adjustAnchor= function() {
		var $anchor = $(':target');
		//var pageHeaderHeight = 0;
		//var pageHeaderHeight = $("#mainNav").height();
		if ($anchor.length > 0) {
			$('html, body').stop().animate({scrollTop: $anchor.offset().top}, 1000);
		}
	};
	$(window).on('hashchange load', function() {
		adjustAnchor();
	});
})(jQuery, window);
//Sscroll END
$(function () {$('.datepicker').datetimepicker({format: 'DD/MM/YYYY'});});
$(function () {$('.inline-datepicker').datetimepicker({format: 'DD/MM/YYYY',inline: true,});});
$(function () {$('.timepicker').datetimepicker({format: 'LT',stepping: 15,});});

// Below script is for auto zoom fix for iphone Fix...
const addMaximumScaleToMetaViewport = () => {
  const el = document.querySelector('meta[name=viewport]');

  if (el !== null) {
    let content = el.getAttribute('content');
    let re = /maximum\-scale=[0-9\.]+/g;

    if (re.test(content)) {
        content = content.replace(re, 'maximum-scale=1.0');
    } else {
        content = [content, 'maximum-scale=1.0'].join(', ')
    }

    el.setAttribute('content', content);
  }
};

const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
const checkIsIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (checkIsIOS()) {
  disableIosTextFieldZoom();
}
//iphone Fix END

/*------- Slider Filters-------*/
$(document).on("click", ".slider-filter-options li a", function() {
    $(".slider-filter-options li a").removeClass("active");
    $(this).addClass("active");
    var cat = $(this).attr("data-category");
    if (cat !== "all") {
        $(".featured-slider").slick("slickUnfilter");
        $(".featured-slider .featured-slide").each(function() {
            $(this).removeClass("slide-shown");
        });
        $(".featured-slider .featured-slide[data-match=" + cat + "]").addClass("slide-shown");
        $(".featured-slider").slick("slickFilter", ".slide-shown");
    } else {
        $(".featured-slider .featured-slide").each(function() {
            $(this).removeClass("slide-shown");
        });
        $(".featured-slider").slick("slickUnfilter");
    }
});

// $(window).load(function(){        
//    $('#myModal').modal('show');
//     }); 



// (function($){
//   $(document).on("ready",function(){
//     $(".Scrollcontent").mCustomScrollbar({
//       axis:"x",
//       theme:"dark-3"
//     });
//   });
// })(jQuery);