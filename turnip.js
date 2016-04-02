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

	initNextButton();

	window.turnip = turnip;
});