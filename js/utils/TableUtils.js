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
	isEditCol: isEditCol
}