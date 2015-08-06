var storage = require('../utils/Storage');

module.exports = {
	init: function () {
		storage.clear();
		storage.setItem('collaborators', [
			{
			  "id": 2,
			  "cols": ["For Sale", 1, 2, 3, "5%", "60%"],
			  "edit": [3],
			  "children": [
			    {
			      "id": 4,
			      "cols": ["Baby & Kids Stuff", 1, 2, 3, "5%", "60%"],
			      "edit": [3]
			    },
			    {
			      "id": 5,
			      "cols": ["Music, Films, Books & Games", 1, 2, 3, "5%", "60%"],
			      "edit": [3]
			    }
			  ]
			},
		    {
		      "id": 6,
		      "cols": ["Motors", 1, 2, 3, "5%", "60%"],
		      "edit": [3],
		      "children": [
		        {
		          "id": 7,
		          "cols": ["Car Parts & Accessories", 1, 2, 3, "5%", "60%"],
		          "edit": [3]
		        },
		        {
		          "id": 8,
		          "cols": ["Cars", 1, 2, 3, "5%", "60%"],
		          "edit": [3]
		        },
		        {
		          "id": 10016,
		          "cols": ["Motorbike Parts & Accessories", 1, 2, 3, "5%", "60%"],
		          "edit": [3]
		        }
		      ]
		    },
		    {
		      "id": 9,
		      "cols": ["Jobs", 1, 2, 3, "5%", "60%"],
		      "edit": [3],
		      "children": [
		        {
		          "id": 10,
		          "cols": ["Accountancy", 1, 2, 3, "5%", "60%"],
		          "edit": [3]
		        },
		        {
		          "id": 11,
		          "cols": ["Financial Services & Insurance", 1, 2, 3, "5%", "60%"],
		          "edit": [3]
		        },
		        {
		          "id": 12,
		          "cols": ["Bar Staff & Management", 1, 2, 3, "5%", "60%"],
		          "edit": [3]
		        }
		      ]
		    }
		]);
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