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


		var collectionurl = "http://localhost:3000/iiif/" + _this.props.expressionid + "/collection2"
		console.log(collectionurl)

		$(function(){
				Mirador({
		      	"id": "viewer",
	      	"layout": "1x1",
	      	'openManifestsPage' : true,
					"buildPath": "/mirador/",
	      	"data" : [
	      		{collectionUri : "http://scta.info/iiif/" + _this.props.expressionid + "/collection" }
						//{collectionUri : collectionurl}
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
