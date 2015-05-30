/*
 Plugin: jQuery Parallax
 Version 1.1.5
 Author: ADG Idea Alessandro del Gobbo (based on code of Ian Lunn)
 Twitter: @alexoverflow
 Author URL: http://www.adg-idea.com/
 Project on GitHub: https://github.com/aledelgo/jQuery-Parallax

 Dual licensed under the MIT and GPL licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 */

// USAGE:
// .parallax(xPosition, speedFactor, outerHeight) options:
//xPosition - Horizontal position of the element
//yPosition - Vertical initial position of the element (IN PIXELS!!!)
//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
/*$('#intro').parallax("50%", null 0.1);
 $('#second').parallax("50%", 30, 0.1);*/

(function ($) {
	var $window = $(window),
		windowHeight = $window.height();

	function setElementsBackgroundPosition(elements, params) {
		params.windowScrollTop = $window.scrollTop();
		params.firstTop = elements.offset().top;

		for (var i = 0; i < elements.length; i += 1) {
			setElementBackgroundPosition($(elements[i]), params);
		}
	}

	function setElementBackgroundPosition(element, params) {
		var top = element.offset().top,
			height = params.getHeight(element);

		// Check if totally above or totally below viewport
		if (top + height < params.windowScrollTop || top > params.windowScrollTop + windowHeight) {
			return;
		}

		element.css('backgroundPosition', params.xpos + ' ' + Math.round(params.ypos + (params.firstTop - params.windowScrollTop) * params.speedFactor) + 'px');
	}

	$window.bind('resize', function () {
		windowHeight = $(this).height();
	});

	$.fn.parallax = function (xpos, ypos, speedFactor, outerHeight) {
		var params = {};

		params.xpos = xpos || '50%';
		params.ypos = ypos || 0;
		params.speedFactor = speedFactor || 0.5;

		if (typeof outerHeight === 'undefined') {
			outerHeight = true;
		}

		if (outerHeight) {
			params.getHeight = function (element) {
				return element.outerHeight(true);
			};

		} else {
			params.getHeight = function (element) {
				return element.height();
			};
		}

		//get the starting position of each element to have parallax applied to it
		setElementsBackgroundPosition(this, params);

		$window.bind('scroll resize', setElementsBackgroundPosition.bind(null, this, params));
	};
})(jQuery);