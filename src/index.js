var init = require('src/appLauncher/appLauncher');
var rDataset = require('src/core/ReactiveDataset');
var cSet = require('src/core/ComponentSet');

(function () {
	// unique instance of appConstants will be initialized here, and used anywhere the instance is "got" (via getInstance() ) with globalContext as context
	init.launch({
		UIDPrefix : 'appName'
	});
	this.AppNameStarter = require('src/router/appNameRouter');
}).call(window);

//module.exports = appName;