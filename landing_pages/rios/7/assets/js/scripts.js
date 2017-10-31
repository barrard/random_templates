
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
	    Subscription form
	*/
	$('.subscribe form').submit(function(e) {
		e.preventDefault();
		$('.submit-result-message').hide().html('');
	    var postdata = $(this).serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/subscribe.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	        	if(json.firstnameMsg != '') {
	        		$('.submit-result-message').append(json.firstnameMsg).fadeIn('fast', function(){
	        			$('.subscribe form').addClass('animated shake').one(
	        					'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
	        					function(){ $(this).removeClass('animated shake'); }
	        				);
	        		});
	        	}
	        	if(json.lastnameMsg != '') {
	        		$('.submit-result-message').append(json.lastnameMsg).fadeIn('fast', function(){
	        			$('.subscribe form').addClass('animated shake').one(
	        					'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
	        					function(){ $(this).removeClass('animated shake'); }
	        				);
	        		});
	        	}
	        	if(json.emailMsg != '') {
	        		$('.submit-result-message').append(json.emailMsg).fadeIn('fast', function(){
	        			$('.subscribe form').addClass('animated shake').one(
	        					'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
	        					function(){ $(this).removeClass('animated shake'); }
	        				);
	        		});
	        	}
	        	if(json.firstnameMsg == '' && json.lastnameMsg == '' && json.emailMsg == '') {
	        		if(json.mailchimpErrorMsg != '') {
	        			$('.submit-result-message').append(json.mailchimpErrorMsg).fadeIn('fast');
	        		}
	        		else {
	        			$('.subscribe form').hide();
	        			$('.submit-result').addClass('success');
		                $('.submit-result-message').append(json.successMsg).fadeIn('fast', function(){
		                	$('.top-content').backstretch("resize");
		                });
	        		}
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
