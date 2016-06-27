var axios = require("axios");

const SCTA_SPARQL_ENDPOINT = "http://sparql-staging.scta.info/ds/query";

var query = [
			"select ?topLevelExpression ?topLevelExpressionTitle ?author ?authorTitle", 
			"where {", 
			"?topLevelExpression a <http://scta.info/resource/expression> .",
			"?topLevelExpression <http://scta.info/property/level> '1' .",
			"?topLevelExpression <http://purl.org/dc/elements/1.1/title> ?topLevelExpressionTitle .", 
			"?topLevelExpression <http://www.loc.gov/loc.terms/relators/AUT> ?author .", 
			//"?author <http://purl.org/dc/elements/1.1/title> ?authorTitle .",
			"}", 
			//"ORDER BY ?authorTitle",
		].join('');

module.exports = {
	getData: function(){
		
		var requestUrl = `${SCTA_SPARQL_ENDPOINT}?query=${query}&format=json`;

		return axios.get(requestUrl).then(function(res){
			
			if (res.data.cod && res.data.message){
				throw new Error(res.data.message)
			}
			else {
				return res.data;
			}
		}, function(res){
			throw new Error(res.data.message);
		});
	}
}