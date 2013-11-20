var x = 0;
var gept = []
if (!localStorage.geptList) {
    localStorage.geptList = "[]";
}
gept = JSON.parse(localStorage.geptList);
gepAdd = function(){
	var task = document.getElementById('taskgep').value;
    if (task != '') {
        // Add the task to array and refresh list
        gept[gept.length] = task;
        gepRefresh();
        // Clear the input
        document.getElementById('taskgep').value = '';
    }
};
gepRefresh = function(){
	var $tasks = $('#tlgep');
    // Clear the existing task list
    $tasks.empty();
    if (gept.length) {
        for (var i=0;i<gept.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmgep'+i+'" data-goto onclick="x = '+i+'">' + gept[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmgep"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						gept.splice(x,1);
						gepRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.geptList = JSON.stringify(gept || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        gepAdd();
    }
});