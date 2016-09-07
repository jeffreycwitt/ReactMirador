var React = require("react");
var sctaData = require("sctaData");
var {Link, IndexLink} = require("react-router");

var textQuery = [
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

var authorQuery = [
					"select ?topLevelExpression ?author ?authorTitle",
					"where {",
					"?topLevelExpression a <http://scta.info/resource/expression> .",
					"?topLevelExpression <http://scta.info/property/level> '1' .",
					"?topLevelExpression <http://www.loc.gov/loc.terms/relators/AUT> ?author .",
					"?author <http://scta.info/property/personType> ?authorTitle .",
					"}",
					"ORDER BY ?authorTitle",
				].join('');


var SearchResults = React.createClass({
	getInitialState: function(){
		return {
			textResults: undefined,
			authorResults: undefined
		}
	},
	setTextResults: function(query){
		var _this = this;
		sctaData.getData(query).then(function(resp){
			console.log(resp);
			var displayResults = [];
			resp.results.bindings.forEach(function(result){
				var shortid = result.topLevelExpression.value.split("/").pop(-1);
				var shortid_url = "/" + shortid
				var collectionUrl = "/default_target?collection=http://scta.info/iiif/" + shortid + "/collection";
				displayResults.push(
					<li className="expression-link"><Link to={shortid}>{result.topLevelExpressionTitle.value}</Link></li>
					);
			});
			_this.setState({
				textResults: displayResults
			});

		});

	},
	setAuthorResults: function(query){
		var _this = this;
		sctaData.getData(query).then(function(resp){
			console.log("authorresults", resp);
			var displayResults = [];
			var currentAuthor = ""
			resp.results.bindings.forEach(function(result){
				var shortid = result.author.value.split("/").pop(-1);
				var shortid_url = "/" + shortid
				var collectionUrl = "/default_target?collection=http://scta.info/iiif/" + shortid + "/collection";
				// conditional used to filter out repeat entries for author of multiple works
				if (currentAuthor != shortid) {
					displayResults.push(
						<li className="expression-link"><Link to={shortid}>{shortid}</Link></li>
						);
				}
				currentAuthor = shortid
			});
			_this.setState({
				authorResults: displayResults
			});

		});

	},
	componentWillMount: function(){
		var _this = this;
		_this.setAuthorResults(authorQuery);
		_this.setTextResults(textQuery);






	},

	render: function(){
		//console.log(this.state.results);
		return(
			<div>
				<ul className="search-results">
					<h1>Available Text Collections</h1>
					{this.state.textResults}
				</ul>
				<ul className="search-results">
					<h1>Available Author Collections</h1>
					{this.state.authorResults}
				</ul>
			</div>
		)
	}
})

module.exports = SearchResults;
