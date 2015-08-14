var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerConstants = require('../constants/ServerConstants');
var EventEmitter = require('events').EventEmitter;
var AssessmentConstants = require('../constants/AssessmentConstants');
var extend = require('extend-object');
var TableUtils = require('../utils/TableUtils');

var _data = {}, _collaborators = [], _subordinates = [];

function findElem(id, array){
	var stack = [];
	for (var i = array.length - 1; i >= 0; i--) {
		var item = array[i];
		stack.push(item);
		while(stack.length > 0){
			var elem = stack.pop();
			if (elem.id == id) return { elem: elem, parent: item.id == elem.id ? null : item };
			var elems = elem.children || [];

			for (var j = elems.length - 1; j >= 0; j--) {
				stack.push(elem.children[j]);
			};
		}
	};
	return {};
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

function calculatePercents(groups) {
	var firstGroup = groups[0] || [];
	var secondGroup = groups[1] || [];
	var thirdGroup = groups[2] || [];
	var len = firstGroup.length + secondGroup.length + thirdGroup.length;
	var onePercent = 100 / len;

	firstGroup.forEach(function(item){
		item.cols[5] = 20;
		item.cols[4] = onePercent * firstGroup.length;
	});
	secondGroup.forEach(function(item){
		item.cols[5] = 60;
		item.cols[4] = onePercent * secondGroup.length;
	});
	thirdGroup.forEach(function(item){
		item.cols[5] = 20;
		item.cols[4] = onePercent * thirdGroup.length;
	});
}

function changeValue(id, colNumber, val){
	var elemCollab = findElem(id, _collaborators);
	var elemSubord = findElem(id, _subordinates);

	if (elemCollab.elem) {
		for (var i = 0; i < elemCollab.elem.cols.length; i++){
			if (i == colNumber){
				elemCollab.elem.cols[i] = val;
				break;
			}
		}
		var parent = elemCollab.parent || {};
		var groups = TableUtils.group(parent.children || []);
		calculatePercents(groups);
	}
	if (elemSubord.elem) {
		for (var i = 0; i < elemSubord.elem.cols.length; i++){
			if (i == colNumber){
				elemSubord.elem.cols[i] = val;
				break;
			}
		}
		var groups = TableUtils.group(_subordinates);
		calculatePercents(groups);
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
