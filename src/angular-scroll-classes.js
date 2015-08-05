angular.module('TT.angularScrollClasses', [])

	/**
	 * @ngdoc directive
	 * @name TT.angularScrollClasses:cssScroll
	 * @restrict A
	 * @scope
	 *
	 * @description
	 * Directive to bind to scroll event.
	 *
	 * @usage
	 * <div css-scroll></div>
	 *
	 *  @example
	 */
	.directive('cssScroll', ['$window', '$rootScope', function ($window, $rootScope) {

			'use strict';

			var myClasses = [
				{
					triggerAt: 100,
					name     : 'my-class-at-100',
					className: 'myClassAt100',
					status   : false
				},
				{
					triggerAt: 500,
					name     : 'my-class-at-500',
					className: 'myClassAt500',
					status   : false
				}
			];

			function raiseEvent(myClass, value) {
				if (myClass.status !== value) {
					$rootScope.$emit(myClass.name, value);
					myClass.status = value;
				}
			}

			function subscribe(element, onScrollEvent, classOnScroll) {
				$rootScope.$on(onScrollEvent, function (event, value) {
					if (value) {
						element.addClass(classOnScroll);
					} else {
						element.removeClass(classOnScroll);
					}
				});
			}

			return {
				restrict: 'A',
				link    : function (scope, element) {
					element.bind('scroll', function () {

						// TODO: Add delay (i.e. don't raise a event on every pixel scrolled)
						angular.forEach(myClasses, function (myClass) {
							raiseEvent(myClass, element[0].scrollTop >= myClass.triggerAt);
						});
					});

					angular.forEach(myClasses, function (myClass) {
						subscribe(element, myClass.name, myClass.className);
					});
				}
			};
		}])

	/**
	 * @ngdoc directive
	 * @name TT.angularScrollClasses:cssScrollClasses
	 * @restrict A
	 * @scope
	 *
	 * @description
	 * Directive to bind CSS style.
	 *
	 * @usage
	 * <div css-scroll>
	 *        <header id="app-header"
	 *            ng-include=" 'views/header.html' "
	 *                css-scroll-classes='[{"rex100":"rex-scroll-100"}]'>
	 *                                           |            |
	 *                                      class name     event name
	 *      </header>
	 * </div>
	 *
	 *  @example
	 */
	.directive('cssScrollClasses', ['$rootScope', function ($rootScope) {

			'use strict';

			function subscribe(element, onScrollEvent, classOnScroll) {
				$rootScope.$on(onScrollEvent, function (event, value) {
					if (value) {
						element.addClass(classOnScroll);
					} else {
						element.removeClass(classOnScroll);
					}
				});
			}

			return {
				scope: {
					cssScrollClasses: '@'
				},
				restrict: 'A',
				link : function (scope, element) {

					var classes = JSON.parse(scope.cssScrollClasses);

					for (var idx = 0; idx < classes.length; idx++) {

						var classOnScroll = Object.keys(classes[idx]),
							onScrollEvent = classes[idx][classOnScroll];

						subscribe(element, onScrollEvent, classOnScroll[0]);
					}
				}
			};
		}]);
