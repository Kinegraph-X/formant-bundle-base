module.exports = function (grunt, options) {
	
	
	return {
		localRelease: {
			files : [
				{
					expand: true,
					cwd: '<%=pathToProject%>',
					src: [
						'js/<%=currentProject%>.debug.js', 'js/<%=currentProject%>.debug.js.map',
						'js/<%=currentProject%>.dist.js', 'js/<%=currentProject%>.dist.js.map',
						'**/*.html',
						'**/*.xml'
						],
					dest: '<%=localDeployPath%><%=currentProject%>',
					filter: 'isFile'
				},
				{
					expand: true,
					cwd: '<%=rootPath%>spip_baseApp',
					src: [
						'**/*.html',
						'**/*.css',
						'**/*.xml',
						'**/*.php'
						],
					dest: '<%=localDeployPath%>spip_baseApp',
					filter: function() {
						if (grunt.file.isDir(options.localDeployPath + 'spip_baseApp'))
							return true;
						return false;
					}
				},
				{
					expand: true,
					cwd: '<%=rootPath%>spip_preloadJS',
					src: [
						'**/*.html',
						'**/*.xml',
						'**/*.php'
						],
					dest: '<%=localDeployPath%>spip_preloadJS',
					filter: function() {
						if (grunt.file.isDir(options.localDeployPath + 'spip_preloadJS'))
							return true;
						return false;
					}
				},
				{
					expand: true,
					cwd: '_Spip_as_A_Compiler/plugins/_spip_baseApp/',
					src: [
						'css/*.xml',
						'*.css.html'
						],
					dest: '<%=localDeployPath%>spip_baseApp/',
					filter: function() {
						if (grunt.file.isDir(options.localDeployPath + '_spip_baseApp'))
							return true;
						return false;
					}
				}
			]
		}
	};
}