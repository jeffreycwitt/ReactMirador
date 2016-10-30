var React = require("react");
//var Mirador = require("Mirador");
var ReactDOM = require("react-dom");

var MiradorPanel = React.createClass({
	getInitialState: function(){
		return {
			width: this.props.width
		}
	},
	componentWillMount: function(){
		var _this = this;
		_this.createMiradorInstance();

	},
	setWidth: function(width){
		this.setState({width: width})
	},
	componentDidUpdate: function(){
		var width = this.state.width;
		var $node = $(ReactDOM.findDOMNode(this))
		$node.children('div').remove();
		$node.append('<div style="width:' + width + '" id="viewer"></div>');
		this.createMiradorInstance(this.props.type);
	},
	componentWillReceiveProps: function(nextProps){
		var width = nextProps.width;
		//var width = this.props.width;
		console.log(width);
		this.setWidth(width);
	},
	createMiradorInstance: function(type){
		var _this = this;
		if (type == "manifest"){
			$(function(){
					Mirador({
			      	"id": "viewer",
		      	"layout": "1x1",
		      	'openManifestsPage' : true,
						"buildPath": "/mirador/",
		      	"data" : [
		      		{manifestUri : "http://scta.info/iiif/codex/" + _this.props.expressionid + "/manifest"}
							//{manifestUri : "http://localhost:3000/iiif/codex/" + _this.props.expressionid + "/manifest"}
		      	]
		      });
		    });
			}
		else{
			$(function(){
					Mirador({
			      	"id": "viewer",
		      	"layout": "1x1",
		      	'openManifestsPage' : true,
						"buildPath": "/mirador/",
		      	"data" : [
		      		{collectionUri : "http://scta.info/iiif/" + _this.props.expressionid + "/collection"}
							//{collectionUri : "http://localhost:3000/iiif/" + _this.props.expressionid + "/collection"}
		      	]
		      });
		    });
			}
	},


	render: function(){
		var divStyle = {width: this.state.width}
		return(
			<div>
				<div style={divStyle} id="viewer"></div>
			</div>


		)
	}
});

module.exports = MiradorPanel;
