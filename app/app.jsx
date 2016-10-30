var React = require("react");
var ReactDOM = require("react-dom");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");
var Main = require("Main");

// load foundation
//require('style!css!foundation-sites/dist/foundation.min.css')

//$(document).foundation();

// App css

require('style!css!sass!applicationStyles')
//require('style!css!miradorStyles')

//$(document).foundation();

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/(:expressionid)" component={Main}/>
	</Router>,
	document.getElementById('app')
);
