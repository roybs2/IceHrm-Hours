
var Run = (startDate, daysToRun = 5, startHour = '09:00:00', finshHour = '18:00:00') => {
	dateBuilder = (sDate, i) => {
	const dateArr = (sDate + '').split('-');
	let day = parseInt(dateArr[2]);
	day = day+i;
	if (day < 10) {
	day = "0" + day;
	}
	dateArr.pop(2);
	dateArr.push(day);
	 
	return dateArr.join("-");
	};
	 
	for (let i=0; i < daysToRun; i++) {
		var startNumber = Math.floor(Math.random() * (12 - 7 + 1)) + 7;
		startHour = RandomHours(startNumber);
		finshHour = RandomHours(startNumber + 9);
		
		$("#add_time_sheet_entry").click();
		$("#date_select").val(this.dateBuilder(startDate, i));
		$(".datetimeInput")[0].value = startHour;
		$(".datetimeInput")[1].value = finshHour;
		$(".saveBtn").click();
	}
};


var SubmitTimeSheetFunc = () => {
	$("#submit_sheet").click();
};

var ResetTimeSheet = () => {
	console.log("reset1");
	var sheets = $(".timesheet_entries_table_body").children();
	console.log(sheets);
	for (let i=0; i < sheets.length; i++) {
		var sheet = sheets[i].getElementsByClassName("tableActionButton")[0];
		sheet.click();
		console.log(sheet);

	}
}

var RandomHours = (randomHour) => {	
	console.log(randomHour);
	var date = new Date(null);
	var tzoffset = (date).getTimezoneOffset() * 60000; //get time zone offset
	date.setHours(randomHour);
	return new Date(date-tzoffset).toISOString().substr(11, 8);
};

chrome.runtime.sendMessage({todo: "showPageAction"});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "fillDate"){  
		 Run(request.FillDate, request.NumberOfDays);
    }
	if (request.todo == "submitTimeSheet"){  
		SubmitTimeSheetFunc();
    }
	if (request.todo == "resetTimeSheet"){  
		console.log("reset");
		ResetTimeSheet();
    }
});