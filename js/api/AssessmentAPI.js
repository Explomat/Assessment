var Config = require('../config');
var Ajax = require('../utils/Ajax');

module.exports = {

	getData: function() {
		return Ajax.sendRequest(Config.url.createPath({action_name: 'getData'}));
	},

	saveData: function(data) {
		return Ajax.sendRequest(Config.url.createPath({action_name: 'saveData'}), JSON.stringify(data), true, null, "POST");
	}
}