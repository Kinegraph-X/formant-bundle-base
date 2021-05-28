var fs = require('fs');

module.exports = function(grunt, options) {
//	console.log(options);
	return {
		debug: {
			files: {
				'<%=pathToProject%>js/<%=currentProject%>.debug.js': ['<%=pathToProject%>src/index.js']
			},
			options: {
				browserifyOptions: {
					debug: true,
					paths : options.browserifyPath
				},
				configure : function(browserifyInstance) {
					browserifyInstance.require(grunt.config.data.UIPackageList);
					browserifyInstance.require(grunt.config.data.UIvalidatorsList);
					if (fs.existsSync('cache/stringifiedSources.js'))
						browserifyInstance.require(['cache/stringifiedSources']);
				},
				preBundleCB : function(browserifyInstance) {
					// php-cgi -f test_servers/_media_play_01/_enhanced/spip.php page=RegistrationForm
				},
				// As the stringifiedSources are generated and cached via a browserify-transform,
				// the inclusion in the bundle is made on the base of the file generated on the first call to the transform.
				// But at the end of the static analysis ( + source buffer generation), the cached file has its "final" contents.
				// So a basic Regex allows us to "re-inject" it in the bundled file.
				
				// We also could find useful to execute our code directly in the d8 REPL
				// The we'd need to expose the global namespace through the "window" object
				// 		(as some of the libs we're using are only ment to run in the browser)
				// Let's handle that here too.
				postBundleCB : function(err, src, next) {
					if (err)
						next(err, src);
					// The next callback should be called with (err, modifiedSrc); the modifiedSrc is what will be written to the output file.
					var stringifiedSources = grunt.file.read(options.pathToProject + 'cache/stringifiedSources.js');
					var modifiedSrc = src.toString().replace(/module\.exports\s=\s\{sourcesAsStringArrays.*/, stringifiedSources);
					
					// node.js and d8 compatibility
					var nodeOrd8Polyfill = `
					// Get compatibility with node.js and standalone engines
					if (typeof window === 'undefined') {
						if (typeof global === 'undefined')
							window = this;
						else
							window = global;
					
						window.document = (typeof d8 !== 'undefined' && d8.dom) || {};
					}
					`.replace(/\t{5}/g, '');
					modifiedSrc = nodeOrd8Polyfill + modifiedSrc;
					
					next(err, modifiedSrc);
				},
				plugin: [
					'dep-case-verify', 'browserify-derequire'
				],
				transform: [
					'strictify',
					'stringify',
					['cssify-from-db', {pathToProject : '<%=pathToProject%>'}],
					['browserify-replace', {
							replace: [
								{from: /%%UIpackage%%/, to: options.UIpackage}
							]
						}
					],
					['highlighted-sources', {pathToProject : '<%=pathToProject%>'}]
				]
			}
		},
		release: {
			files: {
				'<%=pathToProject%>js/<%=currentProject%>.dist.js': ['<%=pathToProject%>src/index.js']
			},
			options: {
				browserifyOptions: {
					paths : options.browserifyPath
				},
				configure : function(browserifyInstance) {
					browserifyInstance.require(grunt.config.data.UIPackageList);
					browserifyInstance.require(grunt.config.data.UIvalidatorsList);
					browserifyInstance.require(['cache/stringifiedSources']);
				},
				preBundleCB : function(b) {

				},
				postBundleCB : function(err, src, next) {
					if (err)
						next(err, src);
					// The next callback should be called with (err, modifiedSrc); the modifiedSrc is what will be written to the output file.
					var stringifiedSources = grunt.file.read(options.pathToProject + 'cache/stringifiedSources.js');
					var modifiedSrc = src.toString().replace(/module\.exports\s=\s\{sourcesAsStringArrays.*/, stringifiedSources);
					next(err, modifiedSrc);
				},
				plugin: [
					'dep-case-verify', 'browserify-derequire', 'bundle-collapser/plugin'
				],
				transform: [
					'stringify',
					['cssify-from-db', {pathToProject : '<%=pathToProject%>'}],
					['browserify-replace', {
							replace: [
								{from: /%%UIpackage%%/, to: options.UIpackage}
							]
						}
					],
					['highlighted-sources', {pathToProject : '<%=pathToProject%>'}]
				]
			}
		}
	};
};