var React = require('react/addons');
var AssessmentStore = require('../stores/AssessmentStore');
var AssessmentActions = require('../actions/AssessmentActions');
var TableTreeView = require('./modules/TableTreeView');

function getData() {
	return {
		collaborators: AssessmentStore.getCollaborators(),
		subordinates: AssessmentStore.getSubordinates(),
		isExpand: false,
		isDisplayFirstTable: true,
		isDisplaySecondTable: false
	};
}

var TopMenu = React.createClass({

	handleExpandAll: function() {
		if (this.props.handleExpandAll){
			this.props.handleExpandAll();
		}
	},

	handleSetSubordinates: function() {
		this.setFirstButton();
		if (this.props.handleSetSubordinates){
			this.props.handleSetSubordinates();
		}
	},

	handleSetSubdivision: function(){
		this.setSecondButton();
		if (this.props.handleSetSubdivision){
			this.props.handleSetSubdivision();
		}
	},

	setFirstButton: function(){
		this.setState({isActiveFirstButton: true, isActiveSecondButton: false});
	},

	setSecondButton: function(){
		this.setState({isActiveSecondButton: true, isActiveFirstButton: false});
	},		

	getInitialState: function(){
		return {
			isActiveFirstButton: true,
			isActiveSecondButton: false
		}
	},

	render: function() {
		var firstButton = this.state.isActiveFirstButton ? "btn btn-primary btn-sm" : "btn btn-default btn-sm";
		var secondButton = this.state.isActiveSecondButton ? "btn btn-primary btn-sm" : "btn btn-default btn-sm";

		var displayPlus = { display : this.props.isExpand ? "none" : "block" };
		var displayMinus = { display : this.props.isExpand ? "block" : "none" };
		return (
			<div className="clearfix topmenu">
				<div className="pull-left">
					<button type="button" className={firstButton} onClick={this.handleSetSubordinates}>
						<span>Моя команда</span>
					</button>
					<button type="button" className={secondButton} onClick={this.handleSetSubdivision}>
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

	handleSetSubdivision: function(){
		this.setState({isDisplayFirstTable: false, isDisplaySecondTable: true});
	},

	handleSetSubordinates: function(){
		this.setState({isDisplayFirstTable: true, isDisplaySecondTable: false});
	},

	handleExpandAll: function(){
		this.setState({isExpand: !this.state.isExpand});
	},

	render:function () {
		var isDisplayFirstTableStyle = { display : this.state.isDisplayFirstTable ? "block" : "none" };
		var isDisplaySecondTableStyle = { display : this.state.isDisplaySecondTable ? "block" : "none" };

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<TopMenu handleExpandAll={this.handleExpandAll} isExpand={this.state.isExpand} handleSetSubdivision={this.handleSetSubdivision} handleSetSubordinates={this.handleSetSubordinates}/>
				</div>
				<div className="panel-body">
					<div style={isDisplayFirstTableStyle}>	
						<TableTreeView data={this.state.subordinates} isExpand={this.state.isExpand} header={['ФИО', 'Группа Рейтинга', 'Рейтинг сотрудника', 'Рейтинг Калибровок', 'Факт', 'План']}/>
					</div>
					<div style={isDisplaySecondTableStyle}>
						<TableTreeView data={this.state.collaborators} isExpand={this.state.isExpand} header={['ФИО', 'Группа Рейтинга', 'Рейтинг сотрудника', 'Рейтинг Калибровок', 'Факт', 'План']}/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = AssessmentView;