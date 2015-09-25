var AppDispatcher = require('../dispatcher/AppDispatcher');
var AssessmentConstants = require('../constants/AssessmentConstants');
var ServerConstants = require('../constants/ServerConstants');
var AssessmentAPI = require('../api/AssessmentAPI');

var AssessmentActions = {

	receiveData: function(data) {
		AppDispatcher.handleData({
			actionType: ServerConstants.RECEIVE_DATA,
			data: data
		});
	},

	changeValue: function(id, colNumber, val) {
		AppDispatcher.handleAction({
			actionType: AssessmentConstants.CHANGE_COL_VALUE,
			id: id,
			colNumber: colNumber,
			value: val
		});
	},

	saveChanges: function(data, resolve, reject) {
		AssessmentAPI.saveData(data).then(function(_err){
			if (reject && _err) reject(_err);
			else if (resolve) resolve();
		},
		function(err){
			if (reject) reject(err);
		});
	},

	rejectApprove: function(){
		AppDispatcher.handleAction({
			actionType: AssessmentConstants.REJECT_APPROVE
		});
	},

	sendForApprove: function(data, resolve, reject){
		AssessmentAPI.sendForApprove(data).then(function(_err){
			if (reject && _err) reject(_err);
			else if (resolve) resolve();
		},
		function(err){
			if (reject) reject(err);
		});
	}
}

module.exports = AssessmentActions;