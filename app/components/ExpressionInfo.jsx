var React = require("react");
var sctaData = require("sctaData");
var {Link, IndexLink} = require("react-router");

var expressionInfoQuery = function(expressionid){
	var query = [
			"SELECT ?expression_title ?expression_child WHERE {",
			"<http://scta.info/resource/" + expressionid + "> ",
			"<http://purl.org/dc/elements/1.1/title> ?expression_title .",
			"OPTIONAL {",
				"<http://scta.info/resource/" + expressionid + "> <http://purl.org/dc/terms/hasPart>  ?expression_child .",
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
			expressionChildren: undefined
		});

		sctaData.getData(query).then(function(resp){

			var expression_title = resp.results.bindings[0].expression_title.value
			var expression_children = []
			resp.results.bindings.forEach(function(result){
				var expression_child = result.expression_child.value;
				var child_shortid = expression_child.split("/").pop(-1);
				expression_children.push(<li key={child_shortid}><Link to={child_shortid}>{expression_child}</Link></li>);
				});
			_this.setState({
				expressionChildren: expression_children,
				expressionTitle: expression_title
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
