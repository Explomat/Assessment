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

	saveChanges: function(data) {
		AssessmentAPI.saveData(data).then(function(data){
			if (!data){
				AppDispatcher.handleData({
					actionType: ServerConstants.DATA_SAVED
				});
			}
			else{
				AppDispatcher.handleData({
					actionType: ServerConstants.DATA_ERROR_SAVED,
					error: err
				});
			}
		},
		function(err){
			AppDispatcher.handleData({
				actionType: ServerConstants.DATA_ERROR_SAVED,
				error: err
			});
		});
	},

	setDefaultSaved: function(){
		setTimeout(function(){
			AppDispatcher.handleAction({
				actionType: AssessmentConstants.SET_DEFAULT_SAVED
			});
		}, 1);
	},

	approve: function(){

	},

	sendForApprove: function(){

	}
}

module.exports = AssessmentActions;