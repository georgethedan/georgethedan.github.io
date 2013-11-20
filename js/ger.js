var x = 0;
var gert = []
if (!localStorage.gertList) {
    localStorage.gertList = "[]";
}
gert = JSON.parse(localStorage.gertList);
gerAdd = function(){
	var task = document.getElementById('taskger').value;
    if (task != '') {
        // Add the task to array and refresh list
        gert[gert.length] = task;
        gerRefresh();
        // Clear the input
        document.getElementById('taskger').value = '';
    }
};
gerRefresh = function(){
	var $tasks = $('#tlger');
    // Clear the existing task list
    $tasks.empty();
    if (gert.length) {
        for (var i=0;i<gert.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmger'+i+'" data-goto onclick="x = '+i+'">' + gert[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmger"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						gert.splice(x,1);
						gerRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.gertList = JSON.stringify(gert || []);
}