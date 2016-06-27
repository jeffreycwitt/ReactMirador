var React = require("react");

var SearchForm = React.createClass({
	render: function(){
		return(
			<form>
			<input id="search-input" type="text" placeholder="search for collection"></input>
			</form>
		)
	}
})

module.exports = SearchForm;