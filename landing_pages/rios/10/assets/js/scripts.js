
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
        Backgrounds
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
        Countdown timer
    */
    var now = new Date();
	var countTo = 25 * 24 * 60 * 60 * 1000 + now.valueOf();
    $(".timer").countdown(countTo, function(event){    	
    	$(this).find('.days').text(event.strftime('%D'));
    	$(this).find('.hours').text(event.strftime('%H'));
    	$(this).find('.minutes').text(event.strftime('%M'));
    	$(this).find('.seconds').text(event.strftime('%S'));
    });
    
    /*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});
	// modal video
	$('.launch-modal-video').on('click', function(e){
		e.preventDefault();
		var modalElement = $('#' + $(this).data('modal-id'));
		modalElement.modal();
		var iframe = modalElement.find('iframe')[0];
		modalElement.on('hide.bs.modal', function(e) {
			iframe.src = iframe.src;
		});
	});
	
	/*
	    Subscription form
	*/	
	$('.subscribe form').submit(function(e) {
		e.preventDefault();
	    var postdata = $(this).serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/subscribe.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.valid == 0) {
	                $('.success-message, .error-message').hide();
	                $('.error-message').html(json.message).fadeIn('fast', function(){
	                	$('.subscribe form').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	            			$(this).removeClass('animated shake');
	            		});
	                });
	            }
	            else {
	            	$('.success-message, .error-message, .subscribe form').hide();
	                $('.success-message').html(json.message).fadeIn('fast', function(){
	                	$('.top-content').backstretch("resize");
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
	
	/*
	    Testimonials auto-rotate 
	*/
	var tabCarousel = setInterval(function() {
	    var tabs = $('.testimonial-list .nav-tabs > li'),
	        active = tabs.filter('.active'),
	        next = active.next('li'),
	        toClick = next.length ? next.find('a') : tabs.eq(0).find('a');

	    toClick.trigger('click');
	}, 5000);
	
});
