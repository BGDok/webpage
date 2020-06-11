
function objectifyForm(formSelector) {
	var returnArray = {};
	var dotCount = getFieldsLength(formSelector);
	var formArray = $(formSelector).serializeArray();
	for (var i = 0; i < formArray.length; i++){
		if (typeof formArray[i]['value'] !== 'undefined' && formArray[i]['value'].trim().length > 0){
			returnArray[formArray[i]['name']] = formArray[i]['value'];
		} else {
			returnArray[formArray[i]['name']] = Array(dotCount.get(formArray[i]['name'])).join(".");
		}

	}
	return returnArray;
}

function clearGroupInputs(formSelector){
	$(formSelector+' :input').each(function(){
		$(this).val("");
	});
}

function getFieldsLength(formSelector){
	var maxLength;
	var lengthMap = new Map();
	$(formSelector+' :input').each(function(){
		if($(this).attr('maxLength') != undefined){
			maxLength = parseInt($(this).attr('maxLength'));
			//if the field contains numbers we have to leave double the space
			if($(this).attr('pattern') && $(this).attr('pattern').includes("[0-9]")){
				lengthMap.set($(this).attr('name'), Math.floor(maxLength * 2)); 
			//if the field is text area we leave tripple the space
		} else if($(this).is('textarea')){
			lengthMap.set($(this).attr('name'), Math.floor(maxLength) * 3);
		} else {
			lengthMap.set($(this).attr('name'), Math.floor(maxLength * 0.5)); 
		}
	}	else {  
		lengthMap.set($(this).attr('name'), 20);
	}	
});

	return lengthMap;

}

function makePDF(docDefinition,fileName, option='download') {
	docDefinition["pageSize"] = 'A4';
	docDefinition["pageMargins"] = [ 40, 60, 40, 60 ];
	docDefinition["defaultStyle"] = {fontSize: 10, lineHeight:1.1};
	//docDefinition["lineHeight"] = 2;
	docDefinition["styles"] = {
		header: {
			fontSize: 18,
			bold: true,
			alignment: "center"
		},
		subheader: {
			fontSize: 15,
			bold: true
		},
		quote: {
			italics: true,
		},
		hint:{
			italics: true,
			alignment: "center",
			fontSize: 9
		},
		small: {
			fontSize: 8
		},
		title:{
			alignment: "center"
		},
		left:{
			alignment: "left"
		},
		right:{
			alignment: "right"
		}
	};
	return pdfMake.createPdf(docDefinition).download(fileName);
}

var group = 1;
function cloneGroup(copyFrom,appendTo) {

	group++;
	var objTo = $('#'+appendTo);
	var divtest = document.createElement("div");
	divtest.setAttribute("class", "form-row border rounded removeclass_"+group);
	var rdiv = 'removeclass_'+group;
	var allInputs = '';
	$('#'+copyFrom).each(function(){
		allInputs = allInputs + $(this).html();
	});
	divtest.innerHTML = '<div class="col-md-1"><button class="btn-lg btn-danger" type="button" onclick="removeGroup('+ group +');"> <span class="fas fa-times" aria-hidden="true"></span> </button></div>' + allInputs;
	objTo.append(divtest)
}
function removeGroup(rid) {
	$('.removeclass_'+rid).remove();
}
