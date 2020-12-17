var init = require('src/appLauncher/appLauncher');
var App = require('src/appLauncher/dependancyInjector');
var TypeManager = require('src/core/TypeManager');
//var CSSManagementComponent = require('src/_buildTools/CSSManagementComponent');

(function () {
	// unique instance of appConstants will be initialized here, and used anywhere the instance is "got" (via getInstance() ) with globalContext as context
	init.launch({
		UIDPrefix : 'appName'
	});
	
	if (init.debugMode && init.debugMode === 'CSS') {
		console.warn('CSS Management API Started');
		
		var viewsObserver = new CoreTypes.debouncerObservable('viewsObserver');
		viewsObserver.subscribe(CSSManagementComponent.traversePage.bind(CSSManagementComponent));
		// viewsObserver should have
		//						a special set() method to:
		// 	=> stack the received value on itself
		// 	=> prepare a new _value get/set
		// 	=> reflect the next key in the views cache
		// 						and a special get() method to:
		// 	=> keep that previous value available to the PropertyCache
		//
		// On each call to set(), it launches a debounce(),
		// and calls the CSS Management API when the debounce sequence ends (1s ?)
		//
		// We could interrupt the debounce at any time, simply choosing a function to call
		// similar to that model : 
		// Function.prototype.debug = function(){   
		//   var fn = this;
		//   return function(){     
		//       if (window.DEBUG) { debugger; } 
		//       return fn.apply(this, arguments);     
		//   }; 
		//};
		// This would allow us to choose when the CSS is treated.
		viewsObserver.reflect(0, TypeManager.viewsRegister.cache);
		CSSManagementComponent.setStartingPoint('MP4ParserStarter', this);
	}
	
	this.AppNameStarter = require('src/router/appNameRouter');
}).call(window);

//module.exports = appName;