var React = require('react');
var AssessmentActions = require('./actions/AssessmentActions');
var AssessmentAPI = require('./api/AssessmentAPI');
var AssessmentView = require('./components/AssessmentView');

window.onload = function () {
	var app = document.getElementById('app');

	AssessmentActions.receiveData([
			{
			  "id": 2,
			  "cols": ["For Sale", 1, 2, 3, "28%", "5%"],
			  "edit": [3],
			  "children": [
			    {
			      "id": 4,
			      "cols": ["Baby & Kids Stuff", 1, 2, 3, "28%", "5%"],
			      "edit": []
			    },
			    {
			      "id": 5,
			      "cols": ["Music, Films, Books & Games", 1, 2, 3, "28%", "5%"],
			      "edit": []
			    }
			  ]
			},
		    {
		      "id": 6,
		      "cols": ["Motors", 1, 2, 3, "57%", "60%"],
		      "edit": [3],
		      "children": [
		        {
		          "id": 7,
		          "cols": ["Car Parts & Accessories", 1, 2, 3, "57%", "60%"],
		          "edit": []
		        },
		        {
		          "id": 8,
		          "cols": ["Cars", 1, 2, 3, "57%", "60%"],
		          "edit": []
		        },
		        {
		          "id": 10016,
		          "cols": ["Motorbike Parts & Accessories", 1, 2, 3, "57%", "60%"],
		          "edit": []
		        }
		      ]
		    },
		    {
		      "id": 9,
		      "cols": ["Jobs", 1, 2, 3, "14%", "35%"],
		      "edit": [3],
		      "children": [
		        {
		          "id": 10,
		          "cols": ["Accountancy", 1, 2, 3, "14%", "35%"],
		          "edit": []
		        },
		        {
		          "id": 11,
		          "cols": ["Financial Services & Insurance", 1, 2, 3, "14%", "35%"],
		          "edit": []
		        },
		        {
		          "id": 12,
		          "cols": ["Bar Staff & Management", 1, 2, 3, "14%", "35%"],
		          "edit": []
		        }
		      ]
		    }
		]);
	React.render(React.createElement(AssessmentView), app);

	/*AssessmentAPI.getData().then(function(data){
		AssessmentActions.receiveData(data);
		React.render(React.createElement(AssessmentView), app);
	});*/
}
