var React = require('react');
var AssessmentActions = require('../actions/AssessmentActions');
var AssessmentAPI = require('../api/AssessmentAPI');
var AssessmentView = require('../components/AssessmentView');

var app = document.getElementById('app');

AssessmentAPI.getData().then(function(data){
	AssessmentActions.receiveData(data);
	React.render(React.createElement(AssessmentView), app);
});