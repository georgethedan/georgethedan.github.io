var x = 0;
var frpt = []
if (!localStorage.frptList) {
    localStorage.frptList = "[]";
}
frpt = JSON.parse(localStorage.frptList);
frpAdd = function(){
	var task = document.getElementById('taskfrp').value;
    if (task != '') {
        // Add the task to array and refresh list
        frpt[frpt.length] = task;
        frpRefresh();
        // Clear the input
        document.getElementById('taskfrp').value = '';
    }
};
frpRefresh = function(){
	var $tasks = $('#tlfrp');
    // Clear the existing task list
    $tasks.empty();
    if (frpt.length) {
        for (var i=0;i<frpt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmfrp'+i+'" data-goto onclick="x = '+i+'">' + frpt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmfrp"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						frpt.splice(x,1);
						frpRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.frptList = JSON.stringify(frpt || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        frpAdd();
    }
});