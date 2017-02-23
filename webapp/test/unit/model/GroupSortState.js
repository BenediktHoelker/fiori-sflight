sap.ui.define([
		"ts/model/GroupSortState",
		"sap/ui/model/json/JSONModel"
	], function (GroupSortState, JSONModel) {
	"use strict";

	QUnit.module("GroupSortState - grouping and sorting", {
		beforeEach: function () {
			this.oModel = new JSONModel({});
			// System under test
			this.oGroupSortState = new GroupSortState(this.oModel, function() {});
		}
	});

	QUnit.test("Should always return a sorter when sorting", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.sort("Paymentsum").length, 1, "The sorting by Paymentsum returned a sorter");
		assert.strictEqual(this.oGroupSortState.sort("Carrid").length, 1, "The sorting by Carrid returned a sorter");
	});

	QUnit.test("Should return a grouper when grouping", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.group("Paymentsum").length, 1, "The group by Paymentsum returned a sorter");
		assert.strictEqual(this.oGroupSortState.group("None").length, 0, "The sorting by None returned no sorter");
	});


	QUnit.test("Should set the sorting to Paymentsum if the user groupes by Paymentsum", function (assert) {
		// Act + Assert
		this.oGroupSortState.group("Paymentsum");
		assert.strictEqual(this.oModel.getProperty("/sortBy"), "Paymentsum", "The sorting is the same as the grouping");
	});

	QUnit.test("Should set the grouping to None if the user sorts by Carrid and there was a grouping before", function (assert) {
		// Arrange
		this.oModel.setProperty("/groupBy", "Paymentsum");

		this.oGroupSortState.sort("Carrid");

		// Assert
		assert.strictEqual(this.oModel.getProperty("/groupBy"), "None", "The grouping got reset");
	});
});