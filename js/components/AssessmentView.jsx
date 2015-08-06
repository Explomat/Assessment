var React = require('react');
var AssessmentStore = require('../stores/AssessmentStore');
var AssessmentActions = require('../actions/AssessmentActions');
var TableTreeView = require('./modules/TableTreeView');

function getData() {
	return {
		collaborators: AssessmentStore.getCollaborators()
	};
}

var TopMenu = React.createClass({

	handleSetSubordinates: function() {
		AssessmentActions.setSubordinates();
	},

	handleSetSubdivision: function(){
		AssessmentActions.setSubdivision();
	},

	render: function() {
		return (
			<div className="pull-left">
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleSetSubordinates}>
					<span>Моя команда</span>
				</button>
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleSetSubdivision}>
					<span>Мое подразделение</span>
				</button>
			</div>
		);
	}
});

var DownMenuFirst = React.createClass({

	handleSaveChanges: function() {
		var data = AssessmentStore.getData();
		AssessmentActions.saveChanges(data);
	},

	handleApprove: function(){
		AssessmentActions.approve();
	},

	render: function() {
		return (
			<div className="pull-right">
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleSaveChanges}>
					<span>Сохранить изменения</span>
				</button>
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleApprove}>
					<span>Подтвердить</span>
				</button>
			</div>
		);
	}
});

var DownMenuSecond = React.createClass({

	handleSaveChanges: function() {
		var data = AssessmentStore.getData();
		AssessmentActions.saveChanges(data);
	},

	handleSendForApprove: function(){
		AssessmentActions.sendForApprove();
	},

	render: function() {
		return (
			<div className="pull-right">
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleSaveChanges}>
					<span>Сохранить изменения</span>
				</button>
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleSendForApprove}>
					<span>Отправить на подтверждение</span>
				</button>
			</div>
		);
	}
});

var AssessmentView = React.createClass({

	componentDidMount:function() {
		AssessmentStore.addChangeListener(this._onChange);
	},

	componentWillUnmount:function() {
		AssessmentStore.removeChangeListener(this._onChange);
	},

	_onChange:function() {
		this.setState(getData());
	},

	getInitialState: function () {
		return getData();
	},

	render:function () {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
				</div>
				<div className="panel-body">	
					<TableTreeView data={this.state.collaborators} isExpand={false}/>
				</div>
			</div>
		);
	}
});

module.exports = AssessmentView;