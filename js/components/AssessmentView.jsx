var React = require('react');
var AssessmentStore = require('../stores/AssessmentStore');
var AssessmentActions = require('../actions/AssessmentActions');
var TableTreeView = require('./modules/TableTreeView');
var TableTreeViewSecond = require('./modules/TableTreeViewSecond');

function getData() {
	return {
		collaborators: AssessmentStore.getCollaborators(),
		subordinates: AssessmentStore.getSubordinates(),
		isSendForApprove: AssessmentStore.isSendApprove()
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
		var displayButton = { display : this.state.isActiveFirstButton ? "none": "block" };
		var displaySubdivision = { display : this.props.bossType == 0 ? "none" : "inline-block" };
		return (
			<div className="clearfix topmenu">
				<div className="pull-left">
					<button type="button" className={firstButton} onClick={this.handleSetSubordinates}>
						<span>Моя команда</span>
					</button>
					<button style={displaySubdivision} type="button" className={secondButton} onClick={this.handleSetSubdivision}>
						<span>Мое подразделение</span>
					</button>
					<span className="label label-info">Норма распределения &nbsp;&nbsp; 4,5 - 20% | 3 - 60% | 1,2 - 20% </span>
				</div>
				<div style={displayButton}>
					<button title="Раскрыть всех" type="button" style={displayPlus} className="btn btn-default btn-sm pull-right" onClick={this.handleExpandAll}>
						<span className="glyphicon glyphicon-plus"></span>
					</button>
					<button title="Свернуть всех" type="button" style={displayMinus} className="btn btn-default btn-sm pull-right" onClick={this.handleExpandAll}>
						<span className="glyphicon glyphicon-minus"></span>
					</button>
				</div>
			</div>
		);
	}
});

var DownMenu = {

	handleSave: function () {
		var data = AssessmentStore.getCollaborators();
		AssessmentActions.saveChanges(data, function() {
			alert("Изменения успешно сохранены!");
		}, function(error){
			alert("Изменения не удалось сохранить : \r\n " + error);
		});
	},

	getBaseMark: function() {
		return (
			<button type="button" className="btn btn-default btn-sm" onClick={this.handleSave}>
				<span>Сохранить изменения</span>
			</button>
		);
	}
}

var DownMenuFirst = React.createClass({

	mixins: [DownMenu],

	handleSendForApprove: function(){
		var data = AssessmentStore.getCollaborators();
		AssessmentActions.sendForApprove(data, function() {
			alert("Уведомление о подтверждении отправлено!");
			AssessmentActions.rejectApprove();
		}, function(error){
			alert("Произошла ошибка : \r\n " + error);
		});
	},

	render: function() {
		return (
			<div className="pull-right">
				{this.getBaseMark()}
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleSendForApprove}>
					<span>Отправить на подтверждение</span>
				</button>
			</div>
		);
	}
});

var DownMenuSecond = React.createClass({

	mixins: [DownMenu],

	handleApprove: function(){
		var data = AssessmentStore.getCollaborators();
		AssessmentActions.approve(data, function() {
			alert("Изменения сохранены и отправлены на подтверждение!");
		}, function(error){
			alert("Произошла ошибка : \r\n " + error);
		});
	},

	render: function() {
		return (
			<div className="pull-right">
				{this.getBaseMark()}
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleApprove}>
					<span>Подтвердить</span>
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
		var data = getData(); 
		data.isExpand = false;
		data.isDisplayFirstTable = true;
		data.isDisplaySecondTable = false;
		data.expandedNodeId = null;
		return data;
	},

	handleSetSubdivision: function(){
		this.setState({isDisplayFirstTable: false, isDisplaySecondTable: true});
	},

	handleSetSubordinates: function(){
		this.setState({isDisplayFirstTable: true, isDisplaySecondTable: false});
	},

	handleExpandAll: function(){
		this.setState({isExpand: !this.state.isExpand, expandedNodeId: null});
	},

	changeTreeValue: function(id, colNumber, val, parentId){
		AssessmentActions.changeValue(id, colNumber, val);
		this.setState({expandedNodeId: parentId});
	},

	render: function () {
		var isDisplayFirstTableStyle = { display : this.state.isDisplayFirstTable ? "block" : "none" };
		var isDisplaySecondTableStyle = { display : this.state.isDisplaySecondTable ? "block" : "none" };
		var isDisplayDownMenuFirst = {  display : this.state.isDisplayFirstTable && !this.state.isSendForApprove ? "block": "none" }
		var bossType = AssessmentStore.getBossType();
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<TopMenu bossType={bossType} handleExpandAll={this.handleExpandAll} isExpand={this.state.isExpand} handleSetSubdivision={this.handleSetSubdivision} handleSetSubordinates={this.handleSetSubordinates}/>
				</div>
				<div className="panel-body">
					<div style={isDisplayFirstTableStyle}>	
						<TableTreeViewSecond data={this.state.subordinates} changeValue={this.changeTreeValue} isExpand={this.state.isExpand} header={['ФИО', 'Группа Рейтинга', 'Рейтинг системы', 'Рейтинг руководителя', 'Рейтинг вышестоящего руководителя', 'Факт распределения', 'Норма распределения']}/>
					</div>
					<div style={isDisplaySecondTableStyle}>
						<TableTreeView data={this.state.collaborators} changeValue={this.changeTreeValue} isExpand={this.state.isExpand} header={['ФИО', 'Группа Рейтинга', 'Рейтинг системы', 'Рейтинг руководителя', 'Рейтинг вышестоящего руководителя', 'Факт распределения', 'Норма распределения']} expandedNodeId={this.state.expandedNodeId}/>
					</div>
				</div>
				<div className="panel-footer clearfix">
					<div style={isDisplayDownMenuFirst}>
						<DownMenuFirst />
					</div>
					<div style={isDisplaySecondTableStyle}>
						<DownMenuSecond />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = AssessmentView;