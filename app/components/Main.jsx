var React = require("react");

var SidePanel = require("SidePanel");
var MiradorPanel = require("MiradorPanel");

var Main = React.createClass({
	getInitialState: function(){
		return {
			sidePanelStatus: "open"
		}
	},
	showSidePanel: function(){
		this.setState({sidePanelStatus: "open"})
	},
	hideSidePanel: function(){
		this.setState({sidePanelStatus: "closed"})
	},
	render: function(){
		var _this = this
		var expressionid = this.props.params.expressionid;
		var type = this.props.location.query.type;
		var width = this.state.sidePanelStatus === 'open' ? "80%" : "95%"
		var sidePanelWidth = this.state.sidePanelStatus === 'open' ? { width: '20%' } : { display: 'none' }
		var buttonStyle = this.state.sidePanelStatus !== 'open' ? { width: 'auto' } : { display: 'none' }

		//<button onClick={this.hideSidePanel}>Hide</button>
		return(

		<div className='panel-wrapper'>
			<div style={buttonStyle} className="side-panel-button">
				<button onClick={this.showSidePanel}>Show</button>
			</div>
			<div style={sidePanelWidth} className="side-panel-wrapper">

				<SidePanel  expressionid={expressionid}/>
			</div>
			<div style={{width: width}} className="mirador-panel-wrapper">
				<MiradorPanel expressionid={expressionid} type={type} width={width}/>
			</div>

		</div>

		);
	}
});

module.exports = Main;


/*
<div className="row">
				<div className="column small-2 side-panel-wrapper">
					<SidePanel/>
				</div>
				<div className="column small-10 mirador-panel-wrapper">
					<MiradorPanel/>
				</div>
			</div>
			*/

/** cut from
c

**/
