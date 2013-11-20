var x = 0;
var geat = []
if (!localStorage.geatList) {
    localStorage.geatList = "[]";
}
geat = JSON.parse(localStorage.geatList);
geaAdd = function(){
	var task = document.getElementById('taskgea').value;
    if (task != '') {
        // Add the task to array and refresh list
        geat[geat.length] = task;
        geaRefresh();
        // Clear the input
        document.getElementById('taskgea').value = '';
    }
};
geaRefresh = function(){
	var $tasks = $('#tlgea');
    // Clear the existing task list
    $tasks.empty();
    if (geat.length) {
        for (var i=0;i<geat.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmgea'+i+'" data-goto onclick="x = '+i+'">' + geat[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmgea"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						geat.splice(x,1);
						geaRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.geatList = JSON.stringify(geat || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        geaAdd();
    }
});