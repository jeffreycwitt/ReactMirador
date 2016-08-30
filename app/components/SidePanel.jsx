var React = require("react");
var SearchForm = require("SearchForm");
var SearchResults = require("SearchResults");

var SidePanel = React.createClass({

	render: function(){
		return(
			<div>
				<SearchForm/>
				<SearchResults/>
			</div>
			)
	}
})

module.exports = SidePanel;
