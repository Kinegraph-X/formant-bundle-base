
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
				},
				preBundleCB : function(browserifyInstance) {

				},
				plugin: [
					'browserify-derequire'
				],
				transform: [
					'stringify',
					['cssify-to-json-class-index', {pathToProject : '<%=pathToProject%>'}],
					['browserify-replace', {
							replace: [
								{from: /%%UIpackage%%/, to: options.UIpackage}
							]
						}
					]
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
				},
				preBundleCB : function(b) {

				},
				plugin: [
					'browserify-derequire', 'bundle-collapser/plugin'
				],
				transform: [
					'stringify',
					['cssify-to-json-class-index', {pathToProject : '<%=pathToProject%>'}],
					['browserify-replace', {
							replace: [
								{from: /%%UIpackage%%/, to: options.UIpackage}
							]
						}
					]
				]
			}
		}
	};
};