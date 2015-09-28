var React = require('react');
var AssessmentActions = require('./actions/AssessmentActions');
var AssessmentAPI = require('./api/AssessmentAPI');
var AssessmentView = require('./components/AssessmentView');

window.onload = function () {
	var app = document.getElementById('app');

	AssessmentActions.receiveData({
		subordinates: [
			{
				"id": 4444,
		    	"cols": ["Иванов Иван Иванович", 1, 2, 3, '', 50, 20],
		    	"edit": [3]
			},
			{
				"id": 5555,
			    "cols": ["Александров Александр Александрович", 2, 2, 2, 1, 50, 20],
			    "edit": [3]
			},
			{
				"id": 7777,
			    "cols": ["Петров Петр Петрович", 2, 2, 2, 1, 50, 20],
			    "edit": [3]
			},
			{
				"id": 8888,
			    "cols": ["Умнобородов Михаил Александрович", 5, 5, 5, 1, 33, 20],
			    "edit": [3]
			},
			{
				"id": 9999,
		        "cols": ["Мазуренко Сергей Вадимович", 2, 2, 3, 1, 66, 60],
		        "edit": [3]
			},
			{
				"id": 010101010101,
		        "cols": ["Александров Сергей Вадимович", 2, 2, 3, 1, 66, 60],
		        "edit": [3]
			}
			
		],
		collaborators: [
			{
			  "id": 4444,
			  "cols": ["Иванов Иван Иванович", 2, 2, "", 1, 66, 20],
			  "edit": [3],
			  "children": [
			    {
			      "id": 5,
			      "cols": ["Александров Александр Александрович", 2, 2, 2, 1, 50, 20],
			      "edit": [3]
			    },
			    {
			      "id": 55,
			      "cols": ["Беловоденко Кирилл Вадимович", 2, 2, 4, 1, 16, 20],
			      "edit": [3]
			    },
			    {
			      "id": 665,
			      "cols": ["Шумнов Сергей Валерьевич", 2, 2, 3, 1, 33, 60],
			      "edit": [3]
			    }
			  ]
			},
		    {
		      "id": 5555,
		      "cols": ["Александров Александр Александрович", 2, 2, 2, 1, 66, 20],
		      "edit": [3],
		      "children": [
		        {
		          "id": 7,
		          "cols": ["Чегрин Иван Васильевич", 4, 4, 4, 1, 33, 20],
		          "edit": [3]
		        },
		        {
		          "id": 8,
		          "cols": ["Мазуренко Сергей Вадимович", 2, 2, 3, 1, 66, 60],
		          "edit": [3]
		        },
		        {
		          "id": 10016,
		          "cols": ["Жеребцов Андрей Николаевич", 3, 3, 3, 1, 66, 60],
		          "edit": [3]
		        }
		      ]
		    },
		    {
		      "id": 7777,
		      "cols": ["Петров Петр Петрович", 2, 2, 3, 1, 33, 60],
		      "edit": [3],
		      "children": [
		        {
		          "id": 10,
		          "cols": ["Шешенев Роман Викторович", 2, 2, 3, 1, 66, 60],
		          "edit": [3]
		        },
		        {
		          "id": 11,
		          "cols": ["Полтавский Артем Витальевич", 1, 1, 1, 1, 33, 20],
		          "edit": [3]
		        }
		      ]
		    },
		    {
		      "id": 8888,
		      "cols": ["Умнобородов Михаил Александрович", 2, 2, 3, 1, 33, 60],
		      "edit": [3],
		      "children": [
		        {
		          "id": 110,
		          "cols": ["Шешенев Роман Викторович", 2, 2, 3, 1, 66, 60],
		          "edit": [3]
		        },
		        {
		          "id": 111,
		          "cols": ["Крупенин Артем Витальевич", 1, 1, 1, 1, 33, 20],
		          "edit": [3]
		        },
		        {
		          "id": 112,
		          "cols": ["Передерий Наталья Владимировна", 2, 2, 3, 1, 66, 60],
		          "edit": [3]
		        }
		      ]
		    },
		    {
		      "id": 9999,
		      "cols": ["Мазуренко Сергей Вадимович", 2, 2, 5, 1, 33, 60],
		      "edit": [3],
		      "children": [
		        {
		          "id": 210,
		          "cols": ["Шешенев Роман Викторович", 2, 2, 5, 1, 66, 60],
		          "edit": [3]
		        },
		        {
		          "id": 211,
		          "cols": ["Полтавский Артем Витальевич", 1, 1, 1, 1, 33, 20],
		          "edit": [3]
		        },
		        {
		          "id": 212,
		          "cols": ["Непийвода Наталья Владимировна", 2, 2, 4, 1, 66, 60],
		          "edit": [3]
		        }
		      ]
		    },
		    {
		    	"id": 010101010101,
		    	"cols": ["Александров Сергей Вадимович", 2, 2, 5, 1, 33, 60],
		    	"edit": [3],
		    	"children": [
			    	{
			          "id": 110,
			          "cols": ["Сергеев Роман Викторович", 2, 2, 3, 1, 66, 60],
			          "edit": [3]
			        }
		        ]
		    }
		],
		bossType: 1,
		isSendForApprove: false
	});
	React.render(React.createElement(AssessmentView), app);
	/*AssessmentAPI.getData().then(function(data){
		try {
			AssessmentActions.receiveData(JSON.parse(data));
			React.render(React.createElement(AssessmentView), app);
		}
		catch(e){
			console.log(e);
		}
	});*/
}
