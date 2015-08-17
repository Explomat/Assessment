<%
function stringifyWT(obj) {
	var type = DataType(obj);
	var curObj = obj;
	var outStr = '';

	if (obj == null || obj == undefined) 
		return 'null';
	if (type == 'string' || type == 'integer')
		return '\"' + obj + '\"'  
	if (type == 'bool')
		return obj;

	if (IsArray(obj)) {
		var temp = '';
		for (prop in obj) {
			temp += stringifyWT(prop) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr += '[' + temp +']';
	}
	else {
		var temp = '';
		for (prop in obj) {
			temp += '"' + prop + '":' + stringifyWT(obj[prop]) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr +='{' + temp + '}';
	}
	return outStr;
}

function getBoss(userId) {
	return OpenDoc(UrlFromDocID(userId)).TopElem.custom_elems.ObtainChildByKey('CodeBoss').value;
}

function getFuncBoss(userId){
	return OpenDoc(UrlFromDocID(userId)).TopElem.custom_elems.ObtainChildByKey('CodeBossMain').value;
}

function getQuery(userId, bossType){
	return XQuery("sql:select collaborator.id, collaborators.fullname,
					collaborator.data.value('(collaborator/custom_elems/custom_elem[name=''rating''])[1]/value','varchar(max)') as raiting
					from collaborator
					inner join collaborators on collaborators.id = collaborator.id
					where collaborators.is_dismiss = 0 
					and collaborator.data.exist('collaborator/custom_elems/custom_elem[name = ''"+bossType+"'' and value[1]=''"+userId+"'']') = 1");
}

function getData(){
	var codeBossMain = 'CodeBossMain';
	var codeBoss = 'CodeBoss';
	var boss = getBoss(curUserID);
	var funcBoss = getFuncBoss(curUserID);
	if (boss == '' || funcBoss == '') {
		return;
	}
	var data = [];

	for (f in getQuery(curUserID, codeBossMain)){
		funcBoss = {};
		for (c in getQuery(f.id, codeBoss)){

		}
	}
}

function saveData(){

}

%>