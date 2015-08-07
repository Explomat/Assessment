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
	/*_collaborators = _collaborators.map(function(col){
		delete col['children'];
	});*/

	for (var i = _collaborators.length - 1; i >= 0; i--) {
		delete _collaborators[i]['children'];
	};

	var a = _collaborators;
}

function setSubdivision(){
	_collaborators = _collaborators;
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
		case AssessmentConstants.RECEIVE_SUBORDINATES:
			setSubordinates();
			break;
		case AssessmentConstants.RECEIVE_SUBDIVISION:
			setSubdivision();
			break;
		default:
			return true;
	}

	AssessmentStore.emitChange();
	return true;
});

module.exports = AssessmentStore;
