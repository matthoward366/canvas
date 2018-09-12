/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016, 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SelectorPanel extends React.Component {

	render() {
		let panel = this.props.panel;
		if (typeof panel === "undefined") {
			panel = <div className="properties-control-panel" />;
		}
		return (panel);
	}
}

SelectorPanel.propTypes = {
	panels: PropTypes.object,
	dependsOn: PropTypes.string,
	controller: PropTypes.object.isRequired,
	panel: PropTypes.object // set by redux
};

const mapStateToProps = (state, ownProps) => ({
	panel: ownProps.panels[ownProps.controller.getPropertyValue({ name: ownProps.dependsOn })]
});

export default connect(mapStateToProps, null)(SelectorPanel);
