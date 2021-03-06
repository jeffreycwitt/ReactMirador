var React = require("react");
var sctaData = require("sctaData");
var {Link, IndexLink} = require("react-router");

var textQuery = [
			"SELECT ?author ?author_title ?topLevelExpression ?topLevelExpressionTitle WHERE {",
			"?topLevelExpression a <http://scta.info/resource/expression> .",
			"?topLevelExpression <http://scta.info/property/level> '1' .",
			"?topLevelExpression <http://purl.org/dc/elements/1.1/title> ?topLevelExpressionTitle .",
			"?topLevelExpression <http://www.loc.gov/loc.terms/relators/AUT> ?author .",
			"?author <http://purl.org/dc/elements/1.1/title> ?author_title .",
			"}",
			"ORDER BY ?author_title",
		].join('');

var TextList = React.createClass({
	getInitialState: function(){
		return {
			textResults: undefined,
			//authorResults: undefined,
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
						var collectionUrl = "http://scta.info/iiif/" + shortid + "/collection?collection=http://scta.info/iiif/" + shortid + "/collection"
						var LbpUrl = "http://scta.lombardpress.org/text/questions/" + shortid
						titles.push(
							<li className="expression-link" key={shortid}>
								<Link to={shortid}>{bindings[i].topLevelExpressionTitle.value}</Link>
									<a href={collectionUrl} title="Drag and Drop this icon into Mirador"> - <img height="10" src="http://www.e-codices.unifr.ch/img/logo-iiif-34x30.png" alt="IIIF Drag-n-drop"/></a> - <a href={LbpUrl} target="_blank" style={{"color": "blue"}}>LBP</a>
							</li>
						)
					}
				};

				return titles
			}
			var currentAuthor = ""
			resp.results.bindings.forEach(function(result){
				var authorid = result.author.value.split("/").pop(-1)
				var author_title = result.author_title.value
				var shortid = result.topLevelExpression.value.split("/").pop(-1);
				var shortid_url = "/" + shortid
				var collectionUrl = "/default_target?collection=http://scta.info/iiif/" + shortid + "/collection";
				var authorCollectionUrl = "/default_target?collection=http://scta.info/iiif/" + authorid + "/collection";
				// conditional used to filter out repeat entries for author of multiple works
				if (currentAuthor != authorid){

					displayResults.push(
						<li key={authorid}>
							<Link to={authorid}>{author_title}</Link><a href={authorCollectionUrl} title="Drag and Drop this icon into Mirador"> - <img height="10" src="http://www.e-codices.unifr.ch/img/logo-iiif-34x30.png" alt="IIIF Drag-n-drop"/>
							</a>
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

				<ul className="text-results">
					<h1>Available Text Collections</h1>
					{this.state.textResults}
				</ul>

			</div>
		)
	}
})

module.exports = TextList;
