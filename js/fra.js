var x = 0;
var frat = []
if (!localStorage.fratList) {
    localStorage.fratList = "[]";
}
frat = JSON.parse(localStorage.fratList);
fraAdd = function(){
	var task = document.getElementById('taskfra').value;
    if (task != '') {
        // Add the task to array and refresh list
        frat[frat.length] = task;
        fraRefresh();
        // Clear the input
        document.getElementById('taskfra').value = '';
    }
};
fraRefresh = function(){
	var $tasks = $('#tlfra');
    // Clear the existing task list
    $tasks.empty();
    if (frat.length) {
        for (var i=0;i<frat.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmfra'+i+'" data-goto onclick="x = '+i+'">' + frat[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmfra"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						frat.splice(x,1);
						fraRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.fratList = JSON.stringify(frat || []);
}