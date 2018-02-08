/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import { expect } from "chai";

import propertyUtils from "../_utils_/property-utils";
import columSelectionPanel from "../test_resources/paramDefs/columnSelectionPanel_multiInput_paramDef.json";
import panelParamDef from "../test_resources/paramDefs/panel_paramDef.json";

describe("selectcolumn and selectcolumns controls work in columnSelection panel", () => {
	let wrapper;
	let panels;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(panelParamDef);
		wrapper = renderedObject.wrapper;
		const columnSelectionCategory = wrapper.find(".category-title-container-right-flyout-panel").at(2); // COLUMN SELECTION category
		panels = columnSelectionCategory.find(".control-panel");
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("should show correct values from selectcolumn controls", () => {
		const selectColumnControls = panels.at(1).find("Dropdown");
		expect(selectColumnControls).to.have.length(2);

		const selectColumn1 = selectColumnControls.at(0);
		expect(selectColumn1.find(".Dropdown-placeholder").text()).to.equal("age");
		const expectedOptions = [
			{ label: "...", value: "" },
			{ label: "age", value: "age" },
			{ label: "Na", value: "Na" },
			{ label: "drug", value: "drug" }
		];
		const actualOptions = selectColumn1.prop("options");
		expect(actualOptions).to.eql(expectedOptions);

		const selectColumn2 = selectColumnControls.at(1);
		expect(selectColumn2.find(".Dropdown-placeholder").text()).to.equal("BP");
		const expectedOptions2 = [
			{ label: "...", value: "" },
			{ label: "BP", value: "BP" },
			{ label: "Na", value: "Na" },
			{ label: "drug", value: "drug" }
		];
		const actualOptions2 = selectColumn2.prop("options");
		expect(actualOptions2).to.eql(expectedOptions2);
	});

	it("should show correct values from selectcolumn and selectcolumns controls", () => {
		const selectColumn = panels.at(2).find("Dropdown");
		expect(selectColumn).to.have.length(1);
		const expectedOptions = [
			{ label: "...", value: "" },
			{ label: "age", value: "age" },
			{ label: "BP", value: "BP" },
			{ label: "Na", value: "Na" },
			{ label: "drug", value: "drug" }
		];
		const actualOptions = selectColumn.prop("options");
		expect(actualOptions).to.eql(expectedOptions);
		selectColumn.getNode().setValue("age", "age");

		const addFieldsButtons = panels.at(2).find("Button"); // field picker buttons
		addFieldsButtons.at(0).simulate("click"); // open filter picker for `Select Fields` control
		propertyUtils.fieldPicker(["BP"], ["BP", "Na", "drug"]);
		const rows = panels.at(2).find(".column-select-table-row");
		expect(rows).to.have.length(1);
	});
});

describe("selectcolumn and selectcolumns controls work in columnSelection panel with multi schema input", () => {
	let wrapper;
	let panels;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(columSelectionPanel);
		wrapper = renderedObject.wrapper;
		const valuesCategory = wrapper.find(".category-title-container-right-flyout-panel").at(0); // VALUES category
		panels = valuesCategory.find(".control-panel");
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("should show correct values from selectcolumn controls with multi schema input", () => {
		expect(panels).to.have.length(4);
		const selectColumnControls = panels.at(1).find("Dropdown");
		expect(selectColumnControls).to.have.length(2);

		const selectColumn1 = selectColumnControls.at(0);
		expect(selectColumn1.find(".Dropdown-placeholder").text()).to.equal("0.Age");

		let expectedSelectColumn1Options = [
			{ label: "...", value: "" },
			{ label: "0.Age", value: "0.Age" },
			{ label: "Sex", value: "Sex" },
			{ label: "Drug", value: "Drug" },
			{ label: "0.drug2", value: "0.drug2" },
			{ label: "data.Age", value: "data.Age" },
			{ label: "BP", value: "BP" }, // TODO: should this be "data.BP"?
			{ label: "bp", value: "bp" },
			{ label: "data.drug2", value: "data.drug2" },
			{ label: "2.Age", value: "2.Age" },
			{ label: "drug", value: "drug" },
			{ label: "2.drug2", value: "2.drug2" },
			{ label: "drug3", value: "drug3" }
		];
		let actualOptions = selectColumn1.prop("options");
		expect(actualOptions).to.eql(expectedSelectColumn1Options);

		const selectColumn2 = selectColumnControls.at(1);
		expect(selectColumn2.find(".Dropdown-placeholder").text()).to.equal("0.BP");

		let expectedSelectColumn2Options = [
			{ label: "...", value: "" },
			{ label: "Sex", value: "Sex" },
			{ label: "0.BP", value: "0.BP" },
			{ label: "Drug", value: "Drug" },
			{ label: "0.drug2", value: "0.drug2" },
			{ label: "data.Age", value: "data.Age" },
			{ label: "data.BP", value: "data.BP" },
			{ label: "bp", value: "bp" },
			{ label: "data.drug2", value: "data.drug2" },
			{ label: "2.Age", value: "2.Age" },
			{ label: "drug", value: "drug" },
			{ label: "2.drug2", value: "2.drug2" },
			{ label: "drug3", value: "drug3" }
		];
		let actualOptions2 = selectColumn2.prop("options");
		expect(actualOptions2).to.eql(expectedSelectColumn2Options);

		selectColumn1.getNode().setValue("data.drug2", "data.drug2");
		expectedSelectColumn1Options = [
			{ label: "...", value: "" },
			{ label: "0.Age", value: "0.Age" },
			{ label: "Sex", value: "Sex" },
			{ label: "Drug", value: "Drug" },
			{ label: "0.drug2", value: "0.drug2" },
			{ label: "data.Age", value: "data.Age" },
			{ label: "BP", value: "BP" }, // TODO: should this be data.BP?
			{ label: "bp", value: "bp" },
			{ label: "data.drug2", value: "data.drug2" },
			{ label: "2.Age", value: "2.Age" },
			{ label: "drug", value: "drug" },
			{ label: "2.drug2", value: "2.drug2" },
			{ label: "drug3", value: "drug3" }
		];
		actualOptions = selectColumn1.prop("options");
		expect(actualOptions).to.eql(expectedSelectColumn1Options);

		expectedSelectColumn2Options = [
			{ label: "...", value: "" },
			{ label: "0.Age", value: "0.Age" },
			{ label: "Sex", value: "Sex" },
			{ label: "0.BP", value: "0.BP" },
			{ label: "Drug", value: "Drug" },
			{ label: "0.drug2", value: "0.drug2" },
			{ label: "data.Age", value: "data.Age" },
			{ label: "data.BP", value: "data.BP" },
			{ label: "bp", value: "bp" },
			{ label: "2.Age", value: "2.Age" },
			{ label: "drug", value: "drug" },
			{ label: "2.drug2", value: "2.drug2" },
			{ label: "drug3", value: "drug3" }
		];
		actualOptions2 = selectColumn2.prop("options");
		expect(actualOptions2).to.eql(expectedSelectColumn2Options);
	});

	it("should show correct values from selectcolumn and selectcolumns controls with multi schema input", () => {
		const selectColumnControl = panels.at(2).find("Dropdown");
		expect(selectColumnControl).to.have.length(1);
		const selectColumnsTable = panels.at(2).find("#flexible-table-selectcolumns");
		expect(selectColumnsTable).to.have.length(1);

		expect(selectColumnControl.find(".Dropdown-placeholder").text()).to.equal("...");

		const addFieldsButton = selectColumnsTable.find("Button"); // field picker buttons
		expect(addFieldsButton).to.have.length(1);
		addFieldsButton.simulate("click");

		const fieldTable = [
			{ "name": "Age", "schema": "0" },
			{ "name": "Sex", "schema": "0" },
			{ "name": "BP", "schema": "0" },
			{ "name": "Drug", "schema": "0" },
			{ "name": "drug2", "schema": "0" },
			{ "name": "Age", "schema": "data" },
			{ "name": "BP", "schema": "data" },
			{ "name": "bp", "schema": "data" },
			{ "name": "drug2", "schema": "data" },
			{ "name": "Age", "schema": "2" },
			{ "name": "drug", "schema": "2" },
			{ "name": "drug2", "schema": "2" },
			{ "name": "drug3", "schema": "2" }
		];
		let actualOptions = selectColumnControl.prop("options");
		expect(actualOptions.length).to.equal(fieldTable.length + 1); // +1 for "..."

		propertyUtils.fieldPicker([{ "name": "drug2", "schema": "0" }, { "name": "drug2", "schema": "2" }], fieldTable);

		selectColumnControl.getNode().setValue("data.Age", "data.Age");

		actualOptions = selectColumnControl.prop("options");
		expect(actualOptions.length).to.equal(fieldTable.length - 1);

		const expectedOptions = [
			{ label: "...", value: "" },
			{ label: "0.Age", value: "0.Age" },
			{ label: "Sex", value: "Sex" },
			{ label: "0.BP", value: "0.BP" },
			{ label: "Drug", value: "Drug" },
			{ label: "data.Age", value: "data.Age" },
			{ label: "data.BP", value: "data.BP" },
			{ label: "bp", value: "bp" },
			{ label: "drug2", value: "drug2" }, // TODO: should this be "2.drug2"?
			{ label: "2.Age", value: "2.Age" },
			{ label: "drug", value: "drug" },
			{ label: "drug3", value: "drug3" }
		];
		expect(actualOptions).to.eql(expectedOptions);
	});

	it("should show correct values from selectcolumns controls with multi schema input", () => {
		const selectColumnsTable2 = panels.at(3).find("#flexible-table-selectcolumns2");
		expect(selectColumnsTable2).to.have.length(1);
		const selectColumnsTable3 = panels.at(3).find("#flexible-table-selectcolumns3");
		expect(selectColumnsTable3).to.have.length(1);

		const table2Rows = selectColumnsTable2.find(".column-select-table-row");
		expect(table2Rows).to.have.length(3);

		const table2Initial = ["0.Age", "Drug", "2.Age"];
		for (let idx = 0; idx < table2Rows.length; idx++) {
			expect(table2Rows.at(idx).find("td")
				.at(0)
				.text()).to.equal(table2Initial[idx]);
		}
		const addFieldsButton = selectColumnsTable3.find("Button"); // field picker buttons
		expect(addFieldsButton).to.have.length(1);
		addFieldsButton.simulate("click");

		const fieldTable = [
			{ "name": "Sex", "schema": "0" },
			{ "name": "BP", "schema": "0" },
			{ "name": "drug2", "schema": "0" },
			{ "name": "Age", "schema": "data" },
			{ "name": "BP", "schema": "data" },
			{ "name": "bp", "schema": "data" },
			{ "name": "drug2", "schema": "data" },
			{ "name": "drug", "schema": "2" },
			{ "name": "drug2", "schema": "2" },
			{ "name": "drug3", "schema": "2" }
		];
		propertyUtils.fieldPicker([], fieldTable);

	});
});
