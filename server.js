<%
var NOTIFICATION_NAME = "Assessment_Notification";

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
	try {
		var b = OpenDoc(UrlFromDocID(userId)).TopElem.custom_elems.ObtainChildByKey('CodeBoss').value;
	}
	catch(e) { alert(e); return  ''; }
	return b;
}

function getQuery(userId, bossType){
	return XQuery("sql:select distinct collaborator.id, collaborators.fullname,
					collaborator.data.value('(collaborator/custom_elems/custom_elem[name=''rating''])[1]/value','varchar(max)') as rating,
					collaborator.data.value('(collaborator/custom_elems/custom_elem[name=''rating_change''])[1]/value','varchar(max)') as rating_change
					from collaborator
					inner join collaborators on collaborators.id = collaborator.id
					inner join pas on pas.person_id = collaborator.id
					where collaborators.is_dismiss = 0 
					and collaborator.data.exist('collaborator/custom_elems/custom_elem[name = ''"+bossType+"'' and value[1]=''"+userId+"'']') = 1 
					and pas.is_done = 1");
}

function getData(queryObjects){
	var codeBoss = 'CodeBoss';
	var userId = Int(curUserID);

	var bossType = 0;
	var collaborators = [];
	for (f in getQuery(userId, codeBoss)){
		if (f.rating == '' || f.rating == null) continue;
		boss = { id: f.id + '', cols: [ f.fullname + '', f.rating + '', f.rating + '', f.rating_change + '', "", "" ], edit:[3], children:[]};
		for (c in getQuery(f.id, codeBoss)){
			if (c.rating == '' || c.rating == null) continue;
			boss.children.push({ id: c.id + '', cols: [ c.fullname + '', c.rating + '', c.rating + '', c.rating_change + '', "", "" ], edit:[3]});
			bossType = 1;
		}
		collaborators.push(boss);
	}

	return stringifyWT(
	{
		bossType: bossType,
		collaborators: collaborators
	});
}

function saveData(queryObjects){
	var collaborators = eval("t="+queryObjects.Body);
	var errors = [];

	for (col in collaborators) {
		try {
			colCard = OpenDoc(UrlFromDocID(Int(col.id)));
			colCard.TopElem.custom_elems.ObtainChildByKey('rating_change').value = col.cols[3];
			colCard.Save();
		}
		catch(e){ alert(e); errors.push(col.cols[0]); }
		for (ch in col.children){
			try {
				colCard = OpenDoc(UrlFromDocID(Int(ch.id)));
				colCard.TopElem.custom_elems.ObtainChildByKey('rating_change').value = ch.cols[3];
				colCard.Save();
			}
			catch(e){ alert(e); errors.push(ch.cols[0]); }
		}
	}
	
	if (errors.length > 0)
		return errors.join(',');
}

function sendForApprove(queryObjects) {
	var boss = getBoss(curUserID);
	var error = 'Не удалось отправить на подтверждение, т.к. нет прямого руководителя!';
	if (boss == '') return error;
	try {
		tools.create_notification(NOTIFICATION_NAME, OpenDoc(UrlFromDocID(Int(boss))).TopElem.id, '', curUserID);
	}	
	catch(e) { return error; }
}

%>