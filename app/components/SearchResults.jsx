var React = require("react");
var sctaData = require("sctaData");
var {Link, IndexLink} = require("react-router");

var SearchResults = React.createClass({
	getInitialState: function(){
		return {
			results: undefined
		}
	},
	componentWillMount: function(){
		var _this = this;
		sctaData.getData().then(function(resp){
			console.log(resp);
			var displayResults = [];
			resp.results.bindings.forEach(function(result){
				var shortid = result.topLevelExpression.value.split("/").pop(-1);
				var shortid_url = "/" + shortid
				var collectionUrl = "/default_target?collection=http://scta.info/iiif/" + shortid + "/collection";
				displayResults.push(
					<li><Link to={shortid}>{result.topLevelExpressionTitle.value}</Link></li>
					);
				

				/*displayResults.push(
					<li><a href={collectionUrl}>{result.topLevelExpressionTitle.value}</a></li>
					);
					*/
			});
			_this.setState({
				results: displayResults
			});
		});
	},
	
	render: function(){
		//console.log(this.state.results);
		return(
			<div>
				<p>Drag link into Mirador to View Collection</p>
				<ul className="search-results">
					{this.state.results}
				</ul>
			</div>
		)
	}
})

module.exports = SearchResults;