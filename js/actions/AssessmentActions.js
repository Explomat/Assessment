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

	saveChanges: function(data, callBack) {
		AssessmentAPI.saveData(data).then(function(_err){
			if (callBack) callBack(_err);
		},
		function(err){
			if (callBack) callBack(err);
		});
	},

	approve: function(){

	},

	sendForApprove: function(){

	}
}

module.exports = AssessmentActions;