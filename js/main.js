var React = require('react');
var AssessmentActions = require('./actions/AssessmentActions');
var AssessmentAPI = require('./api/AssessmentAPI');
var AssessmentView = require('./components/AssessmentView');

window.onload = function () {
	var app = document.getElementById('app');

	AssessmentActions.receiveData([
			{
			  "id": 2,
			  "cols": ["Петров Михаил Валерьевич", 1, 2, "", "28%", "5%"],
			  "edit": [3],
			  "children": [
			    {
			      "id": 4,
			      "cols": ["Иванов Иван Иванович", 1, 2, 1, "28%", "5%"],
			      "edit": []
			    },
			    {
			      "id": 5,
			      "cols": ["Александров Александр Александрович", 1, 2, 2, "28%", "5%"],
			      "edit": []
			    },
			    {
			      "id": 44,
			      "cols": ["Петров Петр Петрович", 1, 2, 3, "28%", "5%"],
			      "edit": []
			    },
			    {
			      "id": 55,
			      "cols": ["Беловоденко Кирилл Вадимович", 1, 2, 4, "28%", "5%"],
			      "edit": []
			    },
			    {
			      "id": 665,
			      "cols": ["Шумнов Сергей Валерьевич", 1, 2, 3, "28%", "5%"],
			      "edit": []
			    },
			    {
			      "id": 776,
			      "cols": ["Умнобородов Михаил Александрович", 1, 2, 5, "28%", "5%"],
			      "edit": []
			    }
			  ]
			},
		    {
		      "id": 6,
		      "cols": ["Иванов Александр Алексеевич", 1, 2, 3, "57%", "60%"],
		      "edit": [3],
		      "children": [
		        {
		          "id": 7,
		          "cols": ["Чегрин Иван Васильевич", 1, 2, 3, "57%", "60%"],
		          "edit": []
		        },
		        {
		          "id": 8,
		          "cols": ["Мазуренко Сергей Вадимович", 1, 2, 3, "57%", "60%"],
		          "edit": []
		        },
		        {
		          "id": 10016,
		          "cols": ["Жеребцов Андрей Николаевич", 1, 2, 3, "57%", "60%"],
		          "edit": []
		        }
		      ]
		    },
		    {
		      "id": 9,
		      "cols": ["Корольков Алексей Васильевич", 1, 2, 3, "14%", "35%"],
		      "edit": [3],
		      "children": [
		        {
		          "id": 10,
		          "cols": ["Шешенев Роман Викторович", 1, 2, 3, "14%", "35%"],
		          "edit": []
		        },
		        {
		          "id": 11,
		          "cols": ["Полтавский Артем Витальевич", 1, 2, 3, "14%", "35%"],
		          "edit": []
		        },
		        {
		          "id": 12,
		          "cols": ["Передерий Наталья Владимировна", 1, 2, 3, "14%", "35%"],
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
