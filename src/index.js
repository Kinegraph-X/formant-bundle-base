var init = require('src/appLauncher/appLauncher');
var rDataset = require('src/core/ReactiveDataset');
var cSet = require('src/core/ComponentSet');

(function () {
	this.factoryGlobalContext = this.factoryGlobalContext || {};
	// globalContext context object is then implicitly kown to reside in window scope
	// unique instance of appConstants will be initialized here, and used anywhere the instance is "got" (via getInstance() ) with globalContext as context
	init.launch({
		UIDPrefix : 'appName'
	});
	this.AppNameStarter = require('src/router/appNameRouter');
}).call(window);

//module.exports = appName;