    'use strict';
    jQuery('#sidebar').theiaStickySidebar({
        additionalMarginTop: 80
    });
	$('.carousel').owlCarousel({
    loop:true,
    autoplay:true,
    smartSpeed:300,
	nav:false,
	margin:10,
	responsiveClass:true,
    responsive:{
		0:{
            items:1
        },
        600:{
            items:2
        },
		 1200:{
            items:3
        }
    }
    });
    $('.carousel_2').owlCarousel({
    items:1,
    loop:true,
    autoplay:false,
    smartSpeed:300,
	responsiveClass:true,
    responsive:{
        320:{
            items:2,
			margin:10,
        },
		 1000:{
            items:6,
			margin:10,
			nav:false
        }
    }
    });// JavaScript Document

    $('.carousel_3').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        smartSpeed: 300,
        responsiveClass: true,
        nav: false,
        responsive: {
            320: {
                items: 2,
                margin: 10,
            },
            1000: {
                items: 6,
                margin: 10,
//                nav: false
            }
        }
    });// JavaScript Document

