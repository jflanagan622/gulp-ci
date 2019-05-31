//var FileSaver = require('file-saver');

function setDateFormat(){
	
	jQuery.datetimepicker.setDateFormatter({
		parseDate: function (date, format) {
			var d = moment(date, format);
			return d.isValid() ? d.toDate() : false;				
		},
		formatDate: function (date, format) {
			return moment(date).format(format);
		}
	}); 
}

$("#sign-up").on("click", function() {
	window.location.href = "/signup";
});

$("#schedules").on("click", function() {
	window.location.href = "/schedules";
});
				
$("#teams").on("click", function() {
	window.location.href = "/teams";
}); 