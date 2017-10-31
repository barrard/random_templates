
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Navigation
	*/	
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').height());
	});
	// toggle "navbar-no-bg" class
	$('.top-content .text').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	});
	
    /*
        Background slideshow
    */
    $('.top-content').backstretch("assets/img/backgrounds/1.jpg");
    $('.call-to-action-1').backstretch("assets/img/backgrounds/1.jpg");
    $('.testimonials-container').backstretch("assets/img/backgrounds/2.jpg");
    $('.call-to-action-2').backstretch("assets/img/backgrounds/2.jpg");
    $('.contact-container').backstretch("assets/img/backgrounds/2.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(){
    	$('.testimonials-container').backstretch("resize");
    });
    
    /*
        Wow
    */
    new WOW().init();
    
    /*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});
	
	/*
	    Contact form
	*/
	$('.c-form-1-box form').on('submit', function(e) {
		e.preventDefault();
	    var this_form_parent = $(this).parents('.c-form-1-box');
	    var postdata = $(this).serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	        	$('.c-form-1-box label[for="c-form-1-email"] .c-form-1-error').fadeOut('fast', function(){
	        		if(json.emailMessage != '') {
		                $(this).html('(' + json.emailMessage + ')').fadeIn('fast');
		            }
	        	});
	        	$('.c-form-1-box label[for="c-form-1-subject"] .c-form-1-error').fadeOut('fast', function(){
	        		if(json.subjectMessage != '') {
		                $(this).html('(' + json.subjectMessage + ')').fadeIn('fast');
		            }
	        	});
	        	$('.c-form-1-box label[for="c-form-1-message"] .c-form-1-error').fadeOut('fast', function(){
	        		if(json.messageMessage != '') {
		                $(this).html('(' + json.messageMessage + ')').fadeIn('fast');
		            }
	        	});
	            if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
	            	this_form_parent.find('.c-form-1-top').fadeOut('fast');
	            	this_form_parent.find('.c-form-1-bottom').fadeOut('fast', function() {
	            		this_form_parent.append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	            		$('.contact-container').backstretch("resize");
	                });
	            }
	        }
	    });
	});
	
});


jQuery(window).load(function() {
	
	/*
		Hidden images
	*/
	$(".modal-body img, .testimonial-image img").attr("style", "width: auto !important; height: auto !important;");
	
});
