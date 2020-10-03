module.exports = function(grunt, options) {

	return {
		debug: {
			files: [
				'plugins_spip/**/*.js',
				'plugins_spip/spip_preloadJS/**/*.html',
				'plugins_spip/spip_baseAPP/**/*.html',
				'plugins_spip/spip_baseAPP/**/*.css',
				'plugins_spip/_Bundles/**/*.html',
				'_Spip_as_A_Compiler/plugins/spip_baseApp/css/*.xml',
				'_Spip_as_A_Compiler/plugins/spip_baseApp/*.css.html',
				'_Spip_as_A_Compiler/plugins/spip_baseApp/css/*.shadowStyle.html'
			],
			filter : function(srcPath) {
				if (srcPath.match(/debug\.js|dist\.js|jsComponents_css|cache/))
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