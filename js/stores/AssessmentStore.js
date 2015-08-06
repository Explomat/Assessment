var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerConstants = require('../constants/ServerConstants');
var EventEmitter = require('events').EventEmitter;
var AssessmentConstants = require('../constants/AssessmentConstants');
var extend = require('extend-object');

var _data = {}, _collaborators = [];

function loadAssessmentData(data) {
	_collaborators = data;
	//_collaborators = data.collaborators;
}

function setSubordinates(){
	//_collaborators = data.subordinates;
}

function setSubdivision(){
	//_collaborators = data.subdivision;
}

var AssessmentStore = extend({}, EventEmitter.prototype, {

	getCollaborators: function(){
		return _collaborators;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callBack) {
		this.on('change', callBack);
	},

	removeChangeListener: function(callBack) {
		this.removeListener('change', callBack);
	}
});

AssessmentStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case ServerConstants.RECEIVE_DATA:
			loadAssessmentData(action.data);
			break;
		case ServerConstants.RECEIVE_SUBORDINATES:
			setSubordinates();
			break;
		case ServerConstants.RECEIVE_SUBDIVISION:
			setSubdivision();
			break;
		default:
			return true;
	}

	AssessmentStore.emitChange();
	return true;
});

module.exports = AssessmentStore;
