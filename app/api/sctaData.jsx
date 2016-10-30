var axios = require("axios");

const SCTA_SPARQL_ENDPOINT = "http://sparql-staging.scta.info/ds/query";
//const SCTA_SPARQL_ENDPOINT = "http://localhost:3030/ds/query";




module.exports = {
	getData: function(query){

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
