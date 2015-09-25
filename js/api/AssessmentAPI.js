var Config = require('../config');
var Ajax = require('../utils/Ajax');

module.exports = {

	getData: function() {
		return Ajax.sendRequest(Config.url.createPath({action_name: 'getData', r: Math.floor(Math.random() * (1000 + 1))}));
	},

	saveData: function(data) {
		return Ajax.sendRequest(Config.url.createPath({action_name: 'saveCollaborators', r: Math.floor(Math.random() * (1000  + 1))}), JSON.stringify(data), true, null, "POST");
	},

	sendForApprove: function(data) {
		return Ajax.sendRequest(Config.url.createPath({action_name: 'sendForApprove', r: Math.floor(Math.random() * (1000  + 1))}), JSON.stringify(data), true, null, "POST");
	}
}