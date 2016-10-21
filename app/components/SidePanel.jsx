var React = require("react");
var SearchForm = require("SearchForm");
var TextList = require("TextList");
var CodexList = require("CodexList");
var ExpressionInfo = require("ExpressionInfo");

var SidePanel = React.createClass({


	render: function(){
		return(
			<div>
				<ExpressionInfo expressionid={this.props.expressionid}/>
				<TextList/>
				<CodexList/>
			</div>
			)
	}
})

module.exports = SidePanel;

//<SearchForm/>
