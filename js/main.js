var React = require('react');
var AssessmentActions = require('./actions/AssessmentActions');
var AssessmentAPI = require('./api/AssessmentAPI');
var AssessmentView = require('./components/AssessmentView');

window.onload = function () {
	var app = document.getElementById('app');

	AssessmentActions.receiveData([
		{
		  "id": 2,
		  "cols": ["Петров Михаил Валерьевич", 2, 2, "", "66", "20"],
		  "edit": [3],
		  "children": [
		    {
		      "id": 4,
		      "cols": ["Иванов Иван Иванович", 2, 2, 1, "50", "20"],
		      "edit": [3]
		    },
		    {
		      "id": 5,
		      "cols": ["Александров Александр Александрович", 2, 2, 2, "50", "20"],
		      "edit": [3]
		    },
		    {
		      "id": 44,
		      "cols": ["Петров Петр Петрович", 2, 2, 2, "50", "20"],
		      "edit": [3]
		    },
		    {
		      "id": 55,
		      "cols": ["Беловоденко Кирилл Вадимович", 2, 2, 4, "16", "20"],
		      "edit": [3]
		    },
		    {
		      "id": 665,
		      "cols": ["Шумнов Сергей Валерьевич", 2, 2, 3, "33", "60"],
		      "edit": [3]
		    },
		    {
		      "id": 776,
		      "cols": ["Умнобородов Михаил Александрович", 5, 5, 5, "33", "20"],
		      "edit": [3]
		    }
		  ]
		},
	    {
	      "id": 6,
	      "cols": ["Иванов Александр Алексеевич", 2, 2, 2, "66", "20"],
	      "edit": [3],
	      "children": [
	        {
	          "id": 7,
	          "cols": ["Чегрин Иван Васильевич", 4, 4, 4, "33", "20"],
	          "edit": [3]
	        },
	        {
	          "id": 8,
	          "cols": ["Мазуренко Сергей Вадимович", 2, 2, 3, "66", "60"],
	          "edit": [3]
	        },
	        {
	          "id": 10016,
	          "cols": ["Жеребцов Андрей Николаевич", 3, 3, 3, "66", "60"],
	          "edit": [3]
	        }
	      ]
	    },
	    {
	      "id": 9,
	      "cols": ["Корольков Алексей Васильевич", 2, 2, 3, "33", "60"],
	      "edit": [3],
	      "children": [
	        {
	          "id": 10,
	          "cols": ["Шешенев Роман Викторович", 2, 2, 3, "66", "60"],
	          "edit": [3]
	        },
	        {
	          "id": 11,
	          "cols": ["Полтавский Артем Витальевич", 1, 1, 1, "33", "20"],
	          "edit": [3]
	        },
	        {
	          "id": 12,
	          "cols": ["Передерий Наталья Владимировна", 2, 2, 3, "66", "60"],
	          "edit": [3]
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
