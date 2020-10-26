module.exports = function(grunt, options) {

	return {
		release : {
			files: {
				'<%=pathToProject%>js/<%=currentProject%>.dist.js' : ['<%=pathToProject%>js/<%=currentProject%>.dist.js']
			},
			// mangle : true
		}
	}
};