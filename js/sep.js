var x = 0;
var sept = []
if (!localStorage.septList) {
    localStorage.septList = "[]";
}
sept = JSON.parse(localStorage.septList);
sepAdd = function(){
	var task = document.getElementById('tasksep').value;
    if (task != '') {
        // Add the task to array and refresh list
        sept[sept.length] = task;
        sepRefresh();
        // Clear the input
        document.getElementById('tasksep').value = '';
    }
};
sepRefresh = function(){
	var $tasks = $('#tlsep');
    // Clear the existing task list
    $tasks.empty();
    if (sept.length) {
        for (var i=0;i<sept.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmsep'+i+'" data-goto onclick="x = '+i+'">' + sept[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmsep"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						sept.splice(x,1);
						sepRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.septList = JSON.stringify(sept || []);
}