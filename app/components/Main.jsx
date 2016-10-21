var React = require("react");

var SidePanel = require("SidePanel");
var MiradorPanel = require("MiradorPanel");

var Main = (props) => {
	var expressionid = props.params.expressionid;
	var type = props.location.query.type;
	return(
		<div className='panel-wrapper'>
			<div className="side-panel-wrapper">
				<SidePanel expressionid={expressionid}/>
			</div>
			<div className="mirador-panel-wrapper">
				<MiradorPanel expressionid={expressionid} type={type}/>
			</div>

		</div>

		);
}

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
