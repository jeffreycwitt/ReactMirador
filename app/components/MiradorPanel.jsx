var React = require("react");
//var Mirador = require("Mirador");
var ReactDOM = require("react-dom");

var MiradorPanel = React.createClass({
	componentWillMount: function(){
		var _this = this;
		_this.createMiradorInstance();

	},

	componentDidUpdate: function(){
		var $node = $(ReactDOM.findDOMNode(this))
		$node.children('div').remove();
		$node.append('<div id="viewer"></div>');
		this.createMiradorInstance(this.props.type);
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
		return(
			<div>
				<div id="viewer"></div>
			</div>


		)
	}
});

module.exports = MiradorPanel;
