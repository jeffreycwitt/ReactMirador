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

		this.createMiradorInstance();
	},
	createMiradorInstance: function(){
		var _this = this;
		console.log(this.props.expressionid);




		$(function(){
				Mirador({
		      	"id": "viewer",
	      	"layout": "1x1",
	      	'openManifestsPage' : true,
					"buildPath": "/mirador/",
	      	"data" : [
	      		{collectionUri : "http://scta.info/iiif/" + _this.props.expressionid + "/collection" }
	      	]
	      });
	    });
	},


	render: function(){
		return(
			<div>
				<div id="viewer"
				></div>
			</div>


		)
	}
});

module.exports = MiradorPanel;
