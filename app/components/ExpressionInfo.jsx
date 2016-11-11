var React = require("react");
var sctaData = require("sctaData");
var {Link, IndexLink} = require("react-router");

var expressionInfoQuery = function(expressionid){
	var query = [
			"SELECT ?expression_title ?expression_child ?structureType ?child_structureType WHERE {",
			"<http://scta.info/resource/" + expressionid + "> ",
			"<http://purl.org/dc/elements/1.1/title> ?expression_title .",
			"<http://scta.info/resource/" + expressionid + "> ",
			"<http://scta.info/property/structureType> ?structureType .",

			"OPTIONAL {",
				"<http://scta.info/resource/" + expressionid + "> <http://purl.org/dc/terms/hasPart>  ?expression_child .",
				"?expression_child <http://scta.info/property/structureType> ?child_structureType .",
				"}",
			"}"
		].join('');
		return query
	}

var ExpressionInfo = React.createClass({
	getInitialState: function(){
		return {
			expressionTitle: undefined,
			expressionChildren: undefined
		}
	},
	setExpressionResults: function(query){
		var _this = this;
		//clear out old state
		_this.setState({
			expressionTitle: undefined,
			expressionChildren: undefined,
			expressionStructureType: undefined
		});

		sctaData.getData(query).then(function(resp){

			var expression_title = resp.results.bindings[0].expression_title.value
			var expressionStructureType = resp.results.bindings[0].structureType.value
			var expression_children = []
			resp.results.bindings.forEach(function(result){
				var expression_child = result.expression_child.value;
				var child_shortid = expression_child.split("/").pop(-1);
				var child_structureType = result.child_structureType.value;
				if (child_structureType === "http://scta.info/resource/structureCollection"){
					expression_children.push(<li key={child_shortid}><Link to={child_shortid}>{expression_child}</Link></li>);
				}

			});
			_this.setState({
				expressionChildren: expression_children,
				expressionTitle: expression_title,
				expressionStructureType: expressionStructureType
			});
		});
	},

	componentDidMount: function(){
		var _this = this;
			_this.setExpressionResults(expressionInfoQuery(_this.props.expressionid));
	},
	componentWillReceiveProps: function(nextProps){
		var _this = this;
		if (nextProps.expressionid !== this.props.expressionid){
			_this.setExpressionResults(expressionInfoQuery(nextProps.expressionid));
		}
	},

	render: function(){
		var _this = this;
		return(
			<div>
				<ul className="expressioninfo-results">
					<h1>{this.state.expressionTitle}</h1>
					{this.state.expressionChildren}
				</ul>
			</div>
		)
	}
})

module.exports = ExpressionInfo;
