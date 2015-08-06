var AppDispatcher = require('../dispatcher/AppDispatcher');
var AssessmentConstants = require('../constants/AssessmentConstants');
var ServerConstants = require('../constants/ServerConstants');
var AssessmentAPI = require('../api/AssessmentAPI');

var AssessmentActions = {

	receiveData: function(data) {
		try {
			AppDispatcher.handleData({
				actionType: ServerConstants.RECEIVE_DATA,
				data: data
			});
		}
		catch(e){
			log(e);
		}
	},

	setSubordinates: function() {
		AppDispatcher.handleData({
			actionType: AssessmentConstants.RECEIVE_SUBORDINATES
		});
	},

	setSubdivision: function() {
		AppDispatcher.handleData({
			actionType: AssessmentConstants.RECEIVE_SUBDIVISION
		});
	},

	saveChanges: function(data) {
		AssessmentAPI.saveData().then(function(){
			AppDispatcher.handleData({
				actionType: ServerConstants.DATA_SAVED
			});
		},
		function(err){
			AppDispatcher.handleData({
				actionType: ServerConstants.DATA_ERROR_SAVED,
				error: err
			});
		});
	},

	approve: function(){

	},

	sendForApprove: function(){

	}
}

module.exports = AssessmentActions;