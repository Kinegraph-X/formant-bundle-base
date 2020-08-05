module.exports = function(grunt, options) {

	return {
		debug: {
			files: [
				'plugins_spip/**/*.js',
				'plugins_spip/spip_preloadJS/**/*.html',
				'plugins_spip/spip_baseAPP/**/*.html',
				'plugins_spip/_Bundles/**/*.html'
			],
			filter : function(srcPath) {
				if (srcPath.match(/debug\.js|dist\.js|jsComponents_css/))
					return false;
				return true;
			},
			options : {
				livereload : true
			},
			tasks: [
				'execute:debug',
			    'browserify:debug',
			    'exorcise:debug',
			    'copy:localRelease'
			]
		}
	}
}