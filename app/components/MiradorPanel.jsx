var React = require("react");
//var Mirador = require("Mirador");

var MiradorPanel = React.createClass({
	componentWillMount: function(){
		var _this = this;
		_this.createMiradorInstance();

	},
	componentWillUpdate: function(){
		console.log(this);

	},
	createMiradorInstance: function(){
		var _this = this;
		$(function(){
				Mirador({
	      	"id": "viewer",
	      	"layout": "1x1",
	      	'openManifestsPage' : true,
	      	"data" : [
	      		{collectionUri : "http://scta.info/iiif/" + _this.props.expressionid + "/collection" }
	      	]
	      });
	    });
	},
	

	render: function(){
		return(
			<div id="viewer"></div>
		)
	}
});

module.exports = MiradorPanel;