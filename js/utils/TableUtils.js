function group(array){
	var firstGroup = [1, 2];
	var secondGroup = [3];
	var thirdGroup = [4,5];
	var groups = [];
	array.forEach(function (item) {
		var val = parseInt(item.cols[3]);
		val = val || parseInt(item.cols[2]);
		if (!val) return null;
		if (firstGroup.indexOf(val) !== -1){
			groups[2] = groups[2] || [];
			groups[2].push(item);
		}
		else if (secondGroup.indexOf(val) !== -1){
			groups[1] = groups[1] || [];
			groups[1].push(item);
		}
		else if(thirdGroup.indexOf(val) !== -1){
			groups[0] = groups[0] || [];
			groups[0].push(item);
		}
	});
	return groups;
}

function calculatePercents(groups) {
	var firstGroup = groups[0] || [];
	var secondGroup = groups[1] || [];
	var thirdGroup = groups[2] || [];
	var len = firstGroup.length + secondGroup.length + thirdGroup.length;
	var onePercent = 100 / len;

	firstGroup.forEach(function(item){
		item.cols[5] = 20;
		item.cols[4] = onePercent * firstGroup.length;
	});
	secondGroup.forEach(function(item){
		item.cols[5] = 60;
		item.cols[4] = onePercent * secondGroup.length;
	});
	thirdGroup.forEach(function(item){
		item.cols[5] = 20;
		item.cols[4] = onePercent * thirdGroup.length;
	});
}


function isEditCol(arrayEdit, index){
	var isEdit = false;
	arrayEdit.forEach(function(item){
		if (item == index)
			isEdit = true;
	});
	return isEdit;
}

module.exports = {
	group: group,
	isEditCol: isEditCol,
	calculatePercents: calculatePercents
}