var React = require("react");
var SearchForm = require("SearchForm");
var SearchResults = require("SearchResults");

var SidePanel = React.createClass({

	render: function(){
		return(
			<div>

				<SearchResults/>
			</div>
			)
	}
})

module.exports = SidePanel;

//<SearchForm/>
