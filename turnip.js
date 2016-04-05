// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

$(function() {
	var turnip = {};

	var initNextButton = function() {
		var $window = $(window);
		var windowHeight = $window.height();

		$('.js-next-tile').on('click', function() {
			var $currentTile;

			$('.c-tile').each(function(index, el) {
				var top = el.getBoundingClientRect().top;

				// Find any tiles that are currently visible
				if (top < windowHeight && top >= -windowHeight/2) {
					// Save only the first visible tile
					if (!$currentTile) {
						$currentTile = $(el);
					}
				}
			});

			if ($currentTile.next().length) {
				$('html, body').animate({
		          scrollTop: $currentTile.next().offset().top
		        }, 500);
			}
		});
	};

	var scrollHandler = function() {
		var $nextButton = $('.js-next-tile');

		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        	$nextButton.addClass('c--hidden');
    	} else {
    		$nextButton.removeClass('c--hidden');
    	}
	};

	var debouncedScrollHandler = debounce(scrollHandler, 100);

	window.onscroll = function() {
		debouncedScrollHandler();
	};

	initNextButton();

	var $scooches = $('.m-scooch');
	if ($scooches.length) {
		$scooches.scooch();
	}

	window.turnip = turnip;
});