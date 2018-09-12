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
import ControlUtils from "./../../util/control-utils";
import ValidationMessage from "./../../components/validation-message";
import { STATES, DISPLAY_CHARS_DEFAULT, ELLIPSIS_STRING } from "./../../constants/constants.js";
import { ControlType } from "./../../constants/form-constants";

import classNames from "classnames";
import PropertyUtils from "./../../util/property-utils";

class ReadonlyControl extends React.Component {
	render() {
		let controlValue = this.props.value;
		if (typeof controlValue === "undefined" || controlValue === null) {
			controlValue = "";
		} else if (typeof controlValue === "object" && controlValue.link_ref) {
			controlValue = PropertyUtils.stringifyFieldValue(controlValue, this.props.control);
		} else if (Array.isArray(controlValue)) {
			// this is needed to comma separate an array of readonly strings.
			controlValue = controlValue.join(", ");
		} else if (typeof controlValue === "boolean") {
			controlValue = controlValue.toString();
		}
		if (this.props.columnDef) {
			const displayCharLimit = (typeof this.props.columnDef.displayChars !== "undefined")
				? this.props.columnDef.displayChars : DISPLAY_CHARS_DEFAULT;
			if (controlValue.length > displayCharLimit) {
				controlValue = controlValue.substr(0, displayCharLimit - 1) + ELLIPSIS_STRING;
			}
			if (this.props.columnDef.controlType === ControlType.CUSTOM) {
				controlValue = this.props.controller.getCustomControl(this.props.propertyId, this.props.columnDef, { table: true, editStyle: "summary" });
			}
		}

		return (
			<div
				className={classNames("properties-readonly", { "hide": this.props.state === STATES.HIDDEN })}
				data-id={ControlUtils.getDataId(this.props.propertyId)}
			>
				<span disabled={this.props.state === STATES.DISABLED}>
					{controlValue}
				</span>
				<ValidationMessage inTable={this.props.tableControl} state={this.props.state} messageInfo={this.props.messageInfo} />
			</div>
		);
	}
}

ReadonlyControl.propTypes = {
	control: PropTypes.object.isRequired,
	propertyId: PropTypes.object.isRequired,
	controller: PropTypes.object.isRequired,
	tableControl: PropTypes.bool,
	columnDef: PropTypes.object,
	state: PropTypes.string, // pass in by redux
	value: PropTypes.any, // pass in by redux
	messageInfo: PropTypes.object // pass in by redux
};

const mapStateToProps = (state, ownProps) => ({
	value: ownProps.controller.getPropertyValue(ownProps.propertyId),
	state: ownProps.controller.getControlState(ownProps.propertyId),
	messageInfo: ownProps.controller.getErrorMessage(ownProps.propertyId)
});

export default connect(mapStateToProps, null)(ReadonlyControl);
