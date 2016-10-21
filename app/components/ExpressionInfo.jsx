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
			expressionChildren: undefined,
		}
	},
	setExpressionResults: function(query){
		var _this = this;
		sctaData.getData(query).then(function(resp){

			var expression_title = resp.results.bindings[0].expression_title.value
			_this.setState({
				expressionTitle: expression_title
			});
			var expression_children = []
			resp.results.bindings.forEach(function(result){
				var expression_child = result.expression_child.value;
				var child_shortid = expression_child.split("/").pop(-1);
				console.log("ex child", expression_child);
					expression_children.push(<li><Link to={child_shortid}>{expression_child}</Link></li>);
			});
			_this.setState({
				expressionChildren: expression_children
			});
		});
	},

	componentWillMount: function(){
		var _this = this;
		_this.setExpressionResults(expressionInfoQuery(_this.props.expressionid));
	},
	//TODO: basically works, but I the WillUpdate or DidUpdate is causing a strange infinite loop
	//componentWillUpdate: function(){
		//var _this = this;
		//_this.setExpressionResults(expressionInfoQuery(_this.props.expressionid));
	//},

	render: function(){
		var _this = this;
		console.log("children", this.state.expressionChildren)
		return(
			<div>
				<p>Text {this.state.expressionTitle}</p>
				<ul>{this.state.expressionChildren}</ul>
			</div>
		)
	}
})

module.exports = ExpressionInfo;
