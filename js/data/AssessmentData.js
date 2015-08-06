var storage = require('../utils/Storage');

module.exports = {
	init: function () {
		storage.clear();
		storage.setItem('collaborators', [{
			"id": 1,
			"name": "All Categories",
			"cols": [1, 2, 3, "5%", "60%"],
			"edit": false,
			"children": [
				{
				  "id": 2,
				  "name": "For Sale",
				  "cols": [1, 2, 3, "5%", "60%"],
				  "edit": false,
				  "children": [
				    {
				      "id": 4,
				      "name": "Baby & Kids Stuff",
				      "cols": [1, 2, 3, "5%", "60%"],
				      "edit": false,
				    },
				    {
				      "id": 5,
				      "name": "Music, Films, Books & Games",
				      "cols": [1, 2, 3, "5%", "60%"],
				      "edit": false,
				    }
				  ]
				},
			    {
			      "id": 6,
			      "name": "Motors",
			      "cols": [1, 2, 3, "5%", "60%"],
			      "edit": false,
			      "children": [
			        {
			          "id": 7,
			          "name": "Car Parts & Accessories",
			          "cols": [1, 2, 3, "5%", "60%"],
			          "edit": false,
			        },
			        {
			          "id": 8,
			          "name": "Cars",
			          "cols": [1, 2, 3, "5%", "60%"],
			          "edit": false,
			        },
			        {
			          "id": 10016,
			          "name": "Motorbike Parts & Accessories",
			          "cols": [1, 2, 3, "5%", "60%"],
			          "edit": false,
			        }
			      ]
			    },
			    {
			      "id": 9,
			      "name": "Jobs",
			      "cols": [1, 2, 3, "5%", "60%"],
			      "edit": false,
			      "children": [
			        {
			          "id": 10,
			          "name": "Accountancy",
			          "cols": [1, 2, 3, "5%", "60%"],
			          "edit": false,
			        },
			        {
			          "id": 11,
			          "name": "Financial Services & Insurance",
			          "cols": [1, 2, 3, "5%", "60%"],
			          "edit": false,
			        },
			        {
			          "id": 12,
			          "name": "Bar Staff & Management",
			          "cols": [1, 2, 3, "5%", "60%"],
			          "edit": false,
			        }
			      ]
			    }
			]
		}]);
	}
}

/*module.exports = {
	init: function () {
		storage.clear();
		storage.setItem('question', {
			title: 'Temp',
			text: 'What\'s the Fuck?',
			type: 'match_item',
			img: null,
			answers: [
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d2',
					text: 'Test',
					weight: 1,
					height: 20,
					width: 1,
					img: null,
					conditions: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2re',
							text: '1',
							condition: 'equal'
						}
					],
					conditionsText: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2r',
							text: 'condition0',
							condition: 'equal'
						}
					],
					conformities: [
						{
							uuid: 'b6363c6e',
							text: ''
						}
					]
				},
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d1',
					text: 'Test1',
					weight: 2,
					height: 20,
					width: 1,
					img: {
						name:'blue.png',
						id:'6166916040804028637',
						error: null
					},
					conditions: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2s',
							text: '2',
							condition: 'moreOrEqual'
						},

						{
							uuid: 'b6363c6e-0c11-41b5-ac2a',
							text: 'condition3',
							condition: 'lessOrEqual'
						}
					],
					conditionsText: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2',
							text: 'condition2',
							condition: 'equal'
						},

						{
							uuid: 'b6363c6e-0c11-41b5-ac',
							text: 'condition3',
							condition: 'contains'
						}
					],

					conformities: [
						{
							uuid: 'b6363c6',
							text: ''
						},
						{
							uuid: 'b6363c5',
							text: ''
						},
					]
				}
			]
		});
	}
};*/