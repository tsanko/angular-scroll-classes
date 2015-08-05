'use strict';

describe('Module: angularScrollClasses', function () {
	var scope, $sandbox, $compile, $timeout;

	// load the controller's module
	beforeEach(module('TT.angularScrollClasses'));

	beforeEach(inject(function ($injector, $rootScope, _$compile_, _$timeout_) {
		scope = $rootScope;
		$compile = _$compile_;
		$timeout = _$timeout_;

		$sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
	}));

	afterEach(function () {
		$sandbox.remove();
		scope.$destroy();
	});

	var templates = {
		'css-scroll': {
			scope  : {},
			element: '<div css-scroll></div>'
		}
	};

	function compileDirective(template) {
		template = template ? templates[template] : templates['css-scroll'];
		angular.extend(scope, template.scope || templates['css-scroll'].scope);
		var $element = $(template.element).appendTo($sandbox);
		$element = $compile($element)(scope);
		scope.$digest();
		return $element;
	}

	it('should correctly display hello world', function () {
		var elm = compileDirective();
		expect(elm.text()).toBe('hello world');
	});

});
