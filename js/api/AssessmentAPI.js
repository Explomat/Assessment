var Config = require('../config');
var Ajax = require('../utils/Ajax');

function getRandomNumber(){
	return Math.floor(Math.random() * (1000 + 1));
}

module.exports = {

	getData: function() {
		return Ajax.sendRequest(Config.url.createPath({action_name: 'getData', r: getRandomNumber()}));
	},

	saveData: function(data) {
		return Ajax.sendRequest(Config.url.createPath({action_name: 'saveCollaborators', r: getRandomNumber()}), JSON.stringify(data), true, null, "POST");
	},

	approve: function (data) {
		return Ajax.sendRequest(Config.url.createPath({action_name: 'createApprove', r: getRandomNumber()}), JSON.stringify(data), true, null, "POST");
	},

	sendForApprove: function(data) {
		return Ajax.sendRequest(Config.url.createPath({action_name: 'sendForApprove', r: getRandomNumber()}), JSON.stringify(data), true, null, "POST");
	}
}