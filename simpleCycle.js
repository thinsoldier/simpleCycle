/**
* 2013-04-29 
* jquery based super simple fading slideshow based on something similar I made in prototypeJS long ago.
* Use: $(window).load( function(){ slider('#slideshow', 4000, 600) } );
* If your slides are text rather than images use $(document).ready();
*/
function simpleCycle( parentSelector, show, transition  ) 
{
	var container = $( parentSelector );
	var showTime = show; // amount of time showing image between transitions
	var transitionTime = transition; // how long should transitions take
	var slides = container.children();
	
	slides.addClass('slide');
	
	slides.first().addClass('currentSlide');
	slides.first().next().addClass('nextSlide');
	//slides.first().fadeOut( transitionTime, NextSlide );
	timeoutID = window.setTimeout(function() { slides.first().fadeOut( transitionTime, NextSlide ); }, showTime);


	// * Callback after completion of fadeOut
	// * No args passed but `this` is the animated element.
	function NextSlide() 
	{
		var prev = $(this);
			// previous slide is no longer current
			prev.removeClass('currentSlide');
			prev.removeClass('nextSlide');

		var current = prev.next();
		if( current.length == 0 ){ current = slides.first(); }
			// current slide is current and no longer next
			current.addClass('currentSlide');
			current.removeClass('nextSlide');

		// next slide
		var next = current.next();
		if( next.length == 0 ){ next = slides.first(); }

		next.show();
		next.addClass('nextSlide');
		
		timeoutID = window.setTimeout(function() { current.fadeOut( transitionTime, NextSlide ); }, showTime);
	}
}