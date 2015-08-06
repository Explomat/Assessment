var React = require('react');
var AssessmentActions = require('./actions/AssessmentActions');
var AssessmentAPI = require('./api/AssessmentAPI');
var AssessmentView = require('./components/AssessmentView');

window.onload = function () {
	var app = document.getElementById('app');

	/*AssessmentActions.receiveData([{
		"id": 1,
		"name": "All Categories",
		"cols": [1, 2, 3, "5%", "60%"],
		"children": [
			{
			  "id": 2,
			  "name": "For Sale",
			  "cols": [1, 2, 3, "5%", "60%"],
			  "children": [
			    {
			      "id": 4,
			      "name": "Baby & Kids Stuff",
			      "cols": [1, 2, 3, "5%", "60%"],
			    },
			    {
			      "id": 5,
			      "name": "Music, Films, Books & Games",
			      "cols": [1, 2, 3, "5%", "60%"],
			    }
			  ]
			},
		    {
		      "id": 9,
		      "name": "Jobs",
		      "cols": [1, 2, 3, "5%", "60%"],
		      "children": [
		        {
		          "id": 10,
		          "name": "Accountancy",
		          "cols": [1, 2, 3, "5%", "60%"],
		        },
		        {
		          "id": 11,
		          "name": "Financial Services & Insurance",
		          "cols": [1, 2, 3, "5%", "60%"],
		        },
		        {
		          "id": 12,
		          "name": "Bar Staff & Management",
		          "cols": [1, 2, 3, "5%", "60%"],
		        }
		      ]
		    }
		]
	},
	{
		"id": 123321,
		"name": "TESTS",
		"cols": [1, 2, 3, "5%", "60%"],
		"children": [
			{
				"id": 53464376437,
				"name": "For Sale",
				"cols": [1, 2, 3, "5%", "60%"]
			}
		]
	}]);
	React.render(React.createElement(AssessmentView), app);*/

	AssessmentAPI.getData().then(function(data){
		AssessmentActions.receiveData(data);
		React.render(React.createElement(AssessmentView), app);
	});
}
