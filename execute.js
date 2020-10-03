module.exports = function(grunt, options) {
	
	return {
		debug: {
			options: {
				module : true
			},
			src: [options.rootPath + 'jsUIFramework/src/UI/_build_helpers/_UIpackages.js'],
			after : function(gr, opt){
				grunt.config.data.UIPackageList = opt.UIpackageList;
				grunt.config.data.UIvalidatorsList = opt.UIvalidatorsList;
			}
		},
		release: {
			options: {
				module : true
			},
			src: [options.rootPath + 'jsUIFramework/src/UI/_build_helpers/_UIpackages.js'],
			after : function(gr, opt){
				grunt.config.data.UIPackageList = opt.UIpackageList;
				grunt.config.data.UIvalidatorsList = opt.UIvalidatorsList;
			}
		}
	}
};