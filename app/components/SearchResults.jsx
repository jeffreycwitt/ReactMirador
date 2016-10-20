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
			"?author <http://scta.info/property/personType> ?authorTitle .",
			"}",
			"ORDER BY ?authorTitle",
		].join('');

// var authorQuery = [
// 					"select ?topLevelExpression ?author ?authorTitle",
// 					"where {",
// 					"?topLevelExpression a <http://scta.info/resource/expression> .",
// 					"?topLevelExpression <http://scta.info/property/level> '1' .",
// 					"?topLevelExpression <http://www.loc.gov/loc.terms/relators/AUT> ?author .",
// 					"?author <http://scta.info/property/personType> ?authorTitle .",
// 					"}",
// 					"ORDER BY ?authorTitle",
// 				].join('');

//getExpressionInfo: function(expressionid){
					//var expressionQuery = [
						//"select ?resource_title ?resource_child ?resource_child_title ?resource_child_short_id ?resource_parent ?resource_parent_title ?resource_parent_short_id",
					//"where {",
					//"<http://scta.info/resource/plaoulcommentary> <http://purl.org/dc/elements/1.1/title> ?resource_title .",
					// "OPTIONAL {",
					// "<http://scta.info/resource/plaoulcommentary> <http://purl.org/dc/terms/isPartOf> ?resource_parent .",
					// "?resource_parent <http://purl.org/dc/elements/1.1/title> ?resource_parent_title .",
					// "?resource_parent <http://scta.info/property/shortId> ?resource_parent_short_id .",
					// "}",
					// "OPTIONAL {",
					// "<http://scta.info/resource/plaoulcommentary> <http://purl.org/dc/terms/hasPart> ?resource_child .",
					// "?resource_child <http://purl.org/dc/elements/1.1/title> ?resource_child_title .",
					// "?resource_child <http://scta.info/property/shortId> ?resource_child_short_id .",
					// "}",
				//	"}",
				//	].join('');

					//return query
				//}

var SearchResults = React.createClass({
	getInitialState: function(){
		return {
			textResults: undefined,
			authorResults: undefined,
		}
	},
	setTextResults: function(query){
		var _this = this;
		sctaData.getData(query).then(function(resp){

			var displayResults = [];

			var getTitles = function(authorid, resp2){

				var titles = [];
				for (var i = 0; i < resp2.results.bindings.length; i++) {
					var bindings = resp2.results.bindings;
					if (bindings[i].author.value.split("/").pop(-1) === authorid){
						var shortid = bindings[i].topLevelExpression.value.split("/").pop(-1);
						titles.push(<li><Link to={shortid}>{bindings[i].topLevelExpressionTitle.value}</Link></li>)
					}
				};

				return titles
			}
			var currentAuthor = ""
			resp.results.bindings.forEach(function(result){
				var authorid = result.author.value.split("/").pop(-1)
				var shortid = result.topLevelExpression.value.split("/").pop(-1);
				var shortid_url = "/" + shortid
				var collectionUrl = "/default_target?collection=http://scta.info/iiif/" + shortid + "/collection";
				// conditional used to filter out repeat entries for author of multiple works
				if (currentAuthor != authorid){
					console.log("authorid", authorid);
					console.log("currentAuthor", currentAuthor)
					displayResults.push(
						<li className="expression-link">
							<Link to={authorid}>{authorid}</Link>
							<ul>
								{getTitles(authorid, resp)}
							</ul>
						</li>
						);
					}
				currentAuthor = authorid


			});
			_this.setState({
				textResults: displayResults
			});

		});

	},
	/*
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
	*/
	// setExpressionResults: function(query){
	// 	var _this = this;
	// 	var expressionid = this.props.expressionid
	// 	sctaData.getData(query).then(function(resp){
	// 		console.log("expressionid results", resp);
	// 		var expressionResults = [];
	//
	// 		var resource_title = resp.results.bindings[0].resource_title;
	// 		//var resource_parent = resp.results.bindings[0].resource_parent_title;
	// 		//var resource_parent_short_id = resp.results.bindings[0].resource_parent_short_id;
	//
	// 		expressionResults.push(<div><h1>{resource_title}</h1></div>);
	// 		console.log(expressionResults);
	// 		//<Link to={resource_parent_short_id}>{resource_parent_short_id}</Link>
	//
	// 		//resp.results.bindings.forEach(function(result){
	// 			//var shortid = result.resource_child_short_id;
	//
	// 			//expressionResults.push(
	// 				//<li className="expression-link"><Link to={shortid}>{shortid}</Link></li></div>
	// 			//);
	// 		//});
	//
	// 		_this.setState({
	// 			expressionResults: expressionResults
	// 		});
	//
	// 	});
	//
	// },
	componentWillMount: function(){
		var _this = this;
		//_this.setAuthorResults(authorQuery);
		_this.setTextResults(textQuery);
		//_this.setExpressionResults(expressionQuery);

	},

	render: function(){
		//console.log(this.state.results);
		//<ul className="search-results">
			///<h1>Available Author Collections</h1>
			//{this.state.authorResults}
	//	</ul>
		return(
			<div>

				<ul className="search-results">
					<h1>Available Text Collections</h1>
					{this.state.textResults}
				</ul>

			</div>
		)
	}
})

module.exports = SearchResults;
