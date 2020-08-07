module.exports = function(grunt, options) {
	
	return {
		debug: {
			options: {
				module : true
			},
			src: [options.rootPath + 'jsUIFramework/src/UI/generics/_UIpackages.js'],
			after : function(gr, opt){
				grunt.config.data.UIPackageList = opt.UIpackageList;
			}
		},
		release: {
			options: {
				module : true
			},
			src: [options.rootPath + 'jsUIFramework/src/UI/generics/_UIpackages.js'],
			after : function(gr, opt){
				grunt.config.data.UIPackageList = opt.UIpackageList;
			}
		}
	}
};