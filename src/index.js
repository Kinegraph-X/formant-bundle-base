var init = require('src/appLauncher/appLauncher');

(function () {
	this.factoryGlobalContext = this.factoryGlobalContext || {};
	// globalContext context object is then implicitly kown to reside in window scope
	// unique instance of appConstants will be initialized here, and used anywhere the instance is "got" (via getInstance() ) with globalContext as context
	init(factoryGlobalContext).getInstance().launch({
		UIDPrefix : 'appName'
	});
	this.AppName = require('src/router/appNameRouter');
}).call(window);

//module.exports = appName;