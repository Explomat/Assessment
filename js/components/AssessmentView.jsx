var React = require('react');
var AssessmentStore = require('../stores/AssessmentStore');
var AssessmentActions = require('../actions/AssessmentActions');
var TableTreeView = require('./modules/TableTreeView');

function getData() {
	return {
		collaborators: AssessmentStore.getCollaborators(),
		isExpand: false
	};
}

var TopMenu = React.createClass({

	handleExpandAll: function() {
		if (this.props.handleExpandAll){
			this.props.handleExpandAll();
		}
	},

	handleSetSubordinates: function() {
		AssessmentActions.setSubordinates();
	},

	handleSetSubdivision: function(){
		AssessmentActions.setSubdivision();
	},

	render: function() {
		var displayPlus = { display : this.props.isExpand ? "none" : "block" };
		var displayMinus = { display : this.props.isExpand ? "block" : "none" };
		return (
			<div className="clearfix">
				<div className="pull-left">
					<button type="button" className="btn btn-default btn-sm" onClick={this.handleSetSubordinates}>
						<span>Моя команда</span>
					</button>
					<button type="button" className="btn btn-default btn-sm" onClick={this.handleSetSubdivision}>
						<span>Мое подразделение</span>
					</button>
				</div>
				<button title="Раскрыть всех" type="button" style={displayPlus} className="btn btn-default btn-sm pull-right" onClick={this.handleExpandAll}>
					<span className="glyphicon glyphicon-plus"></span>
				</button>
				<button title="Свернуть всех" type="button" style={displayMinus} className="btn btn-default btn-sm pull-right" onClick={this.handleExpandAll}>
					<span className="glyphicon glyphicon-minus"></span>
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

	componentDidMount: function() {
		AssessmentStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AssessmentStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getData());
	},

	getInitialState: function () {
		return getData();
	},

	handleExpandAll: function(){
		this.setState({isExpand: !this.state.isExpand});
	},

	render:function () {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<TopMenu handleExpandAll={this.handleExpandAll} isExpand={this.state.isExpand}/>
				</div>
				<div className="panel-body">	
					<TableTreeView data={this.state.collaborators} isExpand={this.state.isExpand} header={['ФИО', 'Группа Рейтинга', 'Рейтинг сотрудника', 'Рейтинг Калибровок', 'Факт', 'План']}/>
				</div>
			</div>
		);
	}
});

module.exports = AssessmentView;