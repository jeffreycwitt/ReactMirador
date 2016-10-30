var React = require("react");
var sctaData = require("sctaData");
var {Link, IndexLink} = require("react-router");

var textQuery = [
			"SELECT ?codex ?codex_title WHERE {",
			"?codex a <http://scta.info/resource/codex> .",
			"?codex <http://purl.org/dc/elements/1.1/title> ?codex_title .",
			"}",
			"ORDER BY ?codex_title",
		].join('');

var CodexList = React.createClass({
	getInitialState: function(){
		return {
			codexResults: undefined,

		}
	},
	setCodexResults: function(query){
		var _this = this;
		var displayResults = [];
		sctaData.getData(query).then(function(resp){
			resp.results.bindings.forEach(function(result){
				var codex_shortid = result.codex.value.split("/").pop(-1)
				var codex_title = result.codex_title.value
				var shortid_url = "/" + codex_shortid;
				var manifestUrl = "http://scta.info/iiif/codex/" + codex_shortid + "/manifest?manifest=http://scta.info/iiif/codex/" + codex_shortid + "/manifest";
				//var manifestUrl = "/default_target?manifest=http://scta.info/iiif/codex/" + codex_shortid + "/manifest";
				displayResults.push(
						<li className="codex-link" key={codex_shortid}>
							<Link to={{ pathname: codex_shortid, query: { type: 'manifest' } }}>{codex_title}</Link>
							<a href={manifestUrl} id="IIIF-drag-and-drop" alt="IIIF Drag-n-drop" title="Drag and Drop this icon into Mirador"> - <img height="10" src="http://www.e-codices.unifr.ch/img/logo-iiif-34x30.png" alt="IIIF Drag-n-drop"/></a>
						</li>
						);
					});
			_this.setState({
				codexResults: displayResults
			});

		});

	},

	componentWillMount: function(){
		var _this = this;
		_this.setCodexResults(textQuery);
	},

	render: function(){
		return(
			<div>

				<ul className="codices-results">
					<h1>Available Codices</h1>
					{this.state.codexResults}
				</ul>

			</div>
		)
	}
})

module.exports = CodexList;
