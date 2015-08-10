var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerConstants = require('../constants/ServerConstants');
var EventEmitter = require('events').EventEmitter;
var AssessmentConstants = require('../constants/AssessmentConstants');
var extend = require('extend-object');

var _data = {}, _collaborators = [], _subordinates = [];

function findElem(id, array){
	var stack = [];
	array.forEach(function(item){
		stack.push(item);
	})

	while(stack.length > 0){
		var elem = stack.pop();
		if (elem.id == id) return elem;
		elem.children = elem.children || [];

		for (var i = elem.children.length - 1; i >= 0; i--) {
			if (elem.id == id) return elem;
			stack.push(elem.children[i]);
		};
	}
	return null;
}

function loadAssessmentData(data) {
	_data = data;
	_collaborators = data;
	var temp = JSON.parse(JSON.stringify(_collaborators));
	temp.forEach(function(s){
		delete s['children'];
	})
	_subordinates = temp;
	//_collaborators = data.collaborators;
}

function changeValue(id, colNumber, val){
	var elemCollab = findElem(id, _collaborators);
	var elemSubord = findElem(id, _subordinates);

	if (elemCollab) {
		for (var i = 0; i < elemCollab.cols.length; i++){
			if (i == colNumber){
				elemCollab.cols[i] = val;
				break;
			}
		}
	}
	if (elemSubord) {
		for (var i = 0; i < elemSubord.cols.length; i++){
			if (i == colNumber){
				elemSubord.cols[i] = val;
				break;
			}
		}
	}
}

var AssessmentStore = extend({}, EventEmitter.prototype, {

	getCollaborators: function(){
		return _collaborators;
	},

	getSubordinates: function () {
		return _subordinates;
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
		case AssessmentConstants.CHANGE_COL_VALUE:
			changeValue(action.id, action.colNumber, action.value);
			break;
		default:
			return true;
	}

	AssessmentStore.emitChange();
	return true;
});

module.exports = AssessmentStore;
