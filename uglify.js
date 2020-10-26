module.exports = function(grunt, options) {

	return {
		files: {
			'<%=pathToProject%>js/<%=currentProject%>.dist.js' : ['<%=pathToProject%>js/<%=currentProject%>.dist.js']
		}
	}
};