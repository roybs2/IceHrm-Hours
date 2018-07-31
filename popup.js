$(function(){

	$(document).ready(function(){
		var currentTime = new Date()
		currentTime.setDate(currentTime.getDate() - currentTime.getDay());
		var month = currentTime.getMonth() + 1;
		if (month < 10) { month = '0' + month; }
		var day = currentTime.getDate();
		if (day < 10) { day = '0' + day; }
		var year = currentTime.getFullYear();
		date = year + "-" + month + "-" + day;

		$("#weekDate").attr("value", date);
	});
	
    date = $('#weekDate').val();
	numberOfDays = $('#numOfDays').val();
	$("#weekDate").on("change paste keyup", function() {
		date = $(this).val(); 
	});
	$("#numOfDays").on("change paste keyup", function() {
		numberOfDays = $(this).val(); 
	});

	$('#fill').click(function(){      
		chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {todo: "fillDate", FillDate: date, NumberOfDays: numberOfDays });
	});
	});
	$('#submitTimeSheet').click(function(){      
		chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {todo: "submitTimeSheet" });
		});
	});
	$('#resetTimeSheet').click(function(){      
		chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {todo: "resetTimeSheet" });
		});
   });
});

