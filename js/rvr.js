var x = 0;
var rvrt = []
if (!localStorage.rvrtList) {
    localStorage.rvrtList = "[]";
}
rvrt = JSON.parse(localStorage.rvrtList);
rvrAdd = function(){
	var task = document.getElementById('taskrvr').value;
    if (task != '') {
        // Add the task to array and refresh list
        rvrt[rvrt.length] = task;
        rvrRefresh();
        // Clear the input
        document.getElementById('taskrvr').value = '';
    }
};
rvrRefresh = function(){
	var $tasks = $('#tlrvr');
    // Clear the existing task list
    $tasks.empty();
    if (rvrt.length) {
        for (var i=0;i<rvrt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmrvr'+i+'" data-goto onclick="x = '+i+'">' + rvrt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmrvr"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						rvrt.splice(x,1);
						rvrRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.rvrtList = JSON.stringify(rvrt || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        rvrAdd();
    }
});